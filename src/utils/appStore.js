import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"

// Define your root reducer here
const appStore = configureStore({
    reducer: {
        user: userReducer,
    }
})


export default appStore;