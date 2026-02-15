import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../redux/slices/CourseSlice";

import CourseCard from "./CourseCard";
const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col items-center gap-10 text-white">
        <h1 className="text-4xl">
          Explore Courses
          <span className="font-bold text-yellow-500"> Made By Experts</span>
        </h1>
        <div className="mb-10 flex flex-row flex-wrap gap-15">
          {courseData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
