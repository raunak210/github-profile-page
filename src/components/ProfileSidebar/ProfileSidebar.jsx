import { useUserProfile } from '../../hooks/useUserProfile';
import './ProfileSidebar.css';

const ProfileSidebar = ({ username }) => {
  const { user, loading, error } = useUserProfile(username);

  if (loading) {
    return (
      <div className="profile-sidebar">
        <div className="profile-sidebar__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-sidebar">
        <div className="profile-sidebar__error">Error: {error}</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Parse bio to extract company and skills
  const bioParts = user.bio ? user.bio.split('\r\n\r\n') : [];
  const companyLine = bioParts[0] || '';
  const skillsLine = bioParts[1] || '';

  return (
    <div className="profile-sidebar">
      {/* Profile Header - Avatar + Name (side by side on mobile) */}
      <div className="profile-sidebar__header">
        <div className="profile-sidebar__avatar-container">
          <img
            src={user.avatar_url}
            alt={`${user.name || user.login}'s avatar`}
            className="profile-sidebar__avatar"
          />
        </div>

        <div className="profile-sidebar__name-section">
          <h1 className="profile-sidebar__name">{user.name || user.login}</h1>
          <p className="profile-sidebar__username">{user.login}</p>
        </div>
      </div>

      {/* Bio/Role */}
      {companyLine && (
        <div className="profile-sidebar__bio">
          {companyLine}
        </div>
      )}

      {/* Skills/Technologies */}
      {skillsLine && (
        <div className="profile-sidebar__skills">
          {skillsLine}
        </div>
      )}

      {/* Edit Profile Button */}
      <button className="profile-sidebar__edit-btn" type="button">
        Edit profile
      </button>

      {/* Followers/Following */}
      <div className="profile-sidebar__follow">
        <a href={`${user.html_url}?tab=followers`} className="profile-sidebar__follow-link">
          <span className="profile-sidebar__follow-count">{user.followers}</span>
          <span className="profile-sidebar__follow-label">followers</span>
        </a>
        <span className="profile-sidebar__follow-separator">·</span>
        <a href={`${user.html_url}?tab=following`} className="profile-sidebar__follow-link">
          <span className="profile-sidebar__follow-count">{user.following}</span>
          <span className="profile-sidebar__follow-label">following</span>
        </a>
      </div>

      {/* Contact Information */}
      <div className="profile-sidebar__contact">
        {user.company && (
          <div className="profile-sidebar__contact-item">
            <svg className="profile-sidebar__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z" />
            </svg>
            <span>{user.company.replace(/^@/, '')}</span>
          </div>
        )}
        {user.location && (
          <div className="profile-sidebar__contact-item">
            <svg className="profile-sidebar__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192 0ZM8 14.5l3.535-3.535a5 5 0 1 0-7.07 0L8 14.5Z" />
              <path d="M8 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            </svg>
            <span>{user.location}</span>
          </div>
        )}
        {user.email && (
          <div className="profile-sidebar__contact-item">
            <svg className="profile-sidebar__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z" />
            </svg>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        )}
        {user.blog && (
          <div className="profile-sidebar__contact-item">
            <svg className="profile-sidebar__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z" />
            </svg>
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">
              {user.blog.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {user.twitter_username && (
          <div className="profile-sidebar__contact-item">
            <svg className="profile-sidebar__contact-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865Z" />
            </svg>
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
              @{user.twitter_username}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSidebar;
