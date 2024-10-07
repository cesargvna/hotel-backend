import validateResult from "../utils/handleValidator.js";
import { body } from "express-validator";

const validateRoom = [
  body("type").exists().withMessage("Type is required."),
  body("number").exists().withMessage("Number is required."),
  body("price").exists().withMessage("Price is required."),
  body("hotelId").exists().withMessage("Hotel ID is required."),

  (req, res, next) => {
    return validateResult(req, res, next);
  },
];
export default validateRoom;
