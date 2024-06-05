import { createSlice } from "@reduxjs/toolkit";

const ErrorSlice = createSlice({
  name: "error",
  initialState: {
    msg: {},
    status: null,
    id: null,
  },
  reducers: {
    retrunError: (state, action) => {
      state.msg = action.payload.msg;
      state.status = action.payload.status;
      state.id = action.payload.id;
    },
    clearError: (state, action) => {
      state.msg = {};
      state.status = null;
      state.id = null;
    },
  },
});
export const { retrunError, clearError } = ErrorSlice.actions;
export default ErrorSlice.reducer;
