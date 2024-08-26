import { useEffect, useState } from 'react';
// import { fetchHome } from '../Services/userService';

const useUsers = () => {
  // const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // const data = await fetchHome();
        // setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { loading, error };
};

export default useUsers;
