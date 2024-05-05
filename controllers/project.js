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

// const deleteProject = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const project = await Project.findById(id);
//     if (!project) {
//       throw new Error("Project not found");
//     }
//     // Delete the project
//     await project.remove();

//     console.log("Project deleted successfully");
//   } catch (error) {
//     console.error("Error deleting project:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

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


// ana w ganna
// const updateProject = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { tasks } = req.body;

//         const updatedProject = await Project.findByIdAndUpdate(id, { tasks }, { new: true }).populate('tasks');

//         if (!updatedProject) {
//             return res.status(404).json({ error: 'Project not found' });
//         }

//         res.json(updatedProject);
//     } catch (error) {
//         console.error('Error updating project:', error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // abdo's
const updateProject = async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!project) return res.status(404).send("Project not found");
      res.send(project);
    } catch (error) {
      res.status(500).send("Error updating project");
    }
  };

// // Function to update a project by ID
// const updateProject = async (req, res) => {
//     const projectId = req.params.id; // Assuming the project ID is passed in the request parameters
//     const updateFields = req.body; // Assuming the updated fields are passed in the request body

//     try {
//         // Find the project by ID
//         const project = await Project.findById(projectId);

//         if (!project) {
//             return res.status(404).json({ error: 'Project not found' });
//         }
//         // Update project fields
//         Object.assign(project, updateFields);
//         // Save the updated project
//         await project.save();

//         return res.status(200).json({ message: 'Project updated successfully', project });
//     } catch (err) {
//         console.error('Error updating project:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

module.exports = {
  createProject,
  getProject,
  deleteProject,
  updateProject
};
