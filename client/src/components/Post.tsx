import React from "react";
import { useNavigate } from "react-router-dom";
import { IPost } from "../types/post";
import Button from "../UI/Button/Button";

const Post = ({ content, title, id, img }: IPost) => {
  const navigate = useNavigate();
  return (
    <div className="flex mb-10 max-w-[1200px]">
      <div className="basis-2/4">
        <h1 className="text-[30px] font-bold">{title}</h1>
        <p className="my-[40px] text-[20px]">{content}</p>
        <Button text="Подробнее" onClick={() => navigate(`/post/${id}`)} />
      </div>
      <img
        src={img ? `${process.env.REACT_APP_API_URL_IMG}/${img}` : ""}
        alt=""
        className="max-w-[600px] ml-10 w-[600px] max-h-[300px] basis-2/4"
      />
    </div>
  );
};

export default Post;
