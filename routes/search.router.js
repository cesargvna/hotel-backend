import express from "express";
const searchRouter = express.Router();
import { searchHotel } from "../controllers/search.controller.js";

searchRouter.get("/", searchHotel);

export default searchRouter;
