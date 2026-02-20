import { useEffect } from "react";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
} from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "../../redux/slices/CourseSlice";
import { getPaymentRecord } from "../../redux/slices/RazorPaySlice";
import { getStatData } from "../../redux/slices/StatSlice";
ChartJS.register(
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
);
const sumOfArr = (arr) =>
  Array.isArray(arr) ? arr.reduce((acc, curr) => acc + curr, 0) : 0;
const AdminDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsersCount, subscribedUsersCount } = useSelector(
    (state) => state.stat,
  );
  const { courseData } = useSelector((state) => state.course);
  const { allPayements, finalMonths, monthlySalesRecord } = useSelector(
    (state) => state.razorpay,
  );
  console.log("allPayements:", allPayements);
  console.log("finalMonths:", finalMonths);
  console.log("monthlySalesRecord:", monthlySalesRecord);
  const onCourseDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const courseDelete = await dispatch(deleteCourse(id));
      if (courseDelete.payload.success) await dispatch(getAllCourses());
    }
  };
  const userData = {
    labels: ["Registered User", "Entrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedUsersCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: "black",
      },
    ],
  };
  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderWidth: 2,
        borderColor: "#FF0000",
      },
    ],
  };
  useEffect(() => {
    (async () => {
      await dispatch(getStatData());
      await dispatch(getAllCourses());
      await dispatch(getPaymentRecord());
    })();
  }, []);
  return (
    <div>
      <HomeLayout>
        <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
          <h1 className="text-center text-5xl font-semibold text-yellow-500">
            Admin Dashboard
          </h1>
          <div className="grid grid-cols-2 gap-5 m-auto mx-10">
            <div className="flex flex-col items-center justify-between p-5 bg-gray-800 rounded-lg">
              <div className="w-80 h-80">
                <Pie data={userData} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col items-center justify-between p-5 gap-5 rounded-md shadow-md">
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold">Registered Users</p>
                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                  </div>
                  <FaUser className="text-5xl text-yellow-500" />
                </div>
                <div className="flex flex-col items-center justify-between p-5 gap-5 rounded-md shadow-md">
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold">Subscribed Users</p>
                    <h3 className="text-4xl font-bold">
                      {subscribedUsersCount}
                    </h3>
                  </div>
                  <FaUser className="text-5xl text-green-500" />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between p-5 bg-gray-800 rounded-lg">
              <div className="w-full h-full relative flex items-center justify-center min-h-[35rem]">
                <Bar
                  className="absolute"
                  data={salesData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
              <div className="grid grid-cols-2 gap-5 w-full mt-5">
                <div className="flex flex-col items-center justify-between p-5 gap-5 rounded-md shadow-md">
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold">Subscription Count</p>
                    <h3 className="text-4xl font-bold">
                      {sumOfArr(monthlySalesRecord) || 0}
                    </h3>
                  </div>
                  <FaUser className="text-5xl text-blue-500" />
                </div>
                <div className="flex flex-col items-center justify-between p-5 gap-5 rounded-md shadow-md">
                  <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold">Total Revenue</p>
                    <h3 className="text-4xl font-bold">
                      {sumOfArr(monthlySalesRecord) * 499}
                    </h3>
                  </div>
                  <GiMoneyStack className="text-5xl text-green-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto px-10 gap-5 mt-10">
            <h2 className="text-3xl font-semibold text-white">
              Course Overview
            </h2>
            <button
              onClick={() => navigate("/course/create")}
              className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-all ease-in-out duration-300"
            >
              Create New Course
            </button>
          </div>

          <div className="w-full mx-auto px-10 mt-5 mb-10">
            <div className="overflow-x-auto rounded-lg shadow-md bg-gray-800">
              <table className="w-full text-left text-white border-collapse">
                <thead className="bg-gray-700 text-gray-200">
                  <tr>
                    <th className="px-5 py-4 border-b border-gray-600 font-semibold">
                      S.No
                    </th>
                    <th className="px-5 py-4 border-b border-gray-600 font-semibold">
                      Course Title
                    </th>
                    <th className="px-5 py-4 border-b border-gray-600 font-semibold">
                      Course Category
                    </th>
                    <th className="px-5 py-4 border-b border-gray-600 font-semibold">
                      Instructor
                    </th>
                    <th className="px-5 py-4 border-b border-gray-600 font-semibold text-center">
                      Total Lectures
                    </th>
                    <th className="px-5 py-4 border-b border-gray-600 font-semibold">
                      Description
                    </th>
                    <th className="px-5 py-4 border-b border-gray-600 font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {courseData?.map((course, idx) => (
                    <tr
                      key={course?._id}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-5 py-4">{idx + 1}</td>
                      <td className="px-5 py-4">
                        <textarea
                          readOnly
                          value={course?.title}
                          className="w-40 h-16 bg-transparent resize-none outline-none overflow-hidden"
                        />
                      </td>
                      <td className="px-5 py-4">{course?.category}</td>
                      <td className="px-5 py-4">{course?.createdBy}</td>
                      <td className="px-5 py-4 text-center">
                        {course?.numberOfLectures}
                      </td>
                      <td className="px-5 py-4">
                        <textarea
                          readOnly
                          value={course?.description}
                          className="w-60 h-16 bg-transparent resize-none outline-none overflow-auto"
                        />
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            title="View Lectures"
                            className="bg-green-500 hover:bg-green-600 text-white p-2 text-xl rounded-md transition-all ease-in-out duration-300"
                            onClick={() =>
                              navigate("/course/displaylectures", {
                                state: { ...course },
                              })
                            }
                          >
                            <BsCollectionPlayFill />
                          </button>
                          <button
                            title="Delete Course"
                            className="bg-red-500 hover:bg-red-600 text-white p-2 text-xl rounded-md transition-all ease-in-out duration-300"
                            onClick={() => onCourseDelete(course?._id)}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};
export default AdminDashBoard;
