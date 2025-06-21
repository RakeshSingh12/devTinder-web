import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

// Define your root reducer here
// and combine all the slices into a single store.
// This store will be used to manage the state of the application
// Import necessary reducers from their respective slices
// and configure the store with these reducers. 
// This is the main Redux store configuration for the application
// It combines multiple slices of state into a single store

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;
