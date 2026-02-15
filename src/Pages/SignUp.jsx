import { useState } from "react";

import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../redux/slices/AuthSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState(null);
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    //Call the API
    if (
      !signUpData.fullName ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.avatar
    ) {
      toast.error("Please fill all the fields!");
      return;
    }
    //name should be 5chars long
    if (signUpData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters long!");
      return;
    }
    //Not Valid Email email regex - /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!signUpData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email!");
      return;
    }
 
    const formData = new FormData();
    formData.append("fullName", signUpData.fullName);
    formData.append("email", signUpData.email);
    formData.append("password", signUpData.password);
    formData.append("avatar", signUpData.avatar);
    //make API call
    const response = await dispatch(createAccount(formData));
    setSignUpData({
      fullName: "",
      email: "",
      password: "",
      avatar: null,
    });
    setPreviewImg(null);
    if (response?.payload?.success) {
      navigate("/");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };
  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    // Save actual file for API
    setSignUpData((prev) => ({
      ...prev,
      avatar: file,
    }));
    // Preview
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
  };
  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-full w-full">
        <form
          action=""
          className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl text-center font-bold">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImg ? (
              <img
                onChange={handleImgUpload}
                id="image_uploads"
                src={previewImg}
                alt="Preview"
                name="avatar"
                className="w-24 h-24 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            id="image_uploads"
            onChange={handleImgUpload}
            name="image_uploads"
            accept=".jpg .png .jpeg .svg"
          />
          <div className="flex flex-col gap-1 ">
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              required
              value={signUpData.fullName}
              onChange={handleInputChange}
              placeholder="Enter Your Full Name!"
              type="text"
              id="fullName"
              name="fullName"
              className="bg-transparent px-2 py-1 border border-gray-500 rounded outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              required
              value={signUpData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email!"
              type="email"
              id="email"
              name="email"
              className="bg-transparent px-2 py-1 border border-gray-500 rounded outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              required
              value={signUpData.password}
              onChange={handleInputChange}
              placeholder="Enter Your Password!"
              type="password"
              id="password"
              name="password"
              className="bg-transparent px-2 py-1 border border-gray-500 rounded outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={handleSignUp}
            type="submit"
            className="w-full mt-1 bg-yellow-600 hover:bg-yellow-700 transition-all duration-300 ease-in-out cursor-pointer rounded py-2 font-semibold text-lg"
          >
            Create Account
          </button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signIn" className="text-accent underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};
export default SignUp;
