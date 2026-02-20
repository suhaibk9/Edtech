import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import RequireAuth from "./Components/Auth/RequireAuth";
import AboutUsPage from "./Pages/AboutUsPage";
import Contact from "./Pages/Contact";
import CourseDescription from "./Pages/Course/CourseDescription";
import CourseList from "./Pages/Course/CourseList";
import CreateCourse from "./Pages/Course/CreateCourse";
import AddLecture from "./Pages/Dashboard/AddLectures";
import AdminDashBoard from "./Pages/Dashboard/AdminDashBoard";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import Denied from "./Pages/Denied";
import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import Checkout from "./Pages/Payements/checkout";
import CheckoutFail from "./Pages/Payements/CheckoutFail";
import CheckoutSuccess from "./Pages/Payements/CheckoutSuccess";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ChangePassword from "./Pages/User/ChangePassword";
import EditProfile from "./Pages/User/EditProfile";
import Profile from "./Pages/User/Profile";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/user/changepassword" element={<ChangePassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/course/displaylectures" element={<DisplayLectures />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </>
  );
};
export default App;
