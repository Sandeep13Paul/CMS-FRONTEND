import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
        console.log(localStorage.getItem('Authorization'));
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/oauth2/token`, {
            method: "GET",
            credentials: "include", // Include credentials like cookies if needed
        });

        if (response.ok) {
          const token = response.headers.get("Authorization");
          console.log(token);
          if (token) {
            const bearerToken = token.split(" ")[1]; // Extract the token after "Bearer"
            localStorage.setItem("token", bearerToken); // Store token in localStorage
            
            // Redirect to the user dashboard
            navigate("/user/dashboard");
          } else {
            console.error("No token found in the response header.");
          }
        } else {
          console.error("Failed to retrieve the token.");
        }
      } catch (error) {
        console.error("Error during token fetch:", error);
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default OAuth2Success;
