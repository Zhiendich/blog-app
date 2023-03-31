import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { categories } from "../data/categories";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getPost } from "../services/post";
import { uploadImage } from "../services/upload";
import { selectUser } from "../store/selectors/userSelector";
import { IPost } from "../types/post";
import Button from "../UI/Button/Button";
import TextField from "../UI/TextField/TextField";
const MakePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { addPost, updatePost } = useActions();
  const file = React.useRef<File | null>(null);
  const user = useTypedSelector(selectUser);
  React.useEffect(() => {
    if (id) {
      getPost(id).then((data) => setPost(data));
    }
  }, [id]);
  React.useEffect(() => {
    if (post && post.user_id === user?.id) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [post, user?.id]);
  const changeCategory = (name: string) => {
    setCategory(name);
  };
  const createPost = () => {
    if (user?.id) {
      const newPost: IPost = {
        title,
        content,
        category,
        date: String(Date.now()),
        user_id: user.id,
      };
      if (file.current) {
        newPost.img = file.current.name;
        const formData = new FormData();
        formData.append("file", file.current);
        formData.append("name", file.current.name);
        uploadImage(formData);
      }
      if (title && content && category) {
        addPost(newPost);
        setTitle("");
        setContent("");
        setCategory("");
        file.current = null;
      }
    }
  };
  const updatePostHandler = () => {
    if (id && user?.id) {
      const updatedPost: IPost = {
        id: Number(id),
        title,
        content,
        category,
        date: String(Date.now()),
        user_id: user.id,
      };
      if (file.current) {
        updatedPost.img = file.current.name;
        const formData = new FormData();
        formData.append("file", file.current);
        formData.append("name", file.current.name);
        uploadImage(formData);
      }
      if (title && content && category) {
        updatePost(updatedPost);
        navigate("../");
      }
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      file.current = e.target.files[0];
    }
  };
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  return (
    <div className="flex">
      <div className="basis-5/6 max-w-[85%]">
        <TextField
          className="border-[1px] border-[#ccc] mb-4 rounded-none placeholder:text-[black] w-full"
          fieldType="text"
          value={title}
          setValue={setTitle}
          placeholder="Заголовок"
        />
        <textarea
          value={content}
          onChange={onChangeTextArea}
          className="border-[1px] border-[#ccc] rounded-none placeholder:text-[black] w-full h-[86%] p-4"
        />
      </div>
      <div className="basis-1/6 ml-5 ">
        <div className="border-[1px] p-4 flex flex-col items-center">
          <h1 className="text-[25px] font-bold mb-2">Публикация</h1>
          <label htmlFor="file">
            <div className=" cursor-pointer mb-3 text-[18px]">
              Добавить фото
            </div>
            {id && post?.user_id === user?.id ? (
              <Button text="Обновить данные" onClick={updatePostHandler} />
            ) : (
              <Button text="Опубликовать" onClick={createPost} />
            )}
            <input
              className="hidden"
              type="file"
              id="file"
              onChange={uploadFileHandler}
            />
          </label>
        </div>
        <div className="border-[1px] p-4 mt-3 ">
          <h1 className="text-[25px] font-bold mb-2 text-center">Категория</h1>
          {categories.map((c) => (
            <div key={c.title}>
              <input
                type="radio"
                name="categories"
                value={c.title}
                checked={c.title === category}
                onChange={() => changeCategory(c.title)}
              />
              <span className="text-[18px] ml-2">{c.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakePost;
