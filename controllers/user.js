const User = require("../models/user.js")
const Project = require("../models/project.js")
const Task = require("../models/task.js")

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

  const user = new User(req.body);

  try {
    await user.save();
    res.send(`User with ID ${user._id} created successfully`);
  } catch (error) {
    res.status(500).send("Error registering user");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    rea.status(500).json(error);
  }
};

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
}

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
    const userId = req.params.id
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user)
  } catch (error) {
    res.status(500).send("Error deleting user")
  }
}

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser
}
