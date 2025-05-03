// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    role: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.email;
      state.role = action.payload.role;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
