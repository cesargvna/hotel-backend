import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: String,
  address: String,
  clasification: String,
  image: String,
  price: Number,
  description: String,
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

hotelSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Hotel", hotelSchema);
