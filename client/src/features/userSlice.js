import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  editUser: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutOut: (s) => {
      return initialState;
    },
    setFollowings: (state, action) => {
      state.currentUser.followings = action.payload;
    },
    setFollowers: (state, action) => {
      state.currentUser.followers = action.payload;
    },
    setEditProfile: (state) => {
      state.editUser = !state.editUser;
    },
  },
});

export const {
  loginUser,
  logoutOut,
  setFollowings,
  setFollowers,
  setEditProfile,
} = userSlice.actions;
export const selectUser = (state) => state.user.currentUser;
export const editCurrentUser = (state) => state.user.editUser;

export default userSlice.reducer;
