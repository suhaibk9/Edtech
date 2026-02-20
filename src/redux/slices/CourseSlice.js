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
export const deleteCourse = createAsyncThunk("course/delete", async (id) => {
  try {
    const response = AxiosInstance.delete(`/courses/${id}`);
    toast.promise(response, {
      loading: "Deleting Course...",
      success: "Course Deleted Successfully",
      error: "Failed to Delete Course",
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});
export const createCourse = createAsyncThunk("course/create", async (data) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("createdBy", data?.createdBy);
    formData.append("thumbnail", data?.thumbnail);

    const response = AxiosInstance.post("/courses", formData);
    toast.promise(response, {
      loading: "Creating new course",
      success: "Course created successfully",
      error: "Failed to create course",
    });

    return (await response).data;
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
