import Hotel from "../models/hotel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({}).populate("rooms");
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const createHotel = async (req, res, next) => {
  const { name, address, clasification, price, description } = req.body;

  console.log(req.files.image);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const imageFile = req.files.image;
  console.log(imageFile);
  const uploadPath = path.join(__dirname, "../uploads", imageFile.name);

  imageFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  try {
    const hotel = new Hotel({
      name,
      address,
      clasification,
      image: `/uploads/${imageFile.name}`,
      price,
      description,
    });
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.status(200).json({ message: "Hotel deleted" });
  } catch (error) {
    next(error);
  }
};
