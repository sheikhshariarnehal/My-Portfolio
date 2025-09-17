const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { validateProject } = require('../middleware/validation');
const { uploadMiddleware, getFileUrl } = require('../middleware/upload');
const database = require('../config/database');
const logger = require('../utils/logger');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        const projects = await database.readProjects();
        
        res.json({
            success: true,
            count: projects.length,
            data: projects
        });

        logger.info('Projects retrieved', { count: projects.length });

    } catch (error) {
        logger.error('Error retrieving projects', { error: error.message });
        next(error);
    }
});

// @route   GET /api/projects/:id
// @desc    Get single project by index
// @access  Public
router.get('/:id', async (req, res, next) => {
    try {
        const projects = await database.readProjects();
        const projectIndex = parseInt(req.params.id);

        if (isNaN(projectIndex) || projectIndex < 0 || projectIndex >= projects.length) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            data: projects[projectIndex]
        });

    } catch (error) {
        logger.error('Error retrieving project', { error: error.message, id: req.params.id });
        next(error);
    }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin only)
router.post('/', authenticateToken, validateProject, async (req, res, next) => {
    try {
        const { name, desc, image, category, links } = req.body;

        // Check if project with same name already exists
        const existingProject = await database.findProjectByName(name);
        if (existingProject) {
            return res.status(400).json({
                success: false,
                message: 'Project with this name already exists'
            });
        }

        const newProject = {
            name,
            desc,
            image,
            category,
            links: {
                view: links.view,
                code: links.code
            }
        };

        const createdProject = await database.addProject(newProject);

        // Emit real-time update
        const io = req.app.get('io');
        io.emit('projectAdded', createdProject);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: createdProject
        });

        logger.info('Project created', { 
            projectName: name, 
            user: req.user.username 
        });

    } catch (error) {
        logger.error('Error creating project', { 
            error: error.message, 
            user: req.user?.username 
        });
        next(error);
    }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin only)
router.put('/:id', authenticateToken, validateProject, async (req, res, next) => {
    try {
        const projectIndex = parseInt(req.params.id);
        const { name, desc, image, category, links } = req.body;

        const projects = await database.readProjects();
        
        if (isNaN(projectIndex) || projectIndex < 0 || projectIndex >= projects.length) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Check if another project with same name exists (excluding current project)
        const existingProject = await database.findProjectByName(name);
        if (existingProject && existingProject.index !== projectIndex) {
            return res.status(400).json({
                success: false,
                message: 'Project with this name already exists'
            });
        }

        const updatedProject = {
            name,
            desc,
            image,
            category,
            links: {
                view: links.view,
                code: links.code
            }
        };

        const result = await database.updateProject(projectIndex, updatedProject);

        // Emit real-time update
        const io = req.app.get('io');
        io.emit('projectUpdated', { index: projectIndex, project: result });

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: result
        });

        logger.info('Project updated', { 
            projectIndex, 
            projectName: name, 
            user: req.user.username 
        });

    } catch (error) {
        logger.error('Error updating project', { 
            error: error.message, 
            id: req.params.id,
            user: req.user?.username 
        });
        next(error);
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, async (req, res, next) => {
    try {
        const projectIndex = parseInt(req.params.id);

        const projects = await database.readProjects();
        
        if (isNaN(projectIndex) || projectIndex < 0 || projectIndex >= projects.length) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        const deletedProject = await database.deleteProject(projectIndex);

        // Emit real-time update
        const io = req.app.get('io');
        io.emit('projectDeleted', { index: projectIndex, project: deletedProject });

        res.json({
            success: true,
            message: 'Project deleted successfully',
            data: deletedProject
        });

        logger.info('Project deleted', { 
            projectIndex, 
            projectName: deletedProject.name, 
            user: req.user.username 
        });

    } catch (error) {
        logger.error('Error deleting project', { 
            error: error.message, 
            id: req.params.id,
            user: req.user?.username 
        });
        next(error);
    }
});

// @route   POST /api/projects/upload
// @desc    Upload project image
// @access  Private (Admin only)
router.post('/upload', authenticateToken, uploadMiddleware, async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const fileUrl = getFileUrl(req.file.filename);

        res.json({
            success: true,
            message: 'File uploaded successfully',
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                url: fileUrl,
                size: req.file.size
            }
        });

        logger.info('File uploaded', {
            filename: req.file.filename,
            originalName: req.file.originalname,
            size: req.file.size,
            user: req.user.username
        });

    } catch (error) {
        logger.error('Error uploading file', {
            error: error.message,
            user: req.user?.username
        });
        next(error);
    }
});

module.exports = router;
