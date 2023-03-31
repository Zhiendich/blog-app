import { Dispatch } from "redux";
import axios from "axios";
import { IUser, userAction, UserActionTypes } from "../../types/user";
export const userRegister = (newUserInfo: IUser) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_REGISTER });
      await axios.post(
        `${process.env.REACT_APP_API_URL_USER}/registration`,
        newUserInfo
      );
      dispatch({
        type: UserActionTypes.USER_REGISTER_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_REGISTER_ERROR,
        payload: "Пользователь с таким email уже существует",
      });
    }
  };
};

export const userAuth = (userInfo: { email: string; password: string }) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_AUTH });
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_USER}/login`,
        userInfo
      );
      dispatch({
        type: UserActionTypes.USER_AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_AUTH_ERROR,
        payload: "Неправильные логин или пароль",
      });
    }
  };
};

export const isUserAuth = () => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.IS_AUTH });
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_USER}/getUser`,
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      );

      dispatch({
        type: UserActionTypes.IS_AUTH_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.IS_AUTH_ERROR,
        payload: error,
      });
    }
  };
};

export const updateUser = (newUserData: IUser) => {
  return async (dispatch: Dispatch<userAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_UPDATE });
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL_USER}`,
        { newUserData }
      );
      dispatch({
        type: UserActionTypes.USER_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.USER_UPDATE_ERROR,
        payload: "Не удалось обновить данные пользователя",
      });
    }
  };
};
