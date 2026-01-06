import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useRepositories } from '../../hooks/useRepositories';
import './Repositories.css';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  'Jupyter Notebook': '#DA5B0B',
};

const Repositories = ({ username, maxRepos = 6, showAll = false }) => {
  // When showAll is true, fetch all repos (pass a large number or null)
  const fetchLimit = showAll ? 100 : maxRepos;
  const { repositories, loading, error } = useRepositories(username, fetchLimit);

  const displayedRepos = useMemo(() => {
    return showAll ? repositories : repositories.slice(0, maxRepos);
  }, [repositories, maxRepos, showAll]);

  // Determine title and header based on mode
  const title = showAll ? 'Repositories' : 'Popular repositories';

  if (loading) {
    return (
      <div className={`repositories ${showAll ? 'repositories--full' : ''}`}>
        <div className="repositories__header">
          <h2 className="repositories__title">{title}</h2>
        </div>
        <div className="repositories__loading">Loading repositories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`repositories ${showAll ? 'repositories--full' : ''}`}>
        <div className="repositories__header">
          <h2 className="repositories__title">{title}</h2>
        </div>
        <div className="repositories__error">Failed to load repositories</div>
      </div>
    );
  }

  if (displayedRepos.length === 0) {
    return (
      <div className={`repositories ${showAll ? 'repositories--full' : ''}`}>
        <div className="repositories__header">
          <h2 className="repositories__title">{title}</h2>
        </div>
        <div className="repositories__empty">No repositories found</div>
      </div>
    );
  }

  return (
    <div className={`repositories ${showAll ? 'repositories--full' : ''}`}>
      <div className="repositories__header">
        <h2 className="repositories__title">{title}</h2>
        {!showAll && (
          <a href={`https://github.com/${username}?tab=repositories`} className="repositories__customize">
            Customize your pins
          </a>
        )}
      </div>
      <div className={`repositories__grid ${showAll ? 'repositories__grid--list' : ''}`}>
        {displayedRepos.map((repo) => (
          <div key={repo.id} className="repository-card">
            <div className="repository-card__header">
              <a 
                href={repo.html_url} 
                className="repository-card__title"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
              <span className="repository-card__visibility">
                {repo.private ? 'Private' : 'Public'}
              </span>
            </div>
            
            {repo.fork && repo.parent && (
              <div className="repository-card__fork-info">
                Forked from{' '}
                <a 
                  href={repo.parent.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.parent.full_name}
                </a>
              </div>
            )}
            
            {repo.description && (
              <p className="repository-card__description">{repo.description}</p>
            )}
            
            <div className="repository-card__footer">
              {repo.language && (
                <div className="repository-card__language">
                  <span 
                    className="repository-card__language-dot"
                    style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#858585' }}
                  />
                  <span className="repository-card__language-name">{repo.language}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Repositories.propTypes = {
  username: PropTypes.string.isRequired,
  maxRepos: PropTypes.number,
  showAll: PropTypes.bool,
};

export default Repositories;

