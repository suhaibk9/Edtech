import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/AuthSlice.js";
import courseReducer from "./slices/CourseSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
  devTools: true,
});
export default store;
