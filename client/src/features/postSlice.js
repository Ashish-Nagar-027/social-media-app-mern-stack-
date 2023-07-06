import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setLikes: (state, action) => {
      const { postId, currentUserId } = action.payload;
      state.posts.map((post) => {
        if (post._id === postId) {
          if (post.likes.includes(currentUserId)) {
            const index = post.likes.indexOf(currentUserId);
            if (index > -1) {
              // only splice array when item is found
              post.likes.splice(index, 1); // 2nd parameter means remove one item only
              return post
            }
            return post
          } else {
            post.likes.push(currentUserId); 
            return post
          }
        }
        return post
      });
    },
    setComments: (state, action) => {
      const { postId, comment } = action.payload;

       state.posts.map((post) => {
        if (post._id === postId) {
         return post.comments.push(comment);
        }
        return post
      });
    },
  },
});

export const { setPosts, setLikes, setComments } = postSlice.actions;
export const selectPosts = (state) => state.posts.posts;

export default postSlice.reducer;
