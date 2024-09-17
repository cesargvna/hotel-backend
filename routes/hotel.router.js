import express from "express";
const hotelRouter = express.Router();
import {
  getHotels,
  createHotel,
  updateHotel,
  getHotelById,
  deleteHotel,
} from "../controllers/hotel.controller.js";
import validateHotel from "../validators/hotel.js";

hotelRouter.get("/", getHotels);
hotelRouter.get("/:id", getHotelById);
hotelRouter.post("/", validateHotel, createHotel);
hotelRouter.put("/:id", validateHotel, updateHotel);
hotelRouter.delete("/:id", deleteHotel);

export default hotelRouter;
