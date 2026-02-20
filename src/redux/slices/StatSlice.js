import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../../config/AxiosInstance";
const initialState = {
  allUsersCount: 0,
  subscribedUsersCount: 0,
};
export const getStatData = createAsyncThunk("/state/getStatData", async () => {
  try {
    const response = AxiosInstance.get("/admin/stats/users");
    toast.promise(response, {
      loading: "Loading...",
      success: "Data Fetched Successfully",
      error: "Failed to Fetch Data",
    });
    return (await response).data;
  } catch (err) {
    toast.error(err.response.data.message);
  }
});
const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatData.fulfilled, (state, action) => {
      state.allUsersCount = action.payload.allUsersCount;
      state.subscribedUsersCount = action.payload.subscribedUsersCount;
    });
  },
});

export default statSlice.reducer;
