import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  number: Number,
  state: {
    type: String,
    default: "available",
  },
  price: Number,
  type: String,
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
  },
  reserves: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reserve",
    },
  ],
});

roomSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Room", roomSchema);
