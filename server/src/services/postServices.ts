import { IPost } from "../models/post.js";
import db from "../db.js";

class PostServices {
  async getPost(id: string) {
    try {
      const post = await db.query(
        "select posts.title, posts.content, posts.img, posts.id, posts.user_id, posts.category, posts.date, users.username, users.email, users.password, users.avatar from posts  INNER JOIN  users ON posts.user_id = users.id where posts.id = $1",
        [id]
      );
      if (!post.rows.length) {
        return { message: "Такого поста не существует" };
      }
      return post.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async createPost({ title, content, date, img, category, user_id }: IPost) {
    try {
      const newPost = await db.query(
        "INSERT INTO posts (title, content, date, img, category, user_id) values ($1,$2,$3,$4,$5, $6) RETURNING *",
        [title, content, date, img, category, user_id]
      );
      return newPost.rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(id: string) {
    try {
      await db.query("delete from posts where id = $1", [id]);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(post: IPost) {
    try {
      if (post.img) {
        const updatedPost = await db.query(
          "UPDATE posts SET category = $2, content = $3, date = $4, img = $5, title = $6 where id = $1 RETURNING *",
          [
            post.id,
            post.category,
            post.content,
            post.date,
            post.img,
            post.title,
          ]
        );
        return updatedPost.rows[0];
      } else {
        const updatedPost = await db.query(
          "UPDATE posts SET category = $2, content = $3, date = $4, title = $6 where id = $1 RETURNING *",
          [post.id, post.category, post.content, post.date, post.title]
        );
        return updatedPost.rows[0];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(query: {
    category: string | undefined;
    id: string | undefined;
  }) {
    try {
      if (query.category !== "undefined") {
        if (query.id !== "undefined") {
          const posts = await db.query(
            "select * from posts where category = $1 AND user_id != $2 order by date DESC ",
            [query.category, query.id]
          );
          return posts.rows;
        } else {
          const posts = await db.query(
            "select * from posts where category = $1  order by date DESC ",
            [query.category]
          );
          return posts.rows;
        }
      } else {
        const posts = await db.query("select * from posts order by date DESC");
        return posts.rows;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PostServices();
