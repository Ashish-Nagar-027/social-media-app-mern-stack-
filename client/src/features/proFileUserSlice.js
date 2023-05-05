import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileUser: null,
  followings: null,
  followers: null,
};

export const profileUserSlice = createSlice({
  name: "profileUser",
  initialState,
  reducers: {
    setProfileUser: (state, action) => {
      state.profileUser = action.payload;
    },
    setUserFollowings: (state, action) => {
      state.followings = action.payload;
    },
    setUserFollowers: (state, action) => {
      state.followers = action.payload;
    },
  },
});

export const { setProfileUser, setUserFollowings, setUserFollowers } =
  profileUserSlice.actions;
export const selectProfileUser = (state) => state.profileUser.profileUser;
export const selectProfileUserfollowings = (state) =>
  state.profileUser.followings;
export const selectProfileUserFollowers = (state) =>
  state.profileUser.followers;

export default profileUserSlice.reducer;
