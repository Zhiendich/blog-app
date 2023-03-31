import { GlobalAppState } from "../reducers";

export const selectPosts = (state: GlobalAppState) => state.post.posts;
