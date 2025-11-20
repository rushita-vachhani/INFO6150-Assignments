import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function EmployeeRoute({ children }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return role === "employee" ? children : <Navigate to="/" />;
}
