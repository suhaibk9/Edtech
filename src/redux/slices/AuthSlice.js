import { createSlice } from "@reduxjs/toolkit";
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {},
  },
  reducers: {
    logout(state, action) {
      state.isLoggedIn = false;
      state.role = "";
      state.data = {};
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("data");
    },
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
