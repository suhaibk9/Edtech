import { useEffect } from "react";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../redux/slices/AuthSlice";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyPayment,
} from "../../redux/slices/RazorPaySlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state.razorpay.key);
  const subscriptionId = useSelector((state) => state.razorpay.subscription_id);
  const userData = useSelector((state) => state.auth.data);

  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (!razorpayKey || !subscriptionId) {
      toast.error("Please try again later");
      return;
    }
    const options = {
      key: razorpayKey,
      name: "EdTech",
      description: "Course Subscription",
      subscription_id: subscriptionId,
      theme: {
        color: "#3399cc",
      },
      prefill: {
        name: userData.fullName,
        email: userData.email,
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;

        toast.success("Payment successful");
        const res = await dispatch(verifyPayment(paymentDetails));
        console.log("verifyPayment response:", res);
        if (res?.payload?.success) {
          await dispatch(getUserData());
          navigate("/checkout/success");
        } else {
          navigate("/checkout/fail");
        }
      },
    };
    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  useEffect(() => {
    (async () => {
      await dispatch(getRazorPayId());
      if (!subscriptionId) await dispatch(purchaseCourseBundle());
    })();
  }, [dispatch]);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative bg-gray-800">
          <h1 className="bg-yellow-500 absolute top-0 w-full py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg text-center text-black">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available courses of
              our platform for{" "}
              <span className="text-yellow-500 font-bold">1 Year Duration</span>
              . All the existing and new launched courses will be also
              available.
            </p>
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <span className="text-white">₹</span> 499
            </p>
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-bold text-center rounded-br-lg rounded-bl-lg text-black"
          >
            Buy Now
          </button>
        </div>
      </form>
    </HomeLayout>
  );
};

export default Checkout;
