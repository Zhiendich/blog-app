import axios from "axios";

export const uploadImage = async (data: FormData) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/upload`, data);
  } catch (error: any) {
    console.log(error);
  }
};
