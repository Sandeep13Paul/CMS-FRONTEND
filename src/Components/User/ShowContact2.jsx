import { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import ContactModal from "./ContactModal";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
import UpdateModal from "./UpdateModal";

const ShowContact2 = () => {
  const [contacts, setContacts] = useState([]);
  const [urlParams, setUrlParams] = useState({
    page: 0,
    size: 5,
    sortBy: "name",
    direction: "asc",
  });

  const [searchField, setSearchField] = useState({
    field: "",
    keyword: "",
  });
  
  const [pageDetails, setPageDetails] = useState({
    totalPages: 0,
    size: 0,
    currentPage: 0,
    totalElements: 0,
  });

  // Function to fetch contacts based on current filters or search
  const fetchContacts = async (isSearch = false) => {
    try {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams(urlParams).toString();

      // For search requests, append the search params to the query if available
      const searchQuery = isSearch
        ? new URLSearchParams(searchField).toString()
        : "";

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/user/contacts/${
            isSearch ? "search" : "show"
          }?${query}&${searchQuery}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

      if (response.status === 200) {
        const data = response.data;
        setContacts(data.content); // Update contacts
        setPageDetails({
          totalPages: data.page.totalPages,
          size: data.page.size,
          currentPage: data.page.number + 1,
          totalElements: data.page.totalElements,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [urlParams]);

  const handlePageChange = (newPage) => {
    setUrlParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  const handleSortChange = (sortBy) => {
    setUrlParams((prevParams) => ({
      ...prevParams,
      sortBy,
      page: 0, // Reset to first page when sorting changes
    }));
  };

  const handleDirectionChange = (direction) => {
    setUrlParams((prevParams) => ({
      ...prevParams,
      direction,
      page: 0, // Reset to first page when sorting changes
    }));
  };

  const [viewBox, setViewBox] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleView = (contact) => {
    // console.log("Selected Contact:", contact);
    setSelectedContact(contact);
    setViewBox(true);
  };

  const handleDelete = (contact) => {
    try {
      const deleteContact = async () => {
        const token = localStorage.getItem("token");
        // console.log(token);
        const contactId = {
          id: contact.contactId,
        };
        const query = new URLSearchParams(contactId).toString();
        // console.log(query);
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/user/contacts/delete?${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("deleted");
          // navigate('/user/show');
        }
      };
      deleteContact();
    } catch (error) {
      console.error(error);
    }
  };

  const showAlert = (contact) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(contact); // Call your function here
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        window.location.reload();
      }
    });
  };

  // const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const handleUpdate = (contact) => {
    // console.log("Selected Contact:", contact);
    setSelectedContact(contact);
    setUpdate(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (searchField.field && searchField.keyword) {
      fetchContacts(true); // Fetch contacts with search enabled
    } else {
      Swal.fire("Error", "Please fill both search field and keyword", "error");
    }
  };

  const handleChange = (e) => {
    setSearchField({
      ...searchField,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <div className="sm:pl-64 flex flex-col">
        <h1 className="mx-auto text-5xl">Here are All Your Contacts</h1>
        <div className="contacts_container p-8">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {/* <div className="p-5 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-100 dark:bg-gray-900">
              
            </div> */}
            <div className="p-5 flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-100 dark:bg-gray-900">
              {/* Sort and Direction controls */}
              <div>
                <button
                  id="dropdownActionButton"
                  data-dropdown-toggle="dropdownAction"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <span className="sr-only">Action button</span>
                  Action
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownAction"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownActionButton"
                  >
                    <li>
                      <button
                        onClick={() => handleDirectionChange("asc")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Ascending
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDirectionChange("desc")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Descending
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleSortChange("name")}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sort By Name
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* search */}
              <form action="" onSubmit={handleSearch}>
                <div className="flex items-center justify-center gap-5">
                  {/* search div */}
                  <label htmlFor="underline_select" className="sr-only">
                    Underline select
                  </label>
                  <select
                    id="underline_select"
                    name="field"
                    onChange={handleChange}
                    className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected value="" className="dark:bg-gray-700">
                      Choose a Field
                    </option>
                    <option value="name" className="dark:bg-gray-700">
                      Name
                    </option>
                    <option value="email" className="dark:bg-gray-700">
                      Email
                    </option>
                    <option value="phone" className="dark:bg-gray-700">
                      Phone
                    </option>
                  </select>
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="keyword"
                      value={searchField.keyword}
                      onChange={handleChange}
                      id="table-search-users"
                      className="block p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for Contacts..."
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Search
                  </button>

                  {/* search div ends */}
                </div>
              </form>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Link
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 &&
                  contacts.map((contact) => (
                    <tr
                      key={contact.contactId}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            contact.contactPic ||
                            "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"
                          }
                          alt={`${contact.name} image`}
                          onError={(e) => {
                            e.target.src =
                              "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg";
                          }}
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {contact.name}
                          </div>
                          <div className="font-normal text-gray-500">
                            {contact.email}
                          </div>
                        </div>
                      </th>
                      <td className="px-4 py-4 gap-2">
                        <a
                          href={contact.websiteLink}
                          className="w-6 h-6"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-solid w-5 h-5 mr-4 fa-up-right-from-square"></i>
                        </a>
                        <a
                          className="w-5 h-6"
                          href={contact.linkedInLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {contact.favorite && (
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                          )}
                          <i className="fa-solid w-4 h-4 fa-phone-volume"></i>
                          {contact.phone}
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <button
                          onClick={() => showAlert(contact)}
                          className="font-medium text-gray-500 dark:text-gray-400 hover:underline"
                        >
                          <i className="fa-solid fa-eraser"></i>
                        </button>
                        <button
                          onClick={() => handleUpdate(contact)}
                          className="font-medium ml-4 text-gray-500 dark:text-gray-400 hover:underline"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => handleView(contact)}
                          className="font-medium ml-4 text-gray-500 dark:text-gray-400 hover:underline"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <nav
              className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 p-4 dark:bg-gray-900"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {pageDetails.currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {pageDetails.totalPages}
                </span>
              </span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                  <button
                    href="#"
                    disabled={urlParams.page <= 0}
                    onClick={() => handlePageChange(urlParams.page - 1)}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {pageDetails.currentPage}
                  </a>
                </li>
                <li>
                  <button
                    href="#"
                    disabled={urlParams.page >= pageDetails.totalPages - 1}
                    onClick={() => handlePageChange(urlParams.page + 1)}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {viewBox && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setViewBox(false)}
          viewBox={viewBox}
        />
      )}
      {update && (
        <UpdateModal
          contact={selectedContact}
          onClose={() => setUpdate(false)}
          updateBox={update}
        />
      )}
    </Layout>
  );
};

export default ShowContact2;
