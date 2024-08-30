import User from "../models/user.js";
import bcrypt from "bcrypt";
import { tokenSign } from "../utils/handlejwt.js";

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const token = await tokenSign(user);
  console.log(token);
  res.status(200).send({ token, username: user.username, name: user.name });
};

export default login;
