const { identity } = require('lodash');
const Project = require('../models/project'); // Import your Project model

const createProject = async (req, res) => {
    const { projectName, description, projectManager, teamMembers, startDate, endDate } = req.body;
    const project = await new Project({ projectName, description, projectManager, teamMembers, startDate, endDate }).save();

    if (project) res.json(project);
};

const getProject = async (req, res) => {
    const id = req.params.id;
    const project = await Project.findById(id).populate('projectManager');
    if (project) res.json(project);
};

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findById(id);
        if (!project) {
            throw new Error('Project not found');
        }
        // Delete the project
        await project.remove();

        console.log('Project deleted successfully');
    } catch (error) {
        console.error('Error deleting project:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const { tasks } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(id, { tasks }, { new: true }).populate('tasks');

        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    updateProject
};

module.exports = {
    createProject,
    getProject,
    deleteProject,
    updateProject
};