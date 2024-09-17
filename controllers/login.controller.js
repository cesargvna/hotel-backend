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

export default login;
