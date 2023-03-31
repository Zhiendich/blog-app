import axios from "axios";
import { IPost } from "../types/post";

export const getPost = async (id: string): Promise<IPost | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_POST}/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getCategoryPosts = async (
  category: string,
  id: number
): Promise<IPost[] | undefined> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL_POST}/posts/?category=${category}&id=${id}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
