import { body } from "express-validator";
import validateResult from "../utils/handleValidator.js";

const validateUser = [
  body("username")
    .exists()
    .withMessage("Username is required.")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long."),

  body("name")
    .exists()
    .withMessage("Name is required.")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long.")
    .isLength({ max: 20 })
    .withMessage("Name must be no more than 20 characters long."),

  body("email")
    .exists()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Email must be valid."),

  body("password")
    .exists()
    .withMessage("Password is required.")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long."),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

export default validateUser;
