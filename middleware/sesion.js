import { tokenVerify } from "../utils/handlejwt.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const tokenExtractor = (req, res, next) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    req.token = auth.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (req, res, next) => {
  console.log(req.token)
  try {
    //const decodedToken = await tokenVerify(req.token, next);
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    console.log(decodedToken)
    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = req.token;
    const data = tokenVerify(token, next);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { authMiddleware, tokenExtractor, userExtractor };
