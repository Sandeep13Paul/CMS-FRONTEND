import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token is already in localStorage
  const location = useLocation(); // Get current location (to access query params)
  const navigate = useNavigate();
  // console.log(token);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // Get URL query params
    const tokenFromURL = urlParams.get("token"); // Extract token from query

    if (tokenFromURL) {
      // If token is present in the URL, store it in localStorage
      localStorage.setItem("token", tokenFromURL);

      // Clear token from URL to avoid exposing it
      navigate("/user/dashboard", { replace: true });
    }
  }, [location, navigate]);

  // If token is neither in URL nor localStorage, redirect to login
  if (!token && !location.search.includes("token")) {
    navigate("/login");
  }

  // If token exists (in either URL or localStorage), allow access to the protected page
  return children;
};

export default ProtectedRoute;
