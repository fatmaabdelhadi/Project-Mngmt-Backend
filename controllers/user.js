// const User = require('../models/user')

// const getAllProjects = async (req, res) => {
//     const id = req.params.id;
//     const project = await User.findById(id).populate('role.managedProjects').populate('role.contributedTasks')
//     if (project) res.json(Project);
// }

const User = require('../models/user');
const Project = require('../models/project');

const getAllUserProjects = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate('role.managedProjects').populate('role.contributedTasks');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract all the contributed task IDs from the user
        const contributedTaskIds = user.role.contributedTasks.map(task => task._id);

        // Populate the projects for the contributed tasks
        const projects = await Project.find({ tasks: { $in: contributedTaskIds } });

        // Send the populated projects as response
        if (projects) res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getAllUserProjects
};
