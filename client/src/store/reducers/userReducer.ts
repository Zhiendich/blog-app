import { IUserState, userAction, UserActionTypes } from "../../types/user";

const initialState: IUserState = {
  data: null,
};

export const userReducer = (
  state = initialState,
  action: userAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.USER_AUTH:
      return {
        isAuthLoading: true,
        isAuthError: null,
        data: state.data,
      };
    case UserActionTypes.USER_AUTH_SUCCESS:
      return {
        isAuthLoading: false,
        isAuthError: null,
        data: action.payload,
      };
    case UserActionTypes.USER_AUTH_ERROR:
      return {
        isAuthLoading: false,
        isAuthError: action.payload,
        data: state.data,
      };
    case UserActionTypes.USER_REGISTER:
      return {
        isRegisterLoading: true,
        isRegisterError: null,
        data: state.data,
      };
    case UserActionTypes.USER_REGISTER_SUCCESS:
      return {
        isRegisterLoading: false,
        isRegisterError: null,
        data: state.data,
      };
    case UserActionTypes.USER_REGISTER_ERROR:
      return {
        isRegisterLoading: false,
        isRegisterError: action.payload,
        data: state.data,
      };
    case UserActionTypes.IS_AUTH:
      return {
        isAuthLoading: true,
        isAuthError: null,
        data: state.data,
      };
    case UserActionTypes.IS_AUTH_SUCCESS:
      return {
        isAuthLoading: false,
        isAuthError: null,
        data: { token: null, user: action.payload },
      };
    case UserActionTypes.IS_AUTH_ERROR:
      return {
        isAuthLoading: false,
        isAuthError: action.payload,
        data: state.data,
      };
    case UserActionTypes.USER_UPDATE:
      return {
        isAuthLoading: false,
        isAuthError: null,
        data: state.data,
      };
    case UserActionTypes.USER_UPDATE_SUCCESS:
      return {
        isAuthLoading: false,
        isAuthError: null,
        data: { token: null, user: action.payload },
      };
    case UserActionTypes.USER_UPDATE_ERROR:
      return {
        isAuthLoading: false,
        isAuthError: action.payload,
        data: state.data,
      };
    case UserActionTypes.USER_LOG_OUT:
      return {
        data: null,
      };
    default:
      return state;
  }
};
