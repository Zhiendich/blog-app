import React from "react";
import { useLocation } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { selectPosts } from "../store/selectors/postSelector";
import Post from "./Post";

const PostList = () => {
  const { getPosts } = useActions();
  const posts = useTypedSelector(selectPosts);
  const cat = useLocation().search;
  React.useEffect(() => {
    getPosts(cat);
  }, [cat]);
  return (
    <div className="flex flex-col items-center">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            category={post.category}
            content={post.content}
            title={post.title}
            user_id={post.user_id}
            date={post.date}
            id={post.id}
            key={post.id}
            img={post.img}
          />
        ))
      ) : (
        <h1 className="text-[35px] font-bold text-center">Нет постов</h1>
      )}
    </div>
  );
};

export default PostList;
