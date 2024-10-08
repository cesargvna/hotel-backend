import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  email: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reserve",
    },
  ],
  role: {
    type: String,
    default: "client"
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
