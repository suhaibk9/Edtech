import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../../config/AxiosInstance";
const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerfied: false,
  allPayements: {},
  finalMonths: {},
  monthlySalesRecord: {},
};
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = AxiosInstance.get("/payments/razorpay-key");
    toast.promise(response, {
      loading: "Fetching RazorPay Id...",
      success: (data) => data?.data?.message,
      error: "Failed to fetch RazorPay Id",
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});
export const purchaseCourseBundle = createAsyncThunk(
  "/payments/subscribe",
  async () => {
    try {
      const response = AxiosInstance.post("/payments/subscribe");
      toast.promise(response, {
        loading: "Subscribing...",
        success: (data) => data?.data?.message,
        error: "Failed to subscribe",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
    }
  },
);
export const verifyPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = AxiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      toast.promise(response, {
        loading: "Verifying Payment...",
        success: (data) => data?.data?.message,
        error: "Failed to verify payment",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
    }
  },
);
const getPaymentRecord = createAsyncThunk("/payments/getRecord", async () => {
  try {
    const response = AxiosInstance.get("/payments?count=100");
    toast.promise(response, {
      loading: "Fetching Payment Record...",
      success: (data) => data?.data?.message,
      error: "Failed to fetch Payment Record",
    });
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
});
export const cancelCourseBundle = createAsyncThunk(
  "/payments/unsubscribe",
  async (data) => {
    try {
      const response = AxiosInstance.post("/payments/unsubscribe");
      toast.promise(response, {
        loading: "Unsubscribing...",
        success: (data) => data?.data?.message,
        error: "Failed to unsubscribe",
      });
      return (await response).data;
    } catch (error) {
      console.log(error);
    }
  },
);
const RazorPaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRazorPayId.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.key = action?.payload?.key;
    });
    builder.addCase(purchaseCourseBundle.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.subscription_id = action?.payload?.subscription_id;
    });
    builder.addCase(verifyPayment.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.isPaymentVerfied = action?.payload?.isPaymentVerfied;
    });
    builder.addCase(verifyPayment.rejected, (state, action) => {
      if (!action.payload) return;
      state.isPaymentVerfied = action?.payload?.isPaymentVerfied;
    });
    builder.addCase(getPaymentRecord.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.allPayements = action?.payload?.allPayements;
      state.finalMonths = action?.payload?.finalMonths;
      state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
    });
    builder.addCase(cancelCourseBundle.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.isPaymentVerfied = action?.payload?.isPaymentVerfied;
    });
  },
});
export const {} = RazorPaySlice.actions;
export default RazorPaySlice.reducer;
