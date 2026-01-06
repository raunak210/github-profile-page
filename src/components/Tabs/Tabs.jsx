import './Tabs.css';


const Tabs = ({ tabs, activeTab, onTabChange, variant = 'default', username }) => {
  
  const handleTabClick = (tabName) => {
    // Update URL based on tab selection
    const isOverview = tabName === 'Overview';
    const newUrl = isOverview 
      ? `/${username}` 
      : `/${username}?tab=${tabName.toLowerCase()}`;
    
    // Update browser URL without page reload
    window.history.pushState({ tab: tabName }, '', newUrl);
    
    // Call the parent handler
    onTabChange(tabName);
  };

  return (
    <nav className={`tabs tabs--${variant}`} aria-label="Profile navigation">
      <div className="tabs__nav" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`tabs__item ${activeTab === tab.name ? 'tabs__item--active' : ''}`}
            onClick={() => handleTabClick(tab.name)}
            role="tab"
            aria-selected={activeTab === tab.name}
            aria-controls={`tabpanel-${tab.name.toLowerCase()}`}
            type="button"
          >
            <span className="tabs__item-label">{tab.name}</span>
            {tab.count !== null && (
              <span className="tabs__item-count">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Tabs;
