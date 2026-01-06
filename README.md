# GitHub Profile Page

A React application that replicates GitHub's profile page UI. View any GitHub user's profile with their repositories, contribution graph, and activity overview.

## Features

- User profile display with avatar, bio, and contact info
- Repository listing with language indicators
- Contribution heatmap graph (last year)
- Activity overview radar chart
- Contribution activity timeline
- Tab-based navigation (Overview, Repositories, Projects, Packages, Stars)
- Fully responsive design for mobile and desktop

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **ECharts** - Charts and heatmap visualization
- **GitHub REST API** - User and repository data
- **GitHub GraphQL API** - Contribution data

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- GitHub account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-profile-page.git
cd github-profile-page
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
touch .env
```

4. Add the following environment variables to `.env`:
```env
VITE_GITHUB_TOKEN=your_github_token_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and visit:
```
http://localhost:5173/username
```
Replace `username` with any GitHub username to view their profile.

## Getting Your GitHub Access Token

The contribution graph requires a GitHub personal access token to fetch data from GitHub's GraphQL API.

### Step-by-Step Guide:

1. **Go to GitHub Settings**
   - Click your profile picture in the top-right corner
   - Select **Settings**

2. **Navigate to Developer Settings**
   - Scroll down in the left sidebar
   - Click **Developer settings** (at the bottom)

3. **Create a Personal Access Token**
   - Click **Personal access tokens**
   - Select **Fine-grained tokens**
   - Click **Generate new token**

4. **Configure the Token**
   - **Token name**: `github-profile-page` (or any name)
   - **Expiration**: Choose your preferred duration
   - **Repository access**: Select "Public Repositories (read-only)"
   - **Permissions**: No additional permissions needed for public data

5. **Generate and Copy**
   - Click **Generate token**
   - Copy the token immediately (you won't see it again!)
   - Paste it in your `.env` file as `VITE_GITHUB_TOKEN`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GITHUB_TOKEN` | GitHub personal access token for GraphQL API | Yes |

## Usage

Visit the app with a GitHub username in the URL:

```
http://localhost:5173/octocat
http://localhost:5173/torvalds
http://localhost:5173/your-username
```

If no username is provided, it defaults to the configured default user.

## Project Structure

```
src/
├── components/
│   ├── ContributionActivity/   # Activity timeline
│   ├── ContributionCandle/     # Radar chart
│   ├── ContributionData/       # Contribution section wrapper
│   ├── ContributionGraph/      # Heatmap calendar
│   ├── Header/                 # Top navigation
│   ├── ProfileSidebar/         # User info sidebar
│   ├── Repositories/           # Repo cards
│   ├── Tabs/                   # Navigation tabs
│   └── Year/                   # Year selector
├── hooks/                      # Custom React hooks
├── pages/                      # Page components
├── services/                   # API services
└── utils/                      # Constants and utilities
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## License

MIT
