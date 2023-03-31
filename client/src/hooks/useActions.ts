import { bindActionCreators } from "redux";
import ActionsCreator from "../store/action-creators/";
import { useAppDispatch } from "./useTypedSelector";
export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(ActionsCreator, dispatch);
};
