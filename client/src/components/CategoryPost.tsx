import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getCategoryPosts } from "../services/post";
import { selectUser } from "../store/selectors/userSelector";
import { IPost } from "../types/post";
import SidePostInfo from "./SidePostInfo";

interface ICategoryPost {
  category: string;
  id: number | undefined;
}
const CategoryPost = ({ category, id }: ICategoryPost) => {
  const [posts, setPosts] = React.useState<IPost[]>();
  const user = useTypedSelector(selectUser);
  React.useEffect(() => {
    if (user?.id) {
      getCategoryPosts(category, user?.id).then((data) => setPosts(data));
    }
  }, [category, user?.id]);
  return (
    <div>
      {posts && posts.length > 0 ? (
        posts
          .filter((post) => post.id !== id)
          .map((post) => (
            <SidePostInfo
              category={post.category}
              content={post.content}
              title={post.title}
              user_id={post.user_id}
              date={post.date}
              img={post.img}
              id={post.id}
              key={post.id}
            />
          ))
      ) : (
        <h1 className="text-[20px] font-bold"> Подходящих постов нет </h1>
      )}
    </div>
  );
};

export default CategoryPost;
