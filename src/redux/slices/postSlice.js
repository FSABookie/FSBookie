import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "postId",
  initialState: {
    postId: null,
  },
  reducers: {
    selectId: (state, action) => {
        console.log(action.payload)
        state.postId = null;
        state.postId = action.payload;
    },
  },
});

export const { selectId } = postSlice.actions;
export default postSlice;
