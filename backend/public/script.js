// API Configuration
const API_URL = 'http://localhost:5001/api';
let authToken = localStorage.getItem('authToken');
let currentFilter = 'all';
let editingIndex = null;

// DOM Elements
const loginPage = document.getElementById('loginPage');
const dashboardPage = document.getElementById('dashboardPage');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const projectsGrid = document.getElementById('projectsGrid');
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const addProjectBtn = document.getElementById('addProjectBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const toast = document.getElementById('toast');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (authToken) {
        verifyToken();
    } else {
        showPage('login');
    }
    
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    addProjectBtn.addEventListener('click', () => openProjectModal());
    closeModal.addEventListener('click', closeProjectModal);
    cancelBtn.addEventListener('click', closeProjectModal);
    projectForm.addEventListener('submit', handleProjectSubmit);
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            loadProjects();
        });
    });
    
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.currentTarget.dataset.section;
            switchSection(section);
        });
    });
    
    // Image preview
    document.getElementById('projectImage').addEventListener('change', handleImagePreview);
    
    // Close modal on outside click
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
}

// Authentication Functions
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    showLoading(true);
    loginError.textContent = '';
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            document.getElementById('userName').textContent = data.user.username;
            showPage('dashboard');
            loadProjects();
            showToast('Login successful!', 'success');
        } else {
            loginError.textContent = data.message || 'Login failed';
        }
    } catch (error) {
        loginError.textContent = 'Connection error. Please try again.';
        console.error('Login error:', error);
    } finally {
        showLoading(false);
    }
}

async function verifyToken() {
    try {
        const response = await fetch(`${API_URL}/auth/verify`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('userName').textContent = data.user.username;
            showPage('dashboard');
            loadProjects();
        } else {
            handleLogout();
        }
    } catch (error) {
        handleLogout();
    }
}

function handleLogout() {
    authToken = null;
    localStorage.removeItem('authToken');
    showPage('login');
    loginForm.reset();
    showToast('Logged out successfully', 'success');
}

// Project Functions
async function loadProjects() {
    showLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        
        if (data.success) {
            let projects = data.data;
            
            // Filter projects
            if (currentFilter !== 'all') {
                projects = projects.filter(p => p.category === currentFilter);
            }
            
            displayProjects(projects);
            document.getElementById('projectCount').textContent = projects.length;
            document.getElementById('totalProjects').textContent = data.data.length;
        }
    } catch (error) {
        showToast('Error loading projects', 'error');
        console.error('Load projects error:', error);
    } finally {
        showLoading(false);
    }
}

function displayProjects(projects) {
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-folder-open"></i>
                <h3>No projects found</h3>
                <p>Click "Add New Project" to create your first project</p>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = projects.map((project, index) => `
        <div class="project-card" data-index="${index}">
            <img src="/uploads/${project.image}.png" 
                 alt="${project.name}" 
                 class="project-image"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22200%22%3E%3Crect fill=%22%231e293b%22 width=%22400%22 height=%22200%22/%3E%3Ctext fill=%22%2394a3b8%22 font-family=%22Arial%22 font-size=%2218%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">
            <div class="project-content">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.name}</h3>
                        <span class="project-category">${project.category}</span>
                    </div>
                </div>
                <p class="project-desc">${project.desc}</p>
                <div class="project-links">
                    ${project.links.view ? `<a href="${project.links.view}" target="_blank" class="project-link"><i class="fas fa-eye"></i> View</a>` : ''}
                    ${project.links.code ? `<a href="${project.links.code}" target="_blank" class="project-link"><i class="fas fa-code"></i> Code</a>` : ''}
                </div>
                <div class="project-actions">
                    <button class="btn btn-secondary btn-sm" onclick="editProject(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProject(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openProjectModal(project = null, index = null) {
    editingIndex = index;
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');
    
    if (project) {
        modalTitle.textContent = 'Edit Project';
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Project';
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectDesc').value = project.desc;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectViewLink').value = project.links.view || '';
        document.getElementById('projectCodeLink').value = project.links.code || '';
    } else {
        modalTitle.textContent = 'Add New Project';
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Project';
        projectForm.reset();
        document.getElementById('imagePreview').innerHTML = '';
    }
    
    projectModal.classList.add('active');
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    projectForm.reset();
    document.getElementById('imagePreview').innerHTML = '';
    editingIndex = null;
}

async function handleProjectSubmit(e) {
    e.preventDefault();
    showLoading(true);

    const formData = new FormData(projectForm);
    const url = editingIndex !== null
        ? `${API_URL}/projects/${editingIndex}`
        : `${API_URL}/projects`;
    const method = editingIndex !== null ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Authorization': `Bearer ${authToken}` },
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            showToast(data.message, 'success');
            closeProjectModal();
            loadProjects();
        } else {
            showToast(data.message || 'Operation failed', 'error');
        }
    } catch (error) {
        showToast('Error saving project', 'error');
        console.error('Save project error:', error);
    } finally {
        showLoading(false);
    }
}

async function editProject(index) {
    try {
        const response = await fetch(`${API_URL}/projects/${index}`);
        const data = await response.json();

        if (data.success) {
            openProjectModal(data.data, index);
        }
    } catch (error) {
        showToast('Error loading project', 'error');
        console.error('Edit project error:', error);
    }
}

async function deleteProject(index) {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        return;
    }

    showLoading(true);

    try {
        const response = await fetch(`${API_URL}/projects/${index}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        const data = await response.json();

        if (data.success) {
            showToast('Project deleted successfully', 'success');
            loadProjects();
        } else {
            showToast(data.message || 'Delete failed', 'error');
        }
    } catch (error) {
        showToast('Error deleting project', 'error');
        console.error('Delete project error:', error);
    } finally {
        showLoading(false);
    }
}

// Utility Functions
function handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

function showPage(page) {
    if (page === 'login') {
        loginPage.classList.add('active');
        dashboardPage.classList.remove('active');
    } else {
        loginPage.classList.remove('active');
        dashboardPage.classList.add('active');
    }
}

function switchSection(section) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');

    // Update content sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`${section}Section`).classList.add('active');

    // Update page title
    const titles = {
        projects: 'Projects Management',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[section];
}

function showLoading(show) {
    if (show) {
        loadingOverlay.classList.add('active');
    } else {
        loadingOverlay.classList.remove('active');
    }
}

function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Make functions globally accessible
window.editProject = editProject;
window.deleteProject = deleteProject;

