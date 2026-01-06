export const DEFAULT_USERNAME = 'shreeramk';

export const GITHUB_API_BASE_URL = 'https://api.github.com';

export const TABS = {
  OVERVIEW: 'Overview',
  REPOSITORIES: 'Repositories',
  PROJECTS: 'Projects',
  PACKAGES: 'Packages',
  STARS: 'Stars',
};

export const TAB_CONFIG = [
  { name: TABS.OVERVIEW, count: null },
  { name: TABS.REPOSITORIES, count: 31 },
  { name: TABS.PROJECTS, count: null },
  { name: TABS.PACKAGES, count: 5 },
  { name: TABS.STARS, count: 6 },
];

export const DEFAULT_ACTIVE_TAB = TABS.OVERVIEW;
