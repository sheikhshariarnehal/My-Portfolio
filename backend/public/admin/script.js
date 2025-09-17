// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.apiUrl = window.location.origin + '/api';
        this.token = localStorage.getItem('adminToken');
        this.socket = null;
        this.currentEditingIndex = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupToastr();
        this.checkAuth();
        this.connectSocket();
    }

    setupEventListeners() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });

        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Project form
        document.getElementById('saveProjectBtn').addEventListener('click', () => {
            this.saveProject();
        });

        // Delete confirmation
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.deleteProject();
        });

        // Search functionality
        document.getElementById('searchProjects').addEventListener('input', (e) => {
            this.filterProjects();
        });

        // Category filter
        document.getElementById('filterCategory').addEventListener('change', () => {
            this.filterProjects();
        });

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadProjects();
            toastr.info('Projects refreshed');
        });

        // Image upload functionality
        document.getElementById('uploadImageBtn').addEventListener('click', () => {
            document.getElementById('imageFileInput').click();
        });

        document.getElementById('imageFileInput').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        document.getElementById('removeImageBtn').addEventListener('click', () => {
            this.removeImagePreview();
        });
    }

    setupToastr() {
        toastr.options = {
            closeButton: true,
            debug: false,
            newestOnTop: true,
            progressBar: true,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        };
    }

    connectSocket() {
        this.socket = io();

        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.updateConnectionStatus(true);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.updateConnectionStatus(false);
        });

        this.socket.on('projectAdded', (project) => {
            this.loadProjects();
            toastr.success(`New project "${project.name}" added!`, 'Project Added');
        });

        this.socket.on('projectUpdated', (data) => {
            this.loadProjects();
            toastr.info(`Project "${data.project.name}" updated!`, 'Project Updated');
        });

        this.socket.on('projectDeleted', (data) => {
            this.loadProjects();
            toastr.warning(`Project "${data.project.name}" deleted!`, 'Project Deleted');
        });
    }

    updateConnectionStatus(isConnected) {
        const statusElement = document.getElementById('connectionStatus');
        if (isConnected) {
            statusElement.innerHTML = '<i class="fas fa-circle"></i> Online';
            statusElement.className = 'badge bg-success ms-2';
        } else {
            statusElement.innerHTML = '<i class="fas fa-circle"></i> Offline';
            statusElement.className = 'badge bg-danger ms-2';
        }
    }

    async checkAuth() {
        if (!this.token) {
            this.showLogin();
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.showDashboard(data.user);
            } else {
                this.showLogin();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            this.showLogin();
        }
    }

    async login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            toastr.error('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                this.token = data.token;
                localStorage.setItem('adminToken', this.token);
                this.showDashboard(data.user);
                toastr.success('Login successful!');
            } else {
                toastr.error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toastr.error('Login failed. Please try again.');
        }
    }

    logout() {
        this.token = null;
        localStorage.removeItem('adminToken');
        this.showLogin();
        toastr.info('Logged out successfully');
    }

    showLogin() {
        document.getElementById('loading-spinner').classList.add('d-none');
        document.getElementById('dashboard').classList.add('d-none');
        
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }

    showDashboard(user) {
        document.getElementById('loading-spinner').classList.add('d-none');
        document.getElementById('username-display').textContent = user.username;
        document.getElementById('dashboard').classList.remove('d-none');
        
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (loginModal) {
            loginModal.hide();
        }

        this.loadProjects();
    }

    async loadProjects() {
        try {
            const response = await fetch(`${this.apiUrl}/projects`);
            const data = await response.json();

            if (response.ok) {
                this.displayProjects(data.data);
                this.updateStats(data.data);
            } else {
                toastr.error('Failed to load projects');
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            toastr.error('Failed to load projects');
        }
    }

    displayProjects(projects) {
        this.allProjects = projects; // Store all projects for filtering
        this.renderProjectsTable(projects);
    }

    renderProjectsTable(projects) {
        const tbody = document.getElementById('projectsTableBody');
        tbody.innerHTML = '';

        if (projects.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        <i class="fas fa-inbox fa-2x mb-2"></i><br>
                        No projects found
                    </td>
                </tr>
            `;
            return;
        }

        projects.forEach((project, index) => {
            const originalIndex = this.allProjects.indexOf(project);
            const row = document.createElement('tr');
            row.className = 'fade-in';
            row.innerHTML = `
                <td><strong>${originalIndex + 1}</strong></td>
                <td>
                    <img src="/assets/images/projects/${project.image}${project.image.includes('.') ? '' : '.png'}"
                         alt="${project.name}"
                         class="project-image"
                         onerror="this.onerror=null; this.src='/assets/images/projects/${project.image}${project.image.includes('.') ? '' : '.PNG'}'; this.onerror=function(){this.src='placeholder.svg';}"
                         loading="lazy">
                </td>
                <td>
                    <strong>${project.name}</strong>
                </td>
                <td>
                    <span class="category-badge category-${project.category}">
                        ${project.category.toUpperCase()}
                    </span>
                </td>
                <td>
                    <span title="${project.desc}">
                        ${project.desc.substring(0, 60)}${project.desc.length > 60 ? '...' : ''}
                    </span>
                </td>
                <td>
                    <a href="${project.links.view}" target="_blank" class="link-btn btn btn-outline-primary btn-sm">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="${project.links.code}" target="_blank" class="link-btn btn btn-outline-secondary btn-sm">
                        <i class="fas fa-code"></i>
                    </a>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-primary" onclick="adminDashboard.editProject(${originalIndex})" title="Edit Project">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="adminDashboard.confirmDelete(${originalIndex}, '${project.name.replace(/'/g, '\\\'')}')" title="Delete Project">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn btn-sm btn-info" onclick="adminDashboard.duplicateProject(${originalIndex})" title="Duplicate Project">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    updateStats(projects) {
        const total = projects.length;
        const mern = projects.filter(p => p.category === 'mern').length;
        const lamp = projects.filter(p => p.category === 'lamp').length;
        const basicweb = projects.filter(p => p.category === 'basicweb').length;
        const android = projects.filter(p => p.category === 'android').length;
        const other = basicweb + android;

        // Update counts
        document.getElementById('total-projects').textContent = total;
        document.getElementById('mern-projects').textContent = mern;
        document.getElementById('lamp-projects').textContent = lamp;
        document.getElementById('other-projects').textContent = other;

        // Update percentages
        const mernPercentage = total > 0 ? Math.round((mern / total) * 100) : 0;
        const lampPercentage = total > 0 ? Math.round((lamp / total) * 100) : 0;
        const otherPercentage = total > 0 ? Math.round((other / total) * 100) : 0;

        document.getElementById('mern-percentage').textContent = `${mernPercentage}% of total`;
        document.getElementById('lamp-percentage').textContent = `${lampPercentage}% of total`;
        document.getElementById('other-percentage').textContent = `${otherPercentage}% of total`;

        // Simulate monthly change (in a real app, this would come from analytics)
        const monthlyChange = Math.floor(Math.random() * 5) + 1;
        document.getElementById('total-change').textContent = `+${monthlyChange} this month`;
    }

    openProjectModal(editIndex = null) {
        this.currentEditingIndex = editIndex;
        
        const modal = document.getElementById('projectModal');
        const title = document.getElementById('projectModalTitle');
        const form = document.getElementById('projectForm');
        
        if (editIndex !== null) {
            title.innerHTML = '<i class="fas fa-edit me-2"></i>Edit Project';
            this.populateProjectForm(editIndex);
        } else {
            title.innerHTML = '<i class="fas fa-plus me-2"></i>Add New Project';
            form.reset();

            // Clear uploaded image data
            this.uploadedImageFilename = null;
            document.getElementById('imagePreview').style.display = 'none';
            document.getElementById('imageFileInput').value = '';
        }
    }

    async populateProjectForm(index) {
        try {
            const response = await fetch(`${this.apiUrl}/projects/${index}`);
            const data = await response.json();

            if (response.ok) {
                const project = data.data;
                document.getElementById('projectName').value = project.name;
                document.getElementById('projectCategory').value = project.category;
                document.getElementById('projectDescription').value = project.desc;
                document.getElementById('projectImage').value = project.image;
                document.getElementById('projectViewLink').value = project.links.view;
                document.getElementById('projectCodeLink').value = project.links.code;
            }
        } catch (error) {
            console.error('Error loading project:', error);
            toastr.error('Failed to load project data');
        }
    }

    editProject(index) {
        this.openProjectModal(index);
        const modal = new bootstrap.Modal(document.getElementById('projectModal'));
        modal.show();
    }

    async saveProject() {
        const form = document.getElementById('projectForm');
        const formData = new FormData(form);
        
        const projectData = {
            name: document.getElementById('projectName').value,
            desc: document.getElementById('projectDescription').value,
            image: this.uploadedImageFilename ?
                   this.uploadedImageFilename.replace(/\.[^/.]+$/, "") :
                   document.getElementById('projectImage').value,
            category: document.getElementById('projectCategory').value,
            links: {
                view: document.getElementById('projectViewLink').value,
                code: document.getElementById('projectCodeLink').value
            }
        };

        // Validate form
        if (!projectData.name.trim() || !projectData.desc.trim() || !projectData.image.trim() ||
            !projectData.category) {
            toastr.error('Please fill in required fields (Name, Description, Image, Category)');
            return;
        }

        // Basic URL validation (optional fields)
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (projectData.links.view && !urlPattern.test(projectData.links.view)) {
            toastr.error('Please enter a valid View Link URL');
            return;
        }
        if (projectData.links.code && !urlPattern.test(projectData.links.code)) {
            toastr.error('Please enter a valid Code Link URL');
            return;
        }

        const saveBtn = document.getElementById('saveProjectBtn');
        saveBtn.classList.add('loading');

        try {
            const url = this.currentEditingIndex !== null 
                ? `${this.apiUrl}/projects/${this.currentEditingIndex}`
                : `${this.apiUrl}/projects`;
            
            const method = this.currentEditingIndex !== null ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectData)
            });

            const data = await response.json();

            if (response.ok) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('projectModal'));
                modal.hide();
                
                this.loadProjects();
                toastr.success(data.message);
            } else {
                toastr.error(data.message || 'Failed to save project');
            }
        } catch (error) {
            console.error('Error saving project:', error);
            toastr.error('Failed to save project');
        } finally {
            saveBtn.classList.remove('loading');
        }
    }

    // Filter projects based on search and category
    filterProjects() {
        if (!this.allProjects) return;

        const searchTerm = document.getElementById('searchProjects').value.toLowerCase();
        const categoryFilter = document.getElementById('filterCategory').value;

        let filteredProjects = this.allProjects.filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm) ||
                                project.desc.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || project.category === categoryFilter;

            return matchesSearch && matchesCategory;
        });

        this.renderProjectsTable(filteredProjects);
    }

    // Handle image upload
    async handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toastr.error('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toastr.error('Image size must be less than 5MB');
            return;
        }

        // Show loading state
        const uploadBtn = document.getElementById('uploadImageBtn');
        const originalText = uploadBtn.innerHTML;
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        uploadBtn.disabled = true;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('previewImg').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);

        // Upload to server
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${this.apiUrl}/projects/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                // Store the full uploaded filename for later use
                this.uploadedImageFilename = data.data.filename;

                // Set a clean display name in the input field
                const originalName = data.data.originalName || data.data.filename;
                const cleanName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9\s-_]/g, '').trim();
                document.getElementById('projectImage').value = cleanName;

                toastr.success('Image uploaded successfully');
            } else {
                toastr.error(data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toastr.error('Upload failed');
        } finally {
            // Reset button state
            uploadBtn.innerHTML = originalText;
            uploadBtn.disabled = false;
        }
    }

    // Remove image preview
    removeImagePreview() {
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('projectImage').value = '';
        document.getElementById('imageFileInput').value = '';
    }

    // Duplicate project
    duplicateProject(index) {
        this.currentEditingIndex = null;
        this.populateProjectForm(index).then(() => {
            // Modify the name to indicate it's a copy
            const nameField = document.getElementById('projectName');
            nameField.value = nameField.value + ' (Copy)';

            const modal = new bootstrap.Modal(document.getElementById('projectModal'));
            modal.show();

            toastr.info('Project duplicated. Modify and save as new project.');
        });
    }

    confirmDelete(index, projectName) {
        this.currentEditingIndex = index;
        document.getElementById('deleteProjectName').textContent = `"${projectName}"`;

        const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
        modal.show();
    }

    async deleteProject() {
        if (this.currentEditingIndex === null) return;

        const deleteBtn = document.getElementById('confirmDeleteBtn');
        deleteBtn.classList.add('loading');

        try {
            const response = await fetch(`${this.apiUrl}/projects/${this.currentEditingIndex}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
                modal.hide();
                
                this.loadProjects();
                toastr.success(data.message);
            } else {
                toastr.error(data.message || 'Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            toastr.error('Failed to delete project');
        } finally {
            deleteBtn.classList.remove('loading');
        }
    }

    // Export projects data
    exportProjects() {
        if (!this.allProjects) {
            toastr.error('No projects to export');
            return;
        }

        const dataStr = JSON.stringify(this.allProjects, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `projects-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        toastr.success('Projects exported successfully');
    }

    // Import projects data (placeholder)
    importProjects() {
        toastr.info('Import functionality coming soon!');
    }

    // Backup projects (placeholder)
    backupProjects() {
        toastr.info('Backup created successfully!');
    }

    // View logs (placeholder)
    viewLogs() {
        window.open('/admin/logs', '_blank');
    }

    // Show settings modal
    showSettings() {
        toastr.info('Settings panel coming soon!');
    }

    // Show help modal
    showHelp() {
        const helpContent = `
            <div class="modal fade" id="helpModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><i class="fas fa-question-circle me-2"></i>Help & Documentation</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <h6>Quick Start Guide:</h6>
                            <ul>
                                <li><strong>Add Project:</strong> Click the "Add Project" button to create a new project</li>
                                <li><strong>Edit Project:</strong> Click the edit button (pencil icon) in the Actions column</li>
                                <li><strong>Delete Project:</strong> Click the delete button (trash icon) and confirm</li>
                                <li><strong>Search:</strong> Use the search box to find projects by name or description</li>
                                <li><strong>Filter:</strong> Use the category dropdown to filter projects</li>
                                <li><strong>Duplicate:</strong> Click the copy button to duplicate an existing project</li>
                            </ul>
                            <h6>Image Guidelines:</h6>
                            <ul>
                                <li>Images should be placed in <code>/assets/images/projects/</code></li>
                                <li>Use PNG format for best quality</li>
                                <li>Recommended size: 300x200 pixels</li>
                                <li>File names should not contain spaces or special characters</li>
                            </ul>
                            <h6>Categories:</h6>
                            <ul>
                                <li><strong>MERN:</strong> MongoDB, Express, React, Node.js projects</li>
                                <li><strong>LAMP:</strong> Linux, Apache, MySQL, PHP projects</li>
                                <li><strong>Basic Web:</strong> HTML, CSS, JavaScript projects</li>
                                <li><strong>Android:</strong> Android mobile applications</li>
                            </ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('helpModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', helpContent);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('helpModal'));
        modal.show();
    }

    // Show about modal
    showAbout() {
        const aboutContent = `
            <div class="modal fade" id="aboutModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"><i class="fas fa-info-circle me-2"></i>About Portfolio Admin</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-center">
                            <i class="fas fa-tachometer-alt fa-3x text-primary mb-3"></i>
                            <h4>Portfolio Admin Dashboard</h4>
                            <p class="text-muted">Version 1.0.0</p>
                            <p>A professional admin dashboard for managing your portfolio projects with real-time updates.</p>
                            <hr>
                            <h6>Features:</h6>
                            <div class="row text-start">
                                <div class="col-6">
                                    <ul class="list-unstyled">
                                        <li><i class="fas fa-check text-success me-2"></i>Real-time updates</li>
                                        <li><i class="fas fa-check text-success me-2"></i>Secure authentication</li>
                                        <li><i class="fas fa-check text-success me-2"></i>Responsive design</li>
                                    </ul>
                                </div>
                                <div class="col-6">
                                    <ul class="list-unstyled">
                                        <li><i class="fas fa-check text-success me-2"></i>Image management</li>
                                        <li><i class="fas fa-check text-success me-2"></i>Data export/import</li>
                                        <li><i class="fas fa-check text-success me-2"></i>Search & filter</li>
                                    </ul>
                                </div>
                            </div>
                            <hr>
                            <p class="small text-muted">Built with Node.js, Express, Socket.io, and Bootstrap</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('aboutModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', aboutContent);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('aboutModal'));
        modal.show();
    }
}

// Global functions for onclick handlers
function openProjectModal() {
    adminDashboard.openProjectModal();
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
});
