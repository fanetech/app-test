import { GET_ALL_POSTS } from "../actions/post.actions";
const initialeSate = {};
export default function allPostReducer(state = initialeSate, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    default:
      return state;
  }
}
