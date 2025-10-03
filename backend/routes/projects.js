const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const authMiddleware = require('../middleware/auth');

// Absolute paths for cPanel deployment
const PROJECTS_FILE = '/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend/projects/projects.json';
const IMAGES_DIR = '/home4/sheikhshariarneh/profile.sheikhshariarnehal.com/Frontend/assets/images/projects';

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      // Ensure directory exists
      await fs.mkdir(IMAGES_DIR, { recursive: true });
      cb(null, IMAGES_DIR);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).toLowerCase().replace(/\s+/g, '-');
    cb(null, name + '-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB default
  }
});

// Helper function to read projects
async function readProjects() {
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

// Helper function to write projects
async function writeProjects(projects) {
  try {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing projects:', error);
    return false;
  }
}

// GET all projects (public route)
router.get('/', async (req, res) => {
  try {
    const projects = await readProjects();
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects'
    });
  }
});

// GET single project by index (public route)
router.get('/:index', async (req, res) => {
  try {
    const projects = await readProjects();
    const index = parseInt(req.params.index);
    
    if (index < 0 || index >= projects.length) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: projects[index]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project'
    });
  }
});

// POST create new project (protected route)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, desc, category, viewLink, codeLink } = req.body;

    // Validate required fields
    if (!name || !desc || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and category are required'
      });
    }

    const projects = await readProjects();

    // Prepare image name (without extension)
    let imageName = '';
    if (req.file) {
      imageName = path.basename(req.file.filename, path.extname(req.file.filename));
    }

    // Create new project object
    const newProject = {
      name,
      desc,
      image: imageName,
      category,
      links: {
        view: viewLink || '',
        code: codeLink || ''
      }
    };

    projects.push(newProject);
    const success = await writeProjects(projects);

    if (success) {
      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: newProject
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error saving project'
      });
    }
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating project'
    });
  }
});

// PUT update project (protected route)
router.put('/:index', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const projects = await readProjects();
    const index = parseInt(req.params.index);

    if (index < 0 || index >= projects.length) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const { name, desc, category, viewLink, codeLink } = req.body;
    const oldProject = projects[index];

    // Update project fields
    projects[index] = {
      name: name || oldProject.name,
      desc: desc || oldProject.desc,
      image: oldProject.image,
      category: category || oldProject.category,
      links: {
        view: viewLink !== undefined ? viewLink : oldProject.links.view,
        code: codeLink !== undefined ? codeLink : oldProject.links.code
      }
    };

    // If new image uploaded, update image name and delete old image
    if (req.file) {
      const newImageName = path.basename(req.file.filename, path.extname(req.file.filename));
      projects[index].image = newImageName;

      // Try to delete old image files (all extensions)
      if (oldProject.image) {
        const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
        for (const ext of extensions) {
          try {
            await fs.unlink(path.join(IMAGES_DIR, oldProject.image + ext));
          } catch (err) {
            // File might not exist, ignore error
          }
        }
      }
    }

    const success = await writeProjects(projects);

    if (success) {
      res.json({
        success: true,
        message: 'Project updated successfully',
        data: projects[index]
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error updating project'
      });
    }
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating project'
    });
  }
});

// DELETE project (protected route)
router.delete('/:index', authMiddleware, async (req, res) => {
  try {
    const projects = await readProjects();
    const index = parseInt(req.params.index);

    if (index < 0 || index >= projects.length) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const deletedProject = projects[index];

    // Delete associated image files
    if (deletedProject.image) {
      const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif'];
      for (const ext of extensions) {
        try {
          await fs.unlink(path.join(IMAGES_DIR, deletedProject.image + ext));
        } catch (err) {
          // File might not exist, ignore error
        }
      }
    }

    // Remove project from array
    projects.splice(index, 1);
    const success = await writeProjects(projects);

    if (success) {
      res.json({
        success: true,
        message: 'Project deleted successfully',
        data: deletedProject
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error deleting project'
      });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project'
    });
  }
});

module.exports = router;

