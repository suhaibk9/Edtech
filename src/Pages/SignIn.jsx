import { useState } from "react";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../redux/slices/AuthSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields!");
      return;
    }

    if (!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email!");
      return;
    }

    const response = await dispatch(login(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-full w-full">
        <form
          noValidate
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black]"
        >
          <h1 className="text-2xl text-center font-bold">Login Page</h1>

          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              required
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="Enter Your Password!"
              type="password"
              id="password"
              name="password"
              className="bg-transparent px-2 py-1 border border-gray-500 rounded outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-1 bg-yellow-600 hover:bg-yellow-700 transition-all duration-300 ease-in-out cursor-pointer rounded py-2 font-semibold text-lg"
          >
            Login
          </button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-accent underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
};
export default SignIn;
