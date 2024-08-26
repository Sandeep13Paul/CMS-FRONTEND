import Layout from "../Layout";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("Fetching user from localStorage...");
    const details = localStorage.getItem("user");
    if (details) {
      // console.log("User details found:", details);
      setUser(JSON.parse(details)); // Parse the JSON string back to an object
    } else {
      console.log("No user details found.");
    }
  }, []);

  // console.log(user.profilePic)

  return (
    <Layout>
      <div className="sm:pl-64 flex flex-col">
        <h1 className="mx-auto text-5xl">Welcome to Profile Section</h1>
        {user !== null ? (<div
          id="medium-modal"
          // tabIndex="-1"
          className={`sm:pl-64 fixed flex justify-center items-center modal w-full p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full max-w-lg max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                
                <img className={`h-20 w-20 shadow rounded-full`}  src={user.profilePic !== null ? user.profilePic : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"} alt="" />
                <h3 className="text-xl mt-3 font-medium text-gray-900 dark:text-white">
                  {user.name} {/* Display contact name */}
                </h3>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 flex flex-col items-center space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Email : {user.email} {/* Display contact email */}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Phone : {user.phone} {/* Display contact phone */}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  About : {user.about} {/* Display contact phone */}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Gender : {user.gender} {/* Display contact phone */}
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex justify-center items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              </div>
            </div>
          </div>
        </div>): (<div></div>)}
      </div>
    </Layout>
  )
}

export default Profile