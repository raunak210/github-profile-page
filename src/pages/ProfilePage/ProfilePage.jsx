import { useState, useMemo, useEffect, useCallback } from 'react';
import './ProfilePage.css';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import Tabs from '../../components/Tabs/Tabs';
import Repositories from '../../components/Repositories/Repositories';
import ContributionActivity from '../../components/ContributionActivity/ContributionActivity';
import Header from '../../components/Header/Header';
import Year from '../../components/Year/Year';
import { TAB_CONFIG, TABS, DEFAULT_USERNAME } from '../../utils/constants';
import ContributionData from '../../components/ContributionData/ContributionData';


const getTabFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const tabParam = params.get('tab');
  
  if (!tabParam) return TABS.OVERVIEW;
  
  // Match tab param to actual tab name 
  const matchedTab = Object.values(TABS).find(
    (tab) => tab.toLowerCase() === tabParam.toLowerCase()
  );
  
  return matchedTab || TABS.OVERVIEW;
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(getTabFromUrl);

 
  const username = useMemo(() => {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    return pathSegments[0] || DEFAULT_USERNAME;
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getTabFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.REPOSITORIES:
        return (
          <div className="profile-page__tab-content">
            <Repositories username={username} showAll />
          </div>
        );
      
      case TABS.PROJECTS:
        return (
          <div className="profile-page__tab-content">
            <div className="profile-page__empty-state">
              <h3>Projects</h3>
              <p>No projects yet.</p>
            </div>
          </div>
        );
      
      case TABS.PACKAGES:
        return (
          <div className="profile-page__tab-content">
            <div className="profile-page__empty-state">
              <h3>Packages</h3>
              <p>No packages published yet.</p>
            </div>
          </div>
        );
      
      case TABS.STARS:
        return (
          <div className="profile-page__tab-content">
            <div className="profile-page__empty-state">
              <h3>Starred Repositories</h3>
              <p>No starred repositories yet.</p>
            </div>
          </div>
        );
      
      case TABS.OVERVIEW:
      default:
        return (
          <>
            <div className="profile-page__overview-section">
              <Repositories username={username} maxRepos={6} />
            </div>
            <div className="profile-page__content-section">
              <div className="profile-page__contribution-data">
                <ContributionData username={username} />
              </div>
              <div className="profile-page__year">
                <Year username={username} />
              </div>
              <div className="profile-page__contribution-activity">
                <ContributionActivity />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="profile-page">
      <Header />
      <Tabs
        tabs={TAB_CONFIG}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        variant="default"
        username={username}
      />
      <div className="profile-page__container">
        <aside className="profile-page__sidebar">
          <ProfileSidebar username={username} />
        </aside>
        <main 
          className="profile-page__main"
          role="tabpanel"
          id={`tabpanel-${activeTab.toLowerCase()}`}
          aria-label={`${activeTab} content`}
        >
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
