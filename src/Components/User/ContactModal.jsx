import { useEffect, useState } from "react";
import Layout from "../Layout";

const ContactModal = ({ contact, onClose, viewBox  }) => {
 // State to manage modal visibility
 const [isVisible, setIsVisible] = useState(false);

 // useEffect to monitor changes in viewBox
 useEffect(() => {
   // Logic to determine visibility based on viewBox
   if (viewBox) {
     setIsVisible(true);
   } else {
     setIsVisible(false);
   }
 }, [viewBox]); // Dependency array

  if (!contact) return null;

  return (
    <Layout>
      {/* <div className="default-modal  flex flex-col"> */}
        {/* <!-- Default Modal --> */}
        <div
          id="medium-modal"
          tabIndex="-1"
          className={`sm:pl-64 fixed flex justify-center items-center z-50 modal ${isVisible ? 'visible' : 'hidden'} w-full p-4 overflow-x-hidden md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full max-w-lg max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                

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
                <h3 className="text-xl mt-3 font-medium text-gray-900 dark:text-white">
                  {contact.name} {/* Display contact name */}
                </h3>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 flex flex-col items-center space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Email : {contact.email} {/* Display contact email */}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Phone : {contact.phone} {/* Display contact phone */}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  LinkedIn Link : {contact.linkedInLink} {/* Display contact phone */}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Website Link : {contact.websiteLink} {/* Display contact phone */}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  About : {contact.about} {/* Display contact phone */}
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </Layout>
  );
};

export default ContactModal;
