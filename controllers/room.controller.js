import Room from "../models/room.js";
import Hotel from "../models/hotel.js";

export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({}).populate("hotelId", {
      name: 1,
      price: 1,
    });
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
export const createRoom = async (req, res, next) => {
  const { number, state, price, type, hotelId } = req.body;
  try {
    const hotel = await Hotel.findById(hotelId);
    const room = new Room({ number, state, price, type, hotelId: hotel.id });
    const savedRoom = await room.save();
    hotel.rooms = hotel.rooms.concat(savedRoom._id);
    await hotel.save();
    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate("hotelId");
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    const hotel = await Hotel.findById(room.hotelId);

    hotel.rooms = hotel.rooms.filter(
      (r) => r.toString() !== room._id.toString(),
    );
    await hotel.save();

    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    next(error);
  }
};
