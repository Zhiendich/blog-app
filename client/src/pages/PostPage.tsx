import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryPost from "../components/CategoryPost";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getPost } from "../services/post";
import { selectUser } from "../store/selectors/userSelector";
import { IPost } from "../types/post";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = React.useState<IPost>();
  const user = useTypedSelector(selectUser);
  const { deletePost } = useActions();
  const deletePostHandler = () => {
    deletePost(Number(id));
    navigate("../");
  };
  const updatePostHandler = () => {
    navigate(`/makePost/${id}`);
  };
  React.useEffect(() => {
    if (id) {
      getPost(id).then((data) => setPost(data));
    }
  }, [id]);
  if (!post) {
    return (
      <h1 className="text-[40px] font-bold text-center">
        Не удалось получить данные о посте
      </h1>
    );
  }
  return (
    <div className="flex justify-between">
      <div className="basis-3/4">
        <img
          className="max-w-[600px] h-[300px]"
          src={
            post?.img ? `${process.env.REACT_APP_API_URL_IMG}/${post?.img}` : ""
          }
          alt=""
        />
        <div className="flex mt-7">
          <img
            className="w-[45px] h-[45px] rounded-full mr-2"
            src={
              post?.avatar
                ? `${process.env.REACT_APP_API_URL_IMG}/${post?.avatar}`
                : `${process.env.REACT_APP_API_URL_IMG}/istockphoto-519078727-612x612.jpg`
            }
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-[18px] font-semibold">{post?.username}</span>
            {post.date && (
              <span className="mt-[-5px]">
                {new Date(Number(post.date)).toLocaleString()}
              </span>
            )}
          </div>
          {user?.id && post.user_id === user?.id && (
            <div className="flex">
              <img
                onClick={updatePostHandler}
                className="w-[20px] h-[20px] cursor-pointer "
                src="https://img.icons8.com/sf-black-filled/512/edit.png"
                alt=""
              />
              <img
                onClick={deletePostHandler}
                className="w-[20px] h-[20px] cursor-pointer"
                src="https://img.icons8.com/material-outlined/512/delete-sign.png"
                alt=""
              />
            </div>
          )}
        </div>
        <h1 className="text-[25px] font-bold my-5">{post.title}</h1>
        <p className="text-[18px]">{post.content}</p>
      </div>
      <div className="basis-1/4">
        <h1 className="text-[20px] font-bold">
          Другие посты которые могут вам понравиться :
        </h1>
        <div className="flex flex-col items-center mt-5">
          <CategoryPost category={post.category} id={Number(id)} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
