import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/AuthSlice.js";
import courseReducer from "./slices/CourseSlice.js";
import lectureReducer from "./slices/LectureSlice.js";
import razorpayReducer from "./slices/RazorPaySlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    lecture: lectureReducer,
    razorpay: razorpayReducer,
  },
  devTools: true,
});
export default store;
