import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const safeGetUser = () => {
  try { return JSON.parse(localStorage.getItem("user")); }
  catch { localStorage.removeItem("user"); return null; }
};

const ProtectRoute = ({ children, allowedRoles }) => {
  const user = safeGetUser();
  const token = localStorage.getItem("token");

  // Not logged in → go to login
  if (!user || !token) {
    return <Navigate to="/user/login" replace />;
  }

  // Check if JWT token is expired
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.error("Session expired. Please login again.");
      return <Navigate to="/user/login" replace />;
    }
  } catch {
    // Invalid token format
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return <Navigate to="/user/login" replace />;
  }

  // Logged in but wrong role → go to home (not login!)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    toast.error(`Access denied. This page is for ${allowedRoles.join(" / ")} only.`);
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectRoute;