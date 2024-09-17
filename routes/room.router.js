import express from "express";
const roomRouter = express.Router();
import {
  getRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import validateRoom from "../validators/room.js";

roomRouter.get("/", getRooms);
roomRouter.get("/:id", getRoomById);
roomRouter.post("/", validateRoom, createRoom);
roomRouter.put("/:id", validateRoom, updateRoom);
roomRouter.delete("/:id", deleteRoom);

export default roomRouter;
