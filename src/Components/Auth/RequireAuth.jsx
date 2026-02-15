import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  console.log("isLoggedIn: ", isLoggedIn);
  console.log("role: ", role);
  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signIn" state={{ from: location }} replace />
  );
};
export default RequireAuth;
