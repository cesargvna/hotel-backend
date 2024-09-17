import Reserve from "../models/reserve.js";
import Room from "../models/room.js";
import User from "../models/user.js";

export const getReserves = async (req, res, next) => {
  try {
    const reserves = await Reserve.find({})
      .populate("roomId")
      .populate("userId");
    res.status(200).json(reserves);
  } catch (error) {
    next(error);
  }
};

export const getReserve = async (req, res, next) => {
  try {
    const reserve = await Reserve.findById(req.params.id)
      .populate("roomId")
      .populate("userId");
    if (!reserve) return res.status(404).json({ message: "Reserve not found" });
    res.status(200).json(reserve);
  } catch (error) {
    next(error);
  }
};

export const createReserve = async (req, res, next) => {
  const { fechaIni, fechaFin, userId, roomId } = req.body;
  try {
    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    const reserve = new Reserve({
      fechaIni,
      fechaFin,
      userId: user.id,
      roomId: room.id,
    });
    const savedReserve = await reserve.save();
    user.reservations = user.reservations.concat(savedReserve._id);
    room.reserves = room.reserves.concat(savedReserve._id);
    await user.save();
    await room.save();
    res.status(201).json(savedReserve);
  } catch (error) {
    next(error);
  }
};
export const updateReserve = async (req, res, next) => {
  const { id } = req.params;
  const { fechaIni, fechaFin, state, userId, roomId } = req.body;
  try {
    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    const reserve = {
      fechaIni,
      fechaFin,
      state,
      userId: user.id,
      roomId: room.id,
    };
    const updatedReserve = await Reserve.findByIdAndUpdate(id, reserve, {
      new: true,
    });
    await updatedReserve.save();
    res.status(200).json(updatedReserve);
  } catch (error) {
    next(error);
  }
};

export const deleteReserve = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reserve = await Reserve.findById(id);
    if (!reserve) return res.status(404).json({ message: "Reserve not found" });

    const room = await Room.findById(reserve.roomId);
    const user = await User.findById(reserve.userId);
    room.reserves = room.reserves.filter(
      (r) => r.toString() !== reserve._id.toString(),
    );
    user.reservations = user.reservations.filter(
      (r) => r.toString() !== reserve._id.toString(),
    );
    await room.save();
    await user.save();

    await Reserve.findByIdAndDelete(id);
    res.status(200).json({ message: "Reserve deleted" });
  } catch (error) {
    console.log("llego", error);
    next(error);
  }
};
