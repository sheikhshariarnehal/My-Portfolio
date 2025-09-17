const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Default error
    let error = {
        success: false,
        message: err.message || 'Internal Server Error',
        statusCode: err.statusCode || 500
    };

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = {
            success: false,
            message: `Validation Error: ${message}`,
            statusCode: 400
        };
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        error = {
            success: false,
            message: 'Invalid token',
            statusCode: 401
        };
    }

    if (err.name === 'TokenExpiredError') {
        error = {
            success: false,
            message: 'Token expired',
            statusCode: 401
        };
    }

    // File upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        error = {
            success: false,
            message: 'File too large',
            statusCode: 400
        };
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        error = {
            success: false,
            message: 'Unexpected file field',
            statusCode: 400
        };
    }

    // Don't send stack trace in production
    if (process.env.NODE_ENV === 'production') {
        delete err.stack;
    } else {
        error.stack = err.stack;
    }

    res.status(error.statusCode).json(error);
};

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

module.exports = {
    errorHandler,
    notFound
};
