import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileUserReducer from "../features/proFileUserSlice";
import postsReducer from "../features/postSlice";
import conversationReducer from "../features/conversationSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    profileUser: profileUserReducer,
    posts: postsReducer,
    conversations: conversationReducer
  },
});
