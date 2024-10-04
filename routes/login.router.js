import express from "express";
const loginRouter = express.Router();
import { login, register } from "../controllers/login.controller.js";

loginRouter.post("/login", login);
loginRouter.post("/register", register)

export default loginRouter;
