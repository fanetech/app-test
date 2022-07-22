import { combineReducers } from "redux"; //permit to regroup all actions
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import allPostReducer from "./AllPost.reducer";
export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  allPostReducer,
});
