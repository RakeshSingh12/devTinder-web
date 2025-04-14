import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    //remove feed request  from the Redux if we click ignored and interested button from Feed page
    deleteFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, deleteFeed } = feedSlice.actions;

export default feedSlice.reducer;
