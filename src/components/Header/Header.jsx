import { useMemo } from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import { DEFAULT_USERNAME } from '../../utils/constants';
import './Header.css';

const Header = () => {
  // Extract username from URL path (e.g., /shreeramk -> shreeramk)
  const username = useMemo(() => {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments[0] || DEFAULT_USERNAME;
  }, []);

  // Fetch user profile for avatar
  const { user } = useUserProfile(username);

  return (
    <header className="header">
      {/* Top Navigation Bar */}
      <div className="header__top">
        <div className="header__top-left">
          {/* Hamburger Menu */}
          <button className="header__hamburger" aria-label="Open menu" type="button">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z" />
            </svg>
          </button>

          {/* GitHub Logo */}
          <svg
            className="header__logo"
            height="32"
            viewBox="0 0 16 16"
            width="32"
            fill="currentColor"
            aria-label="GitHub"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="header__username">{username}</span>
        </div>

        <div className="header__top-right">
          {/* Search Bar (desktop) */}
          <div className="header__search">
            <svg
              className="header__search-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 7a4.499 4.499 0 11-8.997 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
                fill="currentColor"
              />
            </svg>
            <input
              type="text"
              className="header__search-input"
              placeholder="Type / to search"
              aria-label="Search GitHub"
            />
          </div>

          {/* Search Icon Button (mobile only) */}
          <button 
            className="header__search-btn" 
            aria-label="Search"
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.5 7a4.499 4.499 0 11-8.997 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"
              />
            </svg>
          </button>

          {/* User Avatar */}
          <button 
            className="header__avatar-btn" 
            aria-label="User menu"
            type="button"
          >
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={`${username}'s avatar`}
                className="header__avatar-img"
              />
            ) : (
              <div className="header__avatar-placeholder">
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
