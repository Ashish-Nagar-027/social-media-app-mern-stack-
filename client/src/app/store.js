import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileUserReducer from "../features/proFileUserSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    profileUser: profileUserReducer,
  },
});
