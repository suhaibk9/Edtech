import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../../config/AxiosInstance";
export const getAllCourses = createAsyncThunk("course/get", async () => {
  try {
    const response = AxiosInstance.get("/courses");
    toast.promise(response, {
      loading: "Loading Courses...",
      success: "Courses Loaded Successfully",
      error: "Failed to Load Courses",
    });
    return (await response).data.courses;
  } catch (error) {
    console.log(error);
  }
});
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.courseData = action.payload;
    });
  },
});
export const {} = courseSlice.actions;
export default courseSlice.reducer;
