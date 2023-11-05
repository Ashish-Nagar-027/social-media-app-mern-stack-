import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileUserReducer from "../features/proFileUserSlice";
import postsReducer from "../features/postSlice";
import conversationReducer from "../features/conversationSlice"
import showSideBarReducer from "../features/showSideBarSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    profileUser: profileUserReducer,
    posts: postsReducer,
    conversations: conversationReducer,
    showSideBar: showSideBarReducer
  },
});
