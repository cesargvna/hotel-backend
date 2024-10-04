import User from "../models/user.js";
import bcrypt from "bcrypt";

const getUsers = async (req, res) => {
  console.log("users", req.user);
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    email,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    //res.status(400).json({ message: Object.values(error.keyValue)[0] });
    next(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    name,
    email,
    passwordHash: passwordHash,
  };
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export { getUsers, createUser, updateUser, getUser };
