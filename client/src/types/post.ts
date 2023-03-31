import { IUser } from "./user";

export interface IPost extends Partial<IUser> {
  id?: number;
  title: string;
  content: string;
  img?: string;
  date?: string;
  user_id: number;
  category: string;
}

export interface IPostState {
  posts: IPost[];
  fetchPostsLoading: boolean;
  fetchPostsError: null | string;
}

export enum PostActionTypes {
  FETCH_POSTS = "FETCH_POSTS",
  FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_ERROR = "USER_AUTH_ERROR",
  ADD_POST = "ADD_POST",
  ADD_POST_SUCCESS = "ADD_POST_SUCCESS",
  ADD_POST_ERROR = "ADD_POST_ERROR",
  DELETE_POST = "DELETE_POST",
  DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS",
  DELETE_POST_ERROR = "DELETE_POST_ERROR",
  UPDATE_POST = "UPDATE_POST",
  UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS",
  UPDATE_POST_ERROR = "UPDATE_POST_ERROR",
}

interface FetchPostAction {
  type: PostActionTypes.FETCH_POSTS;
}

interface FetchPostSuccessAction {
  type: PostActionTypes.FETCH_POSTS_SUCCESS;
  payload: IPost[];
}

interface FetchPostErrorAction {
  type: PostActionTypes.FETCH_POSTS_ERROR;
  payload: string;
}

interface AddPostAction {
  type: PostActionTypes.ADD_POST;
}

interface AddPostSuccessAction {
  type: PostActionTypes.ADD_POST_SUCCESS;
  payload: IPost[];
}

interface AddPostErrorAction {
  type: PostActionTypes.ADD_POST_ERROR;
  payload: string;
}

interface DeletePostAction {
  type: PostActionTypes.DELETE_POST;
}

interface DeletePostSuccessAction {
  type: PostActionTypes.DELETE_POST_SUCCESS;
  payload: number;
}

interface DeletePostErrorAction {
  type: PostActionTypes.DELETE_POST_ERROR;
  payload: string;
}

interface UpdatePostAction {
  type: PostActionTypes.UPDATE_POST;
}

interface UpdatePostSuccessAction {
  type: PostActionTypes.UPDATE_POST_SUCCESS;
  payload: IPost;
}

interface UpdatePostErrorAction {
  type: PostActionTypes.UPDATE_POST_ERROR;
  payload: string;
}

export type postAction =
  | FetchPostAction
  | FetchPostSuccessAction
  | FetchPostErrorAction
  | AddPostAction
  | AddPostSuccessAction
  | AddPostErrorAction
  | DeletePostAction
  | DeletePostSuccessAction
  | DeletePostErrorAction
  | UpdatePostAction
  | UpdatePostSuccessAction
  | UpdatePostErrorAction;
