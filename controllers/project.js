const { identity } = require("lodash");
const Project = require("../models/project");
const Task = require("../models/task");


const createProject = async (req, res) => {
  // Validate input
  const { projectName, description, projectManager, teamMembers, startDate, endDate } = req.body;
  if (!projectName || !projectManager) {
    return res.status(400).send("Missing required fields");
  }
  const existingProject = await Project.findOne({ $and: [{ projectName }, { projectManager }] })
  if (existingProject) {
    return res.status(400).send("Project already exists");
  }
  const project = new Project(req.body);
  try {
    await project.save();
    res.send(`Project with ID ${project._id} created successfully`);
  } catch (error) {
    // Send an error response
    res.status(500).send("Error registering project");
  }
};

const getProject = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findById(id).populate("projectManager");
  if (project) res.json(project);
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.send(project);
  } catch (error) {
    res.status(500).send("Error deleting project");
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).send("Project not found");
    res.send(project);
  } catch (error) {
    res.status(500).send("Error updating project");
  }
};

module.exports = {
  createProject,
  getProject,
  deleteProject,
  updateProject
};
