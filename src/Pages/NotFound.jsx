import { useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute bottom-[550px] z-10">
          Page Not Found
        </div>
        <p className="text-white">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span
              onClick={() => navigate("/")}
              className="relative block px-8 py-3 bg-[#1A2238] border border-current cursor-pointer"
            >
              Go Home
            </span>
          </a>
        </button>
      </div>
    </HomeLayout>
  );
};
export default NotFound;
