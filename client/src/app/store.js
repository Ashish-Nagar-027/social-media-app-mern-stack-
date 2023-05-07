import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileUserReducer from "../features/proFileUserSlice";
import postsReducer from "../features/postSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profileUser: profileUserReducer,
    posts: postsReducer,
  },
});
