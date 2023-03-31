import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import poll from "./db.js";
import multer from "multer";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app: Application = express();
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${__dirname}/public/images`);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await poll.connect();
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer({ storage });
app.use("/api/images", express.static(path.join(__dirname, "public/images")));
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
    return res.status(200).json(error);
  }
});
