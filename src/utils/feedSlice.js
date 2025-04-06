import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      console.log("feed :::" + action.payload)
      return action.payload;
    },
    deleteFeed: (state, action) => {
      return null;
    },
  },
});

export const { addFeed, deleteFeed } = feedSlice.actions;

export default feedSlice.reducer;
