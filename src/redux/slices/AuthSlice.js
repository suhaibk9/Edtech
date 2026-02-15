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
export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = AxiosInstance.post("/user/login", data);
    await toast.promise(response, {
      loading: "Wait! Authentication in progress...",
      success: (data) => data?.data?.message,
      error: "Failed to log in",
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = AxiosInstance.get("/user/logout");
    await toast.promise(response, {
      loading: "Wait! Logout in progress...",
      success: (data) => data?.data?.message,
      error: "Failed to logout",
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.isLoggedIn = true;
        state.role = action?.payload?.user?.role;
        state.data = action?.payload?.user;

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
        localStorage.clear();
      });
  },
});
export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
