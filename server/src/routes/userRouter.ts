import { Router } from "express";
import userController from "../controllers/userContoller.js";
import { check } from "express-validator";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router();

router.post(
  "/registration",
  [
    check("username", "Имя не может быть пустым").notEmpty(),
    check("email", "Неправильный Email").isEmail(),
    check("password", "Пароль должен быть длинее 6 символов").isLength({
      min: 6,
    }),
  ],
  userController.registration
);
router.post(
  "/login",
  [
    check("email", "Неправильный Email").isEmail(),
    check("password", "Пароль должен быть длинее 6 символов").isLength({
      min: 6,
    }),
  ],
  userController.login
);
router.get("/getUser", checkAuth, userController.isUserAuth);
router.put("/", userController.updateUser);

export default router;
