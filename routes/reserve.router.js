import express from "express";
const reserveRouter = express.Router();
import validateReserve from "../validators/reserve.js";
import {
  getReserves,
  getReserve,
  createReserve,
  updateReserve,
  deleteReserve,
} from "../controllers/reserve.controller.js";

reserveRouter.get("/", getReserves);
reserveRouter.get("/:id", getReserve);
reserveRouter.post("/", validateReserve, createReserve);
reserveRouter.put("/:id", validateReserve, updateReserve);
reserveRouter.delete("/:id", deleteReserve);

export default reserveRouter;
