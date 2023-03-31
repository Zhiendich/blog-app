import { combineReducers } from "redux";
import { IPostState } from "../../types/post";
import { IUserState } from "../../types/user";
import { postReducer } from "./postReducer";
import { userReducer } from "./userReducer";
export interface GlobalAppState {
  user: IUserState;
  post: IPostState;
}
export const rootReducer = combineReducers<GlobalAppState>({
  user: userReducer,
  post: postReducer,
});
