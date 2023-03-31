import { NextFunction, Request, Response } from "express";
import postServices from "../services/postServices.js";
import { validationResult } from "express-validator";
import { IPost } from "../models/post.js";

class PostContoller {
  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = await postServices.getPost(id);
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }

  async addPost(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      const { title, content, img, category, date, user_id } = req.body;
      const post = await postServices.createPost({
        title,
        content,
        date,
        img,
        category,
        user_id,
      });
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await postServices.deletePost(id);
      res.status(200).json({ message: "Пост успешно удален" });
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, content, date, title, img, id, user_id }: IPost =
        req.body;
      const post = await postServices.updatePost({
        category,
        content,
        date,
        title,
        id,
        img,
        user_id,
      });
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        category: String(req.query.category),
        id: String(req.query.id),
      };
      const posts = await postServices.getPosts(query);
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PostContoller();
