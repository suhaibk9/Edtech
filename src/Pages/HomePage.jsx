import HomeLayout from "../Layouts/HomeLayout";

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-1/2 space-y-7">
          <h1 className="text-5xl font-semibold">
            Find Out Best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-center text-xl text-gray-100">
            We have a large library of courses. Taught by industry experts.
          </p>
        </div>
      </div>
    </HomeLayout>
  );
};
export default HomePage;
