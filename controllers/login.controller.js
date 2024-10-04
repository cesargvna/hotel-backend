import User from "../models/user.js";
import bcrypt from "bcrypt";
import { tokenSign } from "../utils/handlejwt.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const token = await tokenSign(user);
  res.status(200).send({ token, email: user.email, name: user.name });
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    email,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
}

export { login, register }
