import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../services/api';
import { DEFAULT_USERNAME } from '../utils/constants';


export const useUserProfile = (username = DEFAULT_USERNAME) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchUserProfile(username);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [username]);

  return { user, loading, error };
};

