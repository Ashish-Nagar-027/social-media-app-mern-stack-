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
    setBookmarks: (state, action) => {
      const { postId} = action.payload;
      if(state.currentUser.bookmarkedPosts.includes(postId)){
        console.log(postId)
        state.currentUser.bookmarkedPosts =  state.currentUser.bookmarkedPosts.filter(id => id !== postId)
      }
      else(
        state.currentUser.bookmarkedPosts.push(postId)
      )
    },
  },
});

export const {
  loginUser,
  logoutOut,
  setFollowings,
  setFollowers,
  setEditProfile,
  setBookmarks
} = userSlice.actions;
export const selectUser = (state) => state.user.currentUser;
export const editCurrentUser = (state) => state.user.editUser;

export default userSlice.reducer;
