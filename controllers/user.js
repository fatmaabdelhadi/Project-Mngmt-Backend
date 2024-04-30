const User = require("../models/user");
// const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  // Validate input
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send("Missing required fields");
  }

  // Check for existing users
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  // // Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user instance
  const user = new User({
    username,
    email,
    password: hashedPassword,
    role: {
      managedProjects: [],
      contributedTasks: [],
    },
    profile: {
      full_name: "",
      job_title: "",
      contact_info: {
        email: "",
        phone: "",
        address: "",
      },
    },
    preferences: {
      theme: "light",
      notifications: {
        email: true,
        sms: false,
      },
    },
    created_at: new Date(),
    updated_at: new Date(),
  });

  try {
    // Save the new user to the database
    await user.save();

    // Send a success response
    res.send(`User with ID ${user._id} created successfully`);
  } catch (error) {
    // Send an error response
    res.status(500).send("Error registering user");
  }
};

//get user by id

// exports.getUser = async (req, res) => {
//   const query = req.query.new;
//   try {
//     const user = query
//     ? await User.findById(req.params.id)
//     : await User.findById(req.params.id);

//     if (!user) return res.status(404).send('User not found');

//     // Send a success response
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    rea.status(500).json(error);
  }
};

// exports.getUser = async (req, res) => {
//   try {
//     // Get the user ID from the request parameters
//     const userId = req.params.id;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     // Check if the user was found
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     // Remove password and updated_at fields from the response
//     user.password = undefined;
//     user.updated_at = undefined;

//     // Send a success response
//     res.send(user);
//   } catch (error) {
//     // Send an error response
//     res.status(500).send('Error retrieving user');
//   }
// };

// exports.getAllUsers = async (req, res) => {
const getAllUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
};

// exports.updateUser = async (req, res) => {
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("User not found");

    // Remove password and updated_at fields from the response
    user.password = undefined;
    user.updated_at = undefined;

    res.send(user);
  } catch (error) {
    res.status(500).send("Error updating user");
  }
};

// exports.deleteUser = async (req, res) => {
const deleteUser = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const userId = req.params.id;

    // Find the user by ID and delete it
    const user = await User.findByIdAndDelete(userId);

    // Check if the user was found and deleted
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Send a success response
    res.send(user);
  } catch (error) {
    // Send an error response
    res.status(500).send("Error deleting user");
  }
};

const getAllProjects = async (req, res) => {
  const id = req.params.id;
  const project = await User.findById(id)
    .populate("role.managedProjects")
    .populate("role.contributedTasks");
  if (project) res.json(Project);
};

const getAllUserProjects = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
      .populate("role.managedProjects")
      .populate("role.contributedTasks");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract all the contributed task IDs from the user
    const contributedTaskIds = user.role.contributedTasks.map(
      (task) => task._id
    );

    // Populate the projects for the contributed tasks
    const projects = await Project.find({ tasks: { $in: contributedTaskIds } });

    // Send the populated projects as response
    if (projects) res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllProjects,
  getAllUserProjects,
};
