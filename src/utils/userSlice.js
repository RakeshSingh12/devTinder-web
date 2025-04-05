import { createSlice } from "@reduxjs/toolkit";

// Define a user slice with initial state and reducers.
const userSlice = createSlice({
  name: "user",
  initialState: null,

  // Define reducers to handle actions on the user slice.
  reducers: {
    // Add a new user.
    addUser: (state, action) => {
      return action.payload;
    },
    // Delete a user.
    deleteUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
