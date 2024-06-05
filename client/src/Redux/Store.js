import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "./Slices/ErrorSlice";
import authReducer from "./Slices/authenticationSlice";

export const store = configureStore({
  reduce: {
    error: errorReducer,
    auth: authReducer,
  },
});
