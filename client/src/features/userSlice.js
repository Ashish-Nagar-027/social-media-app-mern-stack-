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
  },
});

export const { loginUser, logoutOut } = userSlice.actions;
export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;
