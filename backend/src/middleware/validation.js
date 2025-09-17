const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

const validateProject = [
    body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Project name must be between 1 and 100 characters'),

    body('desc')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be between 1 and 1000 characters'),

    body('image')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Image name is required'),

    body('category')
        .isIn(['mern', 'lamp', 'basicweb', 'android'])
        .withMessage('Category must be one of: mern, lamp, basicweb, android'),

    body('links.view')
        .optional({ checkFalsy: true })
        .isURL({ require_protocol: false })
        .withMessage('View link must be a valid URL'),

    body('links.code')
        .optional({ checkFalsy: true })
        .isURL({ require_protocol: false })
        .withMessage('Code link must be a valid URL'),

    handleValidationErrors
];

const validateLogin = [
    body('username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username is required'),
    
    body('password')
        .isLength({ min: 1 })
        .withMessage('Password is required'),
    
    handleValidationErrors
];

module.exports = {
    validateProject,
    validateLogin,
    handleValidationErrors
};
