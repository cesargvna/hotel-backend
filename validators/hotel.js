import validateResult from "../utils/handleValidator.js";
import { body } from "express-validator";

const validateHotel = [
  body("name").exists().withMessage("Name is required."),
  body("address").exists().withMessage("Address is required."),
  body("clasification").exists().withMessage("Clasification is required."),
  body("price").exists().withMessage("Price is required."),
  body("description").exists().withMessage("Description is required."),

  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

export default validateHotel;
