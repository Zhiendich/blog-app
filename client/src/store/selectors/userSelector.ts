import { useTypedSelector } from "../../hooks/useTypedSelector";
import { GlobalAppState } from "../reducers";

export const selectUser = (state: GlobalAppState) => state.user.data?.user;
export const selectToken = (state: GlobalAppState) => state.user.data?.token;
