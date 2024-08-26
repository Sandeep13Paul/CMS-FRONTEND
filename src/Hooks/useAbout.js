import { useEffect, useState } from 'react';
import { fetchAbout } from '../Services/userService';

const useAbout = () => {
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAbout();
        setAbout(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return { about, loading, error };
};

export default useAbout;
