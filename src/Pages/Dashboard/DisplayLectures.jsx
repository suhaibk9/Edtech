import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../redux/slices/LectureSlice";

const DisplayLectures = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { role } = useSelector((state) => state.auth);
  const lectures = useSelector((state) => state.lecture.lectures);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onLectureDelete = async (courseId, lectureId) => {
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId }),
    );
    await dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    console.log(state);
    if (!state) navigate("/courses");

    if (state && state._id) dispatch(getCourseLectures(state._id));
  }, [state, dispatch, navigate]);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] text-white mx-auto">
        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex items-center justify-center gap-10 w-full">
            <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              />
              <h1>
                <span className="text-yellow-500">Title: </span>
                {lectures[currentVideo]?.title}
              </h1>
              <p>
                <span className="text-yellow-500 underline">Description: </span>
                {lectures[currentVideo]?.description}
              </p>
            </div>

            <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300"
                  >
                    Add Lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((element, index) => {
                  return (
                    <li className="space-y-2" key={element._id}>
                      <p
                        className="cursor-pointer"
                        onClick={() => setCurrentVideo(index)}
                      >
                        <span className="text-yellow-500">
                          {" "}
                          Lecture {index + 1} :{" "}
                        </span>
                        {element?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, element?._id)
                          }
                          className="btn-accent px-2 py-1 rounded-md font-semibold text-sm bg-red-600 text-white hover:bg-red-500 transition-all duration-300"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl font-bold text-white">
              Lectures coming soon...
            </h1>
            {role === "ADMIN" && (
              <button
                onClick={() =>
                  navigate("/course/addlecture", { state: { ...state } })
                }
                className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300"
              >
                Add Lecture
              </button>
            )}
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
