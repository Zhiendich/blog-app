import { Router } from "express";
import postController from "../controllers/postController.js";
import { check } from "express-validator";

const router = Router();
router.get("/posts", postController.getPosts);
router.get("/:id", postController.getPost);
router.post(
  "/",
  [
    check("title", "Title не может быть пустым").notEmpty(),
    check("content", "Content не может быть пустым").notEmpty(),
    check("category", "Category не может быть пустым").notEmpty(),
    check("user_id", "У поста должен быть автор").notEmpty(),
  ],
  postController.addPost
);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);

export default router;
