import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    //remove request If from the Redux if we click accept and reject button from request page
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    }
  },
});

export const { addRequests , removeRequest} = requestSlice.actions;

export default requestSlice.reducer;
