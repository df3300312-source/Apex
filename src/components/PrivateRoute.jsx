import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ adminOnly = false }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <div>Loading session...</div>;

  if (!user) {
    // If not logged in, send to login page
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    // If it's an admin route but user is not admin, send to dashboard
    return <Navigate to="/dashboard" />;
  }

  // If all good, show the page
  return <Outlet />;
};

export default PrivateRoute;
