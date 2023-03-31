import { NextFunction, Request, Response } from "express";
import userServices from "../services/userServices.js";
import UserServices from "../services/userServices.js";
import { validationResult } from "express-validator";

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { username, email, password } = req.body;
      const newUser = await UserServices.registration(
        username,
        email,
        password
      );
      res.status(200).json(newUser);
    } catch (error) {
      res
        .status(404)
        .json({ message: "Не удалось зарегестрировать пользователя" });
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UserServices.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Неправильный логин или пароль" });
    }
  }
  async isUserAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await userServices.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Не удалось получить пользователя" });
    }
  }
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { newUserData } = req.body;
      const user = await userServices.updateUser(newUserData);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Не удалось получить пользователя" });
    }
  }
}

export default new UserController();
