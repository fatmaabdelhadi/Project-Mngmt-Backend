const req = require('express/lib/request')
const { project } = require('../routes/project')

const createProject = async (req, res) => {
    const {projectName, description, projectManager, teamMembers, startDate, endDate} = req.body
    const project = await new Project({projectName, description, projectManager, teamMembers, startDate, endDate}).save()

    if (project) res.json(project)
}

const getProject = async (req, res) => {
    const id = req.params.id
    const project = await Project.findById(id).populate('projectManager')
    if (project) res.json(project)
}

module.exports = {
    createProject,
    getProject
}