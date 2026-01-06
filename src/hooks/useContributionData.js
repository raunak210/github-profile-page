import { useState, useEffect } from 'react';
import { fetchContributionData } from '../services/api';
import { DEFAULT_USERNAME } from '../utils/constants';


export const useContributionData = (username = DEFAULT_USERNAME) => {
  const [contributionData, setContributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContributionData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchContributionData(username);
        setContributionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadContributionData();
  }, [username]);

  return { contributionData, loading, error };
};

