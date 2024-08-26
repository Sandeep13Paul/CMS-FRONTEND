// src/Context/UserContext.jsx
import { createContext, useState, useEffect } from 'react';
import { fetchUserData } from '../Services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Only fetch if no user data is available in local storage
    if (!user) {
      fetchUserData().then(data => {
        setUser(data);
      });
    }
  }, [localStorage.getItem('token')]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
