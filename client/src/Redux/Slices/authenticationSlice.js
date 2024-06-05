import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { retrunError } from "./ErrorSlice";

const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const loadUser = createAsyncThunk(
  "/api/loadUser",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const config = tokenConfig(getState);
      const response = await axios.get("/api/user", config);
      return response.data;
    } catch (err) {
      dispatch(retrunError(err.response.data, err.response.status));
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const response = await axios.post("/api/register", body, config);
      return response.data;
    } catch (err) {
      dispatch(
        retrunError(
          err.response.data,
          err.response.status,
          "REGISTERATION_FAIL"
        )
      );
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const response = await axios.post("/api/login", body, config);
      return response.data;
    } catch (err) {
      dispatch(
        retrunError(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return {};
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  },
  reducers: {
    logoutSuccess: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //loaduser
    builder.addCase(loadUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
    });

    //register
    builder.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token");
    });
  },
});

export default authSlice.reducer;
