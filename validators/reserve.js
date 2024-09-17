import validateResult from "../utils/handleValidator.js";
import { body } from "express-validator";

const validateReservation = [
  body("fechaIni").exists().withMessage("Fecha de inicio es requerida."),
  body("fechaFin").exists().withMessage("Fecha de fin es requerida."),
  body("userId").exists().withMessage("Usuario es requerido."),
  body("roomId").exists().withMessage("Habitación es requerida."),
  (req, res, next) => {
    return validateResult(req, res, next);
  },
];

export default validateReservation;
