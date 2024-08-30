import express from "express";
const userRouter = express.Router();
import {
  getUsers,
  createUser,
  updateUser,
  getUser,
} from "../controllers/user.controller.js";
import validateUser from "../validators/user.js";
//import { authMiddleware } from "../middleware/sesion.js";

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", validateUser, createUser);
userRouter.put("/:id", validateUser, updateUser);

export default userRouter;
