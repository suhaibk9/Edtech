import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";

const HomeLayout = ({ children }) => {
  const changeWidth = () => {
    const drawer_side = document.getElementsByClassName("drawer-side");
    drawer_side[0].style.width = "0px";
  };
  const hideDrawer = () => {
    const drawer_toggle = document.getElementById("drawer-toggle");
    drawer_toggle.checked = false;
    const drawer_side = document.getElementsByClassName("drawer-side");
    drawer_side[0].style.width = "0px";
  };
  return (
    <div className="min-h-[90vh] ">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
      </div>{" "}
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="cursor-pointer relative">
          <FiMenu
            className="font-bold text-white m-4"
            size={"32px"}
            onCanPlay={changeWidth}
          />
        </label>
      </div>
      <div className="drawer-side w-0">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
          <li className="absolute z-50 w-fit right-2 top-2">
            <button onClick={hideDrawer}>
              <AiFillCloseCircle size={24} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default HomeLayout;
