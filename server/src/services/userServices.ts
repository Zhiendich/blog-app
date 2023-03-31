import db from "../db.js";
import bcrypt from "bcryptjs";
import tokenServices from "./tokenServices.js";
import { IUser } from "../models/user.js";
class UserServices {
  async registration(username: string, email: string, password: string) {
    try {
      const find = await db.query("SELECT * FROM users where email = $1", [
        email,
      ]);
      if (find.rows.length) {
        throw Error("Пользователь уже занят");
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const newUser = await db.query(
        "INSERT INTO users (username, email, password) values ($1,$2,$3) RETURNING *",
        [username, email, hashPassword]
      );
      return { user: newUser.rows[0] };
    } catch (error) {
      console.log(error);
      return { error: "Пользователь уже занят" };
    }
  }
  async login(email: string, password: string) {
    try {
      const userPassword = await db.query(
        "SELECT password FROM users where email = $1",
        [email]
      );
      const isPasswordEqual = await bcrypt.compare(
        password,
        userPassword.rows[0].password
      );
      if (isPasswordEqual) {
        const user = await db.query("SELECT * FROM users where email = $1", [
          email,
        ]);
        if (user.rows.length) {
          const data = tokenServices.generateToken({ id: user.rows[0].id });
          return { user: user.rows[0], token: data };
        }
      } else {
        throw Error("Неправильный пароль");
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async getUser(id: string) {
    try {
      const user = await db.query("SELECT * FROM users where id = $1", [id]);
      if (user) {
        return user.rows[0];
      }
      throw Error("Пользователя не существует");
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async updateUser(data: IUser) {
    try {
      const { email, id, password, username, avatar } = data;
      const user = await db.query(
        "UPDATE users SET email = $2, password = $3, username = $4, avatar = $5 where id = $1 RETURNING *",
        [id, email, password, username, avatar]
      );
      if (user) {
        return user.rows[0];
      }
      throw Error("Не удалось обновить данные");
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default new UserServices();
