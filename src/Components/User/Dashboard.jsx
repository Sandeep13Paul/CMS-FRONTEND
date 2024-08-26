import { useState, useEffect } from "react";
import Layout from "../Layout";

const Dashboard = () => {
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

  return (
    <Layout>
      <div className="sm:pl-64 flex flex-col">
        <h1 className="mx-auto text-5xl">Welcome to DashBoard Section</h1>
        <div className="mx-auto mt-10 text-3xl text-center">
          {user && <h2>Hello {user.name}!</h2>}

          <h4 className="mb-4">Welcome back to your Contact Manager. </h4>
          <hr className="text-gray-100 dark:text-gray-300" />
          <div className="mt-10 flex flex-col space-y-4">
            <span className="text-4xl">Stay Connected</span>
            <span>Stay in touch with your network!</span>
            <span>
              Make sure you’re regularly updating your contacts, adding new
              ones, and reaching out to those you haven’t spoken to in a while.
              Your connections are your most valuable asset.
            </span>
            <hr className="text-gray-100 dark:text-gray-300" />
            <span className="text-4xl">Security and Privacy</span>
            <span>
              Your data is safe with us. We take your privacy seriously. Make
              sure to regularly update your password and review your privacy
              settings to keep your account secure.
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
