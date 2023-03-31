import { Dispatch } from "redux";
import axios from "axios";
import { IPost, postAction, PostActionTypes } from "../../types/post";

export const addPost = (newPost: IPost) => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.ADD_POST });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_POST}`,
        newPost
      );
      dispatch({
        type: PostActionTypes.ADD_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.ADD_POST_ERROR,
        payload: "Не удалось добавить пост",
      });
    }
  };
};

export const deletePost = (id: number) => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.DELETE_POST });
      await axios.delete(`${process.env.REACT_APP_API_URL_POST}/${id}`);
      dispatch({
        type: PostActionTypes.DELETE_POST_SUCCESS,
        payload: id,
      });
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.DELETE_POST_ERROR,
        payload: "Не удалось удалить пост",
      });
    }
  };
};

export const updatePost = (post: IPost) => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.UPDATE_POST });
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL_POST}/${post.id}`,
        {
          category: post.category,
          content: post.content,
          date: post.date,
          title: post.title,
          img: post.img,
          id: post.id,
          user_id: post.user_id,
        }
      );
      dispatch({
        type: PostActionTypes.UPDATE_POST_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.UPDATE_POST_ERROR,
        payload: "Не удалось обновить  пост",
      });
    }
  };
};

export const getPosts = (cat: string | undefined) => {
  return async (dispatch: Dispatch<postAction>) => {
    try {
      dispatch({ type: PostActionTypes.FETCH_POSTS });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_POST}/posts/${cat}`
      );
      dispatch({
        type: PostActionTypes.FETCH_POSTS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: PostActionTypes.FETCH_POSTS_ERROR,
        payload: "Не удалось загрузить посты",
      });
    }
  };
};
