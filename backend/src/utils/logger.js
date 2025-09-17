const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logDir = path.join(__dirname, '../../logs');
        this.ensureLogDirectory();
    }

    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    formatMessage(level, message, meta = {}) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            ...meta
        };
        return JSON.stringify(logEntry) + '\n';
    }

    writeToFile(filename, content) {
        const filePath = path.join(this.logDir, filename);
        fs.appendFileSync(filePath, content);
    }

    info(message, meta = {}) {
        const logMessage = this.formatMessage('INFO', message, meta);
        console.log(`[INFO] ${message}`, meta);
        this.writeToFile('app.log', logMessage);
    }

    error(message, meta = {}) {
        const logMessage = this.formatMessage('ERROR', message, meta);
        console.error(`[ERROR] ${message}`, meta);
        this.writeToFile('error.log', logMessage);
    }

    warn(message, meta = {}) {
        const logMessage = this.formatMessage('WARN', message, meta);
        console.warn(`[WARN] ${message}`, meta);
        this.writeToFile('app.log', logMessage);
    }

    debug(message, meta = {}) {
        if (process.env.NODE_ENV !== 'production') {
            const logMessage = this.formatMessage('DEBUG', message, meta);
            console.log(`[DEBUG] ${message}`, meta);
            this.writeToFile('debug.log', logMessage);
        }
    }
}

module.exports = new Logger();
