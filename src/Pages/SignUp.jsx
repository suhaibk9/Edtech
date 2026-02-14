import { useState } from "react";

import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";

const SignUp = () => {
  const [previewImg, setPreviewImg] = useState(null);
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("e.target", e.target.value);
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
    //Call the API
    setSignUpData({
      fullName: "",
      email: "",
      password: "",
      avatar: null,
    });
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
                id="image_uploads"
                src={previewImg}
                alt="Preview"
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
            name="image_uploads"
            accept=".jpg .png .jpeg .svg"
          />
          <div className="flex flex-col gap-1 ">
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              required
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
