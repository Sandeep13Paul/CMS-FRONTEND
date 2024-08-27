import { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateModal = ({ contact, onClose, updateBox  }) => {
 // State to manage modal visibility
 const [isVisible, setIsVisible] = useState(false);

 const parseErrors = (errorString) => {
    const errors = {};
    const fieldErrors = errorString.split(";").filter(Boolean);

    fieldErrors.forEach((fieldError) => {
      const [field, message] = fieldError.split(":").map((part) => part.trim());
      if (field && message) {
        errors[field] = message;
      }
    });

    return errors;
  };

 // useEffect to monitor changes in viewBox
 useEffect(() => {
   // Logic to determine visibility based on viewBox
   if (updateBox) {
     setIsVisible(true);
   } else {
     setIsVisible(false);
   }
 }, [updateBox]); // Dependency array

  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    address: contact.address,
    about: contact.about,
    phone: contact.phone,
    websiteLink: contact.websiteLink,
    linkedinLink: contact.linkedInLink,
    contactPic: null,
    favorite: false,
  });
  const navigate = useNavigate();

  const [messageContact, setMessageContact] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State to handle loading state

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/user/contacts/session-message`,
          {
            withCredentials: true, // Ensure the session ID is sent with the request
          }
        );
        const toastMessage = response.data;
        // console.log(toastMessage);

        // Set the message only if it exists and is not an empty string
        if (toastMessage && toastMessage.trim() !== "") {
          setMessageContact(toastMessage);
        } else {
          setMessageContact(null);
        }
      } catch (error) {
        console.error("Error fetching session message", error);
      }
    };

    fetchMessage(); // Fetch session message on page load
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [contactDetails, setContactDetails] = useState(contact);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      setErrors({});
      // Make a POST request to the backend for registration
      const token = localStorage.getItem('token');
      // console.log(token);
      const contactId = {
        id: contactDetails.contactId,
      }
      // console.log(contactId);
      const query = new URLSearchParams(contactId).toString();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/user/contacts/update?${query}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true, // Ensure the session ID is sent with the request
        }
      );

      setIsLoading(false); // Set loading state to false
      if (response.status === 200) {
        // On successful registration, redirect to the register page
        navigate("/user/show");
        window.location.reload(); // Reload the page to trigger session message retrieval
      }
    } catch (error) {
      console.error("Registration failed", error);
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

  // Handle file input changes
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData({
      ...formData,
      contactPic: file,
    });
    let reader = new FileReader();  
    reader.onload = () => {
      document.getElementById("upload_image_preview").setAttribute("src", reader.result);
    };

    reader.readAsDataURL(file);
  }
};

  return (
    <Layout>
      <div className="card block ">
        {/* <!-- Default Modal --> */}
        <div
          id="medium-modal"
          tabIndex="-1"
          className={`sm:pl-64 top-2 fixed flex justify-center items-center z-50 modal ${isVisible ? 'visible' : 'hidden'} w-full p-4 overflow-x-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full max-w-xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex flex-col items-center justify-between p-4 md:p-4 border-b rounded-t dark:border-gray-600">
                

                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="medium-modal"
                  onClick={onClose} // Handle close
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <img className={`h-20 w-20 ${contact.contactPic ? "" : "hidden"} shadow rounded-full`}  src={contact.contactPic} alt="" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Update Contact {/* Display contact name */}
                </h3>
              </div>
              {/* <!-- Modal body --> */}
              <form onSubmit={handleSubmit} className="mt-8">
                <div className="mb-4">
                  <label
                    htmlFor="website-admin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Name
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      id="website-admin"
                      className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter here"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 dark:text-yellow-300">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="input-group-1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Email
                  </label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      id="input-group-1"
                      className="bg-gray-50 border py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 dark:text-yellow-300">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="input-group-1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Number
                  </label>
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                      >
                        <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      id="input-group-1"
                      className="bg-gray-50 border py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="1234567890"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 dark:text-yellow-300">{errors.phone}</p>}
                </div>
                {/* address */}
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Address
                  </label>
                  <textarea
                    id="message"
                    name="address"
                    
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write Contact Address here..."
                  >{formData.address}</textarea>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Description
                  </label>
                  <textarea
                    id="message"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write about your Contact here..."
                  ></textarea>
                </div>
                <div className="flex gap-5">
                  <div className="w-full">
                    <div className="mb-4">
                      <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                          >
                            <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="websiteLink"
                          value={formData.websiteLink}
                          onChange={handleChange}
                          id="input-group-1"
                          className="bg-gray-50 border py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="http://example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="mb-4">
                      <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                          >
                            <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="linkedinLink"
                          value={formData.linkedinLink}
                          onChange={handleChange}
                          id="input-group-1"
                          className="bg-gray-50 border py-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="http://example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* file input */}

                <div className="items-center justify-center w-full mb-4">
                  <input name="contactPic" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                  <img className="max-h-52 mx-auto rounded-lg shadow m-3" src="" id="upload_image_preview" alt="" />
                </div>

                <ul className="w-60 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
                  <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="vue-checkbox"
                        type="checkbox"
                        name="favorite"
                        value={formData.favorite}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="vue-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Is This Your Favorite Contact ?
                      </label>
                    </div>
                  </li>
                </ul>

                <div className="button-container flex justify-center gap-3">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:hover:bg-yellow-600 dark:focus:ring-yellow-800"
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateModal;
