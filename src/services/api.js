const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export const fetchUserProfile = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
};

export const fetchContributionData = async (username, token = null) => {
  const accessToken = token || import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!accessToken) {
    throw new Error('GitHub access token is required. Please set VITE_GITHUB_TOKEN in your .env file.');
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalRepositoryContributions
          hasAnyContributions
          hasAnyRestrictedContributions
          contributionYears
          commitContributionsByRepository(maxRepositories: 10) {
            repository {
              name
              owner { login }
            }
            contributions { totalCount }
          }
          issueContributionsByRepository(maxRepositories: 10) {
            repository {
              name
              owner { login }
            }
            contributions { totalCount }
          }
          pullRequestContributionsByRepository(maxRepositories: 10) {
            repository {
              name
              owner { login }
            }
            contributions { totalCount }
          }
          pullRequestReviewContributionsByRepository(maxRepositories: 10) {
            repository {
              name
              owner { login }
            }
            contributions { totalCount }
          }
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
              firstDay
            }
          }
        }
      }
    }
  `;

  const variables = {
    username,
    from: startDate.toISOString(),
    to: endDate.toISOString(),
  };

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL errors: ${result.errors.map((e) => e.message).join(', ')}`);
  }

  if (!result.data?.user) {
    throw new Error('User not found or no contribution data available');
  }

  const contributionsCollection = result.data.user.contributionsCollection;
  const weeks = contributionsCollection?.contributionCalendar?.weeks || [];
  const allDays = weeks.flatMap((week) => week.contributionDays || []);
  const totalContributions = allDays.reduce((sum, day) => sum + (day.contributionCount || 0), 0);

  return {
    ...contributionsCollection,
    contributionCalendar: {
      ...contributionsCollection.contributionCalendar,
      totalContributions,
      totalWeeks: weeks.length,
    },
  };
};

export const fetchUserRepositories = async (username) => {
  const response = await fetch(`${GITHUB_API_BASE_URL}/users/${username}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  return response.json();
};
