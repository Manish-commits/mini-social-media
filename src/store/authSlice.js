import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isLogin: false,  
  },
  reducers: {
    toggleAuthForm: (state) => {
      state.isLogin = !state.isLogin;
    },
    loginUser: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    logoutUser: (state) => {
        state.user = null;
        state.isAuthenticated = false;
    },
  },
});

export const { toggleAuthForm, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
