import './ContributionActivity.css';

const DUMMY_ACTIVITY = {
  monthLabel: 'January 2026',
  summary: 'Created 2 commits in 1 repository',
  repo: {
    fullName: 'UptimeAI/uptime_webapp',
    commitCount: 2,
    barPercent: 100,
  },
};

export default function ContributionActivity() {
  const { monthLabel, summary, repo } = DUMMY_ACTIVITY;

  return (
    <section className="contribution-activity" aria-labelledby="contribution-activity-title">
      <h2 id="contribution-activity-title" className="contribution-activity__title">
        Contribution activity
      </h2>

      <div className="contribution-activity__month">
        <div className="contribution-activity__month-header" aria-label={monthLabel}>
          <h3 className="contribution-activity__month-title">{monthLabel}</h3>
          <div className="contribution-activity__month-divider" aria-hidden="true" />
        </div>

        <div className="contribution-activity__timeline">
          <div className="contribution-activity__timeline-left" aria-hidden="true">
            <div className="contribution-activity__timeline-line" />
          </div>

          <div className="contribution-activity__timeline-content">
            <div className="contribution-activity__event">
              <div className="contribution-activity__event-icon" aria-hidden="true">
                {/* Octicon: git-commit */}
                <svg viewBox="0 0 16 16" width="16" height="16">
                  <path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
                </svg>
              </div>

              <div className="contribution-activity__event-body">
                <div className="contribution-activity__event-header">
                  <div className="contribution-activity__event-summary">{summary}</div>

                  <button
                    className="contribution-activity__event-menu"
                    type="button"
                    aria-label="Contribution activity options"
                  >
                    {/* Octicon: sliders */}
                    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                      <path d="M5.5 0a.75.75 0 0 1 .75.75V2h7a.75.75 0 0 1 0 1.5h-7v1.25a.75.75 0 0 1-1.5 0V3.5h-3a.75.75 0 0 1 0-1.5h3V.75A.75.75 0 0 1 5.5 0ZM11.25 7.25a.75.75 0 0 1 1.5 0V8.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.25a.75.75 0 0 1-1.5 0V10H1.75a.75.75 0 0 1 0-1.5h9.5Zm-6.5 6.5a.75.75 0 0 1 1.5 0V15h7a.75.75 0 0 1 0 1.5h-7V17.75a.75.75 0 0 1-1.5 0V16.5h-3a.75.75 0 0 1 0-1.5h3V13.75Z"></path>
                    </svg>
                  </button>
                </div>

                <div className="contribution-activity__repo-row">
                  <div className="contribution-activity__repo-left">
                    <a
                      className="contribution-activity__repo-link"
                      href={`https://github.com/${repo.fullName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {repo.fullName}
                    </a>
                    <span className="contribution-activity__repo-meta">
                      {repo.commitCount} {repo.commitCount === 1 ? 'commit' : 'commits'}
                    </span>
                  </div>

                  <div className="contribution-activity__repo-bar" aria-hidden="true">
                    <div
                      className="contribution-activity__repo-bar-fill"
                      style={{ width: `${Math.max(0, Math.min(100, repo.barPercent))}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button className="contribution-activity__show-more" type="button">
              Show more activity
            </button>

            <p className="contribution-activity__note">
              Seeing something unexpected? Take a look at the{' '}
              <a
                className="contribution-activity__note-link"
                href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub profile guide
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


