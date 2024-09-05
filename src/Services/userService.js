import axios from 'axios';


const fetchHome = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/home`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const fetchAbout = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/about`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// You can add more functions here to fetch other data as needed


// src/Services/fetchUserData.js

const fetchUserData = async () => {
  
  try {
    const token = localStorage.getItem('token'); // Get the token stored on login
    // console.log(token);
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.status);
    if (response.status === 200) {
      // console.log(response.data);
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
      }
      localStorage.setItem('user', JSON.stringify(response.data));

      return response.data;
    }
    
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};


export {
    fetchHome,
    fetchAbout,
    fetchUserData,
};