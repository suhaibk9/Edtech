import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer";
import { logout } from "../redux/slices/AuthSlice";

const HomeLayout = ({ children }) => {
  const disaptch = useDispatch();
  const navigate = useNavigate();
  //Handle Logout
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await disaptch(logout());
    if (res?.payload?.success) {
      navigate("/");
    }
  };
  //check if user is logged in
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //Chcek user role
  const role = useSelector((state) => state.auth.role);
  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
  };
  return (
    <div className="h-screen flex flex-col">
      {/* Drawer */}
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        {/* Drawer Content i.e. Button To Open Drawer*/}
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu className="font-bold text-white m-4" size={"32px"} />
          </label>
        </div>
        {/* Drawer Side i.e. Drawer Content*/}
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-full">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {isLoggedIn && (
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={handleLogout}
                  className="btn btn-primary px-4 py-1 font-semibold rounded-md cursor-pointer hover:bg-yellow-600 transition-all ease-in-out"
                >
                  Sign Out
                </button>
              </div>
            )}
            {!isLoggedIn && (
              <div className="w-full gap-x-2 gap-y-1 flex items-center justify-center">
                <button
                  onClick={() => navigate("/signIn")}
                  className="btn btn-primary px-4 py-1 font-semibold rounded-md cursor-pointer hover:bg-yellow-600 transition-all ease-in-out"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signUp")}
                  className="btn btn-secondary px-4 py-1 font-semibold rounded-md cursor-pointer hover:bg-yellow-600 transition-all ease-in-out"
                >
                  Sign Up
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};
export default HomeLayout;
