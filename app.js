import express from "express";
const app = express();
import cors from "cors";
import userRouter from "./routes/user.router.js";
import loginRouter from "./routes/login.router.js";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.js";
import { errorHandler } from "./middleware/global.middleware.js";
import { tokenExtractor, userExtractor } from "./middleware/sesion.js";

mongoose.set("strictQuery", false);
console.log("connecting to MongoDB");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`connected to ${MONGODB_URI}`);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cors());
app.use(tokenExtractor);

app.use("/api/user", userExtractor, userRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);

export default app;
