import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      state.currentUser = actions.payload;
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
  },
});

export const { loginUser, logoutOut, setFollowings, setFollowers } =
  userSlice.actions;
export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;
