import { useState, useEffect } from 'react';
import { fetchUserRepositories } from '../services/api';
import { DEFAULT_USERNAME } from '../utils/constants';


export const useRepositories = (username = DEFAULT_USERNAME, limit = null) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        const reposData = await fetchUserRepositories(username);
        
        // Sort by updated_at to get most recent repositories
        const sortedRepos = reposData.sort((a, b) => 
          new Date(b.updated_at) - new Date(a.updated_at)
        );
        
        // Apply limit if specified
        const limitedRepos = limit ? sortedRepos.slice(0, limit) : sortedRepos;
        
        setRepositories(limitedRepos);
      } catch (err) {
        setError(err.message);
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      loadRepositories();
    }
  }, [username, limit]);

  return { repositories, loading, error };
};

