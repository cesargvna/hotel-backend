import express from "express";
const loginRouter = express.Router();
import login from "../controllers/login.controller.js";

loginRouter.post("/", login);

export default loginRouter;
