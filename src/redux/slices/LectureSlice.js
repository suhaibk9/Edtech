import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../../config/AxiosInstance";
export const getCourseLectures = createAsyncThunk(
  "/course/lectures/get",
  async (courseId) => {
    try {
      const response = AxiosInstance.get(`/courses/${courseId}`);
      toast.promise(response, {
        loading: "Fetching Lectures...",
        success: (data) => data?.data?.message,
        error: "Failed to fetch Lectures",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("description", data.description);
      formData.append("title", data.title);

      const response = AxiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(response, {
        loading: "Adding Lecture...",
        success: (data) => data?.data?.message,
        error: "Failed to add Lecture",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = AxiosInstance.delete(
        `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`,
      );
      toast.promise(response, {
        loading: "Deleting Lecture...",
        success: (data) => data?.data?.message,
        error: "Failed to delete Lecture",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
    }
  },
);
const LectureSlice = createSlice({
  name: "lecture",
  initialState: { lectures: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseLectures.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.lectures = action?.payload?.lectures;
    });
    builder.addCase(addCourseLecture.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.lectures = action?.payload?.lectures;
    });
    builder.addCase(deleteCourseLecture.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.lectures = action?.payload?.lectures;
    });
  },
});
export default LectureSlice.reducer;