import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Message from "./Message";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // State to handle error messages
  const [isLoading, setIsLoading] = useState(false); // State to handle loading state
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Check for logout message in sessionStorage
    const logoutMessage = sessionStorage.getItem("logoutMessage");

    if (logoutMessage) {
      setMessage(JSON.parse(logoutMessage));
      sessionStorage.removeItem("logoutMessage"); // Remove message after displaying it
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before attempting login
    setIsLoading(true); // Set loading state to true
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/login`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Assume the response data contains the token
      const token = response.data; // Use the response data directly if the token is returned as plain text
  
      if (token) {
        localStorage.setItem("token", token); // Store token in localStorage
        // console.log("Login successful, token received:", token);
  
        setIsLoading(false); // Set loading state to false
        // window.location.reload(); 
        navigate("/user/dashboard"); // Redirect to dashboard
        // window.location('/user/dashboard');
      } else {
        throw new Error("Token is undefined"); // Handle case where token is not provided
      }
    } catch (error) {
      setIsLoading(false); // Set loading state to false
      console.error('Login failed', error);
      
      // Handle any errors
      setError(error.response?.data || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to your backend's Google OAuth2 login endpoint
    window.location.href = `${import.meta.env.VITE_BACKEND_URI}/oauth2/authorization/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URI}/oauth2/authorization/github`;
  };
  

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-12">
        <div className="md:col-span-2 lg-col-span-3 xl:col-span-4"></div>
        <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-4">
          <div className="block p-6 border-t-8 border-green-700 bg-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-green-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Login Here
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Welcome back! Log in to your account.
            </p>
            <div className="mt-4">
              {message && <Message message={message} />}
            </div>
            

            {error && (
              <div className="mb-4 p-4 text-sm text-red-600 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="max-w-md mx-auto mt-9">
              {/* Email Input */}
              <div className="relative z-0 w-full mb-10 group">
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  id="f_email"
                  className="block py-2.5 px-2 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="f_email"
                  className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200"
                >
                  Email Address:
                </label>
              </div>

              {/* Password Input */}
              <div className="relative z-0 w-full mb-10 group">
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  id="f_password"
                  className="block py-2.5 px-2 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="f_password"
                  className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200"
                >
                  Password:
                </label>
              </div>

              {/* Submit Button */}
              <div className="relative z-0 w-full mb-10 group flex justify-center space-x-8">
                <button
                  type="submit"
                  disabled={isLoading} // Disable button during loading state
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            {/* Google Login Button */}
            <div className="relative z-0 w-8/12 mb-8 flex mx-auto justify-center items-center align-middle flex-col space-y-6">
              <button onClick={handleGoogleLogin} className="py-3 px-3 gap-2 flex justify-center items-center bg-white hover:bg-gray-200 focus:ring-gray-500 focus:ring-offset-gray-200 text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span>Sign in with Google</span>
              </button>
              <button onClick={handleGithubLogin} className="py-3 px-3 flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792">
                  <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                </svg>
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 lg-col-span-3 xl:col-span-4"></div>
      </div>
    </Layout>
  );
};

export default Login;
