import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Save success message to session storage or local storage
    sessionStorage.setItem("logoutMessage", JSON.stringify({
      type: "green",
      content: "You have successfully logged out."
    }));

    // Redirect to the login page after logout
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;
