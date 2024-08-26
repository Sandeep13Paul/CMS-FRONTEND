import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import Message from './Message';

const Register = () => {

  const parseErrors = (errorString) => {
    const errors = {};
    const fieldErrors = errorString.split(';').filter(Boolean);
  
    fieldErrors.forEach((fieldError) => {
      const [field, message] = fieldError.split(':').map(part => part.trim());
      if (field && message) {
        errors[field] = message;
      }
    });
  
    return errors;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    about: ''
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    gender: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State to handle loading state

  // Fetch session message on component mount (e.g., after a page reload)
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/session-message`, {
          withCredentials: true,  // Ensure the session ID is sent with the request
        });
        const toastMessage = response.data;
        // console.log(toastMessage);

        if (toastMessage) {
          setMessage(toastMessage);
        }
      } catch (error) {
        console.error('Error fetching session message', error);
      }
    };

    fetchMessage();  // Fetch session message on page load
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      setErrors({});
      // Make a POST request to the backend for registration
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/do-register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,  // Ensure the session ID is sent with the request
      });

      const token = response.data;  // Assuming the token is in the response data
      localStorage.setItem("token", token);  // Store the token in localStorage
      // console.log("Registration successful, token received:", token);

      setIsLoading(false); // Set loading state to false
      if (token) {
        // On successful registration, redirect to the register page
        navigate('/register');
        window.location.reload();  // Reload the page to trigger session message retrieval
      }
    } catch (error) {
      console.error('Registration failed', error);
      // Handle any errors here
      setIsLoading(false); // Set loading state to false
      if (error.response && error.response.status === 400) {
        // Parse and handle field-specific errors
        const errorString = error.response.data;
        const fieldErrors = parseErrors(errorString);

        setErrors(fieldErrors);
      }
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-12">
        <div className="md:col-span-2 lg-col-span-3 xl:col-span-4"></div>
        <div className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-4">
          <div className="block p-6 border-t-8 border-blue-700 bg-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-blue-700">
            {/* Message Box */}
            {message && <Message message={message} />}

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sign Up Here
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Start managing your contacts on the cloud...
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-9">
              {/* Input Fields */}
              <div className="relative z-0 w-full mb-10 group">
                <input
                  type="text"
                  name="name"
                  id="f_text"
                  value={formData.name}
                  onChange={handleChange}
                  className="block py-2.5 px-2 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                  placeholder=" "
                  
                />
                <label htmlFor="f_text" className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200">
                  Name:
                </label>
                {errors.name && <p className="text-red-500 dark:text-yellow-300">{errors.name}</p>}
              </div>

              {/* Other Input Fields */}
              {/* ... Other form fields go here ... */}
              <div className="relative z-0 w-full mb-10 group">
                 <input
                    type="email"
                    name="email"
                    id="f_email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block py-2.5 px-2 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                    placeholder=" "
                    
                  />
                  <label htmlFor="f_email" className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200">
                    Email Address:
                  </label>
                  {errors.email && <p className="text-red-500 dark:text-yellow-300">{errors.email}</p>}
                </div>

                <div className="relative z-0 w-full mb-10 group">
                  <input
                    type="password"
                    name="password"
                    id="f_password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block py-2.5 px-2 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                    placeholder=" "
                    
                  />
                  <label htmlFor="f_password" className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200">
                    Password:
                  </label>
                  {errors.password && <p className="text-red-500 dark:text-yellow-300">{errors.password}</p>}
                </div>

                <div className="relative z-0 w-full mb-10 group">
                  <input
                    type="number"
                    name="phone"
                    id="f_number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block py-2.5 px-2 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                    placeholder=" "
                    
                  />
                  <label htmlFor="f_number" className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200">
                    Contact Number:
                  </label>
                  {errors.phone && <p className="text-red-500 dark:text-yellow-300">{errors.phone}</p>}
                </div>
                <div className="relative z-0 w-full mb-10 group">
                  <input
                    type="text"
                    name="gender"
                    id="f_gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="block py-2.5 px-2 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                    placeholder=" "
                    
                  />
                  <label htmlFor="f_gender" className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200">
                    Gender:
                  </label>
                  {errors.gender && <p className="text-red-500 dark:text-yellow-300">{errors.gender}</p>}
                </div>

                <div className="relative z-0 w-full mb-10 group">
                  <textarea
                    name="about"
                    id="f_textarea"
                    rows="4"
                    value={formData.about}
                    onChange={handleChange}
                    className="block py-2.5 font-semibold w-full text-md text-gray-700 bg-transparent border-2 rounded-lg border-gray-400 appearance-none dark:text-white dark:bg-gray-700 dark:placeholder-gray-400 dark:border-gray-600 dark:focus:border-blue-600 focus:outline-none focus:ring-0 focus:border-blue-300 peer"
                    placeholder=" "
                    
                  ></textarea>
                  <label htmlFor="f_textarea" className="absolute font-semibold text-base text-gray-900 dark:text-gray-400 transition-all duration-200 transform -translate-y-8 top-2 left-2 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:top-0 peer-focus:translate-y-[-100%] peer-focus:scale-85 peer-focus:text-blue-600 peer-focus:dark:text-blue-200">
                    Write Something About Yourself:
                  </label>
                  {errors.about && <p className="text-red-500 dark:text-yellow-300">{errors.about}</p>}
                </div>
              {/* Buttons */}
              <div className="relative z-0 w-full mb-10 group flex justify-center space-x-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="dark:text-gray-600 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-200 dark:hover:bg-gray-500 dark:hover:text-white dark:focus:ring-blue-800"
                >
                  {isLoading ? "Registering..." : "SignUp"}
                </button>
                <button
                  type="reset"
                  className="dark:text-gray-600 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-200 dark:hover:bg-gray-500 dark:hover:text-white dark:focus:ring-blue-800"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="md:col-span-2 lg-col-span-3 xl:col-span-4"></div>
      </div>
    </Layout>
  );
};

export default Register;
