import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../../config/AxiosInstance";
export const createAccount = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = AxiosInstance.post("/user/register", data);
    await toast.promise(response, {
      loading: "Creating Account...",
      success: (data) => data?.data?.message,
      error: "Failed to create account",
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {},
  },
  reducers: {
    logout(state) {
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
