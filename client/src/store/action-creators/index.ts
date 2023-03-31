import * as UserActionsCreator from "./user";
import * as postActionsCreator from "./post";
export default {
  ...UserActionsCreator,
  ...postActionsCreator,
};
