import logo from '../../assets/phone-book.png';
import { useState, useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
// import axios from 'axios';
import { UserContext } from '../../Context/userContext';

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const user = useContext(UserContext);
  // console.log(user.name);

  return (
    <nav className="sm:pl-64 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 right-0 left-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isOpen}
          onClick={toggleNavbar}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <a
          href="/user/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8 shadow " alt="CMS Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">
            C M
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">
          {user && (
            <a
              href="/user/profile"
              className="hidden md:flex text-white cursor-pointer bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 dark:text-black font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-300 dark:hover:bg-green-400 dark:focus:ring-blue-800"
            >
              {user.name}
            </a>
          )}
          <a
            type="button"
            href="/logout"
            className="hidden md:flex text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-blue-800"
          >
            Logout
          </a>

          <button
            onClick={toggleDarkMode}
            className="ml-3 bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            <i
              className={`fa-solid fa-circle-half-stroke ${
                isDarkMode ? "text-white" : ""
              }`}
            ></i>
            <span className="ml-1">{isDarkMode ? "Light" : "Dark"}</span>
          </button>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
            onClick={toggleNavbar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 space-y-3 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
            {user && (
            <a
              href="/user/profile"
              className="md:hidden flex text-white cursor-pointer bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 dark:text-black font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-300 dark:hover:bg-green-400 dark:focus:ring-blue-800"
            >
              {user.name}
            </a>
          )}
            </li>
            <li>
            <a
            type="button"
            href="/logout"
            className="md:hidden flex text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-white dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-blue-800"
          >
            Logout
          </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
