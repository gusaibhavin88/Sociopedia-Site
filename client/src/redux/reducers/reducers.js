import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  isAuthenticated: false,
  user: null,
  message: null,
};

//authReduser

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
      state.isAuthenticated = false;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload.data })
      );
    },
    registerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // console.log(state.error);
      state.success = false;
      state.isAuthenticated = false;
    },

    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload.data })
      );
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.isAuthenticated = false;
    },

    logoutStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
      state.isAuthenticated = true;
    },
    logoutSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.isAuthenticated = false;
      state.message = action.payload.data.message;
      state.user = null;
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload.data })
      );
    },
    logoutFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.isAuthenticated = true;
    },

    // userReduser

    getUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
      state.isAuthenticated = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      // console.log(state.user);
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action?.payload.data })
      );
    },
    getUserFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      // console.log(state.error);
      state.success = false;
      state.isAuthenticated = false;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFail,
  logoutStart,
  logoutSuccess,
  logoutFail,
  loginFail,
  loginStart,
  loginSuccess,
  getUserFail,
  getUserStart,
  getUserSuccess,
} = authSlice.actions;
export default authSlice.reducer;
