const fs = require('fs').promises;
const path = require('path');

class ProjectsDatabase {
    constructor() {
        this.projectsPath = path.join(__dirname, '../../../projects/projects.json');
        this.backupPath = path.join(__dirname, '../../../projects/projects.backup.json');
    }

    async readProjects() {
        try {
            const data = await fs.readFile(this.projectsPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading projects:', error);
            throw new Error('Failed to read projects data');
        }
    }

    async writeProjects(projects) {
        try {
            // Create backup before writing
            await this.createBackup();
            
            // Write to temporary file first
            const tempPath = this.projectsPath + '.tmp';
            await fs.writeFile(tempPath, JSON.stringify(projects, null, 2), 'utf8');
            
            // Atomic move
            await fs.rename(tempPath, this.projectsPath);
            
            return true;
        } catch (error) {
            console.error('Error writing projects:', error);
            throw new Error('Failed to write projects data');
        }
    }

    async createBackup() {
        try {
            const data = await fs.readFile(this.projectsPath, 'utf8');
            await fs.writeFile(this.backupPath, data, 'utf8');
        } catch (error) {
            console.warn('Failed to create backup:', error.message);
        }
    }

    async addProject(project) {
        const projects = await this.readProjects();
        projects.unshift(project); // Add to beginning instead of end
        await this.writeProjects(projects);
        return project;
    }

    async updateProject(index, updatedProject) {
        const projects = await this.readProjects();
        if (index < 0 || index >= projects.length) {
            throw new Error('Project not found');
        }
        projects[index] = updatedProject;
        await this.writeProjects(projects);
        return updatedProject;
    }

    async deleteProject(index) {
        const projects = await this.readProjects();
        if (index < 0 || index >= projects.length) {
            throw new Error('Project not found');
        }
        const deletedProject = projects.splice(index, 1)[0];
        await this.writeProjects(projects);
        return deletedProject;
    }

    async findProjectByName(name) {
        const projects = await this.readProjects();
        const index = projects.findIndex(project => project.name === name);
        return index !== -1 ? { project: projects[index], index } : null;
    }
}

module.exports = new ProjectsDatabase();
