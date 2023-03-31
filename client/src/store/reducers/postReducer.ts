import { IPostState, postAction, PostActionTypes } from "../../types/post";

const initialState: IPostState = {
  posts: [],
  fetchPostsLoading: false,
  fetchPostsError: null,
};

export const postReducer = (
  state = initialState,
  action: postAction
): IPostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS:
      return {
        posts: state.posts,
        fetchPostsLoading: true,
        fetchPostsError: null,
      };
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return {
        posts: action.payload,
        fetchPostsLoading: false,
        fetchPostsError: null,
      };
    case PostActionTypes.FETCH_POSTS_ERROR:
      return {
        posts: state.posts,
        fetchPostsLoading: false,
        fetchPostsError: action.payload,
      };
    case PostActionTypes.ADD_POST:
      return {
        posts: state.posts,
        fetchPostsLoading: true,
        fetchPostsError: null,
      };
    case PostActionTypes.ADD_POST_SUCCESS:
      return {
        posts: [...action.payload, ...state.posts],
        fetchPostsLoading: false,
        fetchPostsError: null,
      };
    case PostActionTypes.ADD_POST_ERROR:
      return {
        posts: state.posts,
        fetchPostsLoading: false,
        fetchPostsError: action.payload,
      };
    case PostActionTypes.DELETE_POST:
      return {
        posts: state.posts,
        fetchPostsLoading: true,
        fetchPostsError: null,
      };
    case PostActionTypes.DELETE_POST_SUCCESS:
      return {
        posts: state.posts.filter((post) => post.id !== action.payload),
        fetchPostsLoading: false,
        fetchPostsError: null,
      };
    case PostActionTypes.DELETE_POST_ERROR:
      return {
        posts: state.posts,
        fetchPostsLoading: false,
        fetchPostsError: action.payload,
      };
    case PostActionTypes.UPDATE_POST:
      return {
        posts: state.posts,
        fetchPostsLoading: true,
        fetchPostsError: null,
      };
    case PostActionTypes.UPDATE_POST_SUCCESS:
      return {
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        fetchPostsLoading: false,
        fetchPostsError: null,
      };
    case PostActionTypes.UPDATE_POST_ERROR:
      return {
        posts: state.posts,
        fetchPostsLoading: false,
        fetchPostsError: action.payload,
      };
    default:
      return state;
  }
};
