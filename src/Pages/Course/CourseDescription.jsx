import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

const CourseDescription = () => {
  const { state } = useLocation();
  const { role } = useSelector((state) => state.auth.role);
  return (
    <HomeLayout>
      <div className="h-full w-full pt-12 px-20 flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img
              src={state?.thumbnail?.secure_url}
              alt="thumbnail"
              className="w-full h-64"
            />
            <div className="space-y-4">
              <div className="flex items-start gap-y-1 justify-between flex-col text-xl">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Total Lectures:{" "}
                  </span>
                  <span>{state?.numberOfLectures}</span>
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Instructor:{" "}
                  </span>
                  <span>{state?.createdBy}</span>
                </p>
              </div>
            </div>
            {role === "ADMIN" || state?.subscriptions?.status === "ACTIVE" ? (
              <button className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-black font-bold py-2 px-4 rounded cursor-pointer">
                Watch Lectures
              </button>
            ) : (
              <button className="bg-yellow-500 hover:bg-yellow-600 w-full transition-all ease-in-out duration-300 text-black font-bold py-2 px-4 rounded cursor-pointer">
                Subscribe
              </button>
            )}
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-center text-yellow-500">
              Course Description
            </h2>
            <p>{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};
export default CourseDescription;
