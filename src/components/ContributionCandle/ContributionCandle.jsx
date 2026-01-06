import './ContributionCandle.css';
import ReactECharts from 'echarts-for-react';

const ContributionCandle = ({ contributionData, loading, error }) => {

  // Activity overview data - repositories contributed to
  const contributedRepos = [
    { name: 'UptimeAI/uptime_webapp', url: 'https://github.com/UptimeAI/uptime_webapp' },
    { name: 'UptimeAI/uptime_server', url: 'https://github.com/UptimeAI/uptime_server' },
    { name: 'UptimeAI/uptime_ml', url: 'https://github.com/UptimeAI/uptime_ml' },
  ];
  const otherReposCount = 13;

  // Can be extended to calculate from contributionData in the future
  const option = {
    color: ['#39d353'],
    radar: [{
      indicator: [
        { text: 'Code review', max: 100 }, 
        { text: 'Commits', max: 100 }, 
        { text: 'Pull requests', max: 100 }, 
        { text: 'Issues', max: 100 }
      ],
      center: ['50%', '50%'], 
      radius: 100, 
      startAngle: 90, 
      splitNumber: 4, 
      shape: 'circle',
      axisName: { 
        formatter: '{value}', 
        color: '#57606a',
        fontSize: 12
      },
      splitArea: { 
        areaStyle: { 
          color: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0)'] 
        } 
      },
      axisLine: { 
        lineStyle: { 
          color: '#216e39',
          width: 3
        } 
      },
      splitLine: { 
        lineStyle: { 
          color: '#ffffff',
          width: 1
        } 
      }
    }],
    series: [{
      type: 'radar',
      emphasis: { lineStyle: { width: 2 } },
      data: [{ 
        value: [0, 83, 17, 0], 
        name: 'Contributions', 
        areaStyle: { 
          color: 'rgba(57, 211, 83, 0.2)' 
        }, 
        lineStyle: { 
          color: '#39d353',
          width: 2
        }, 
        itemStyle: { 
          color: '#39d353',
          borderWidth: 2,
          borderColor: '#39d353'
        } 
      }]
    }]
  };

  const renderActivityOverview = () => (
    <div className="activity-overview">
      <h3 className="activity-overview__title">Activity overview</h3>
      <div className="activity-overview__content">
        <svg className="activity-overview__icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
          <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
        </svg>
        <p className="activity-overview__text">
          Contributed to{' '}
          {contributedRepos.map((repo, index) => (
            <span key={repo.name}>
              <a href={repo.url} className="activity-overview__link" target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              {index < contributedRepos.length - 1 && ', '}
            </span>
          ))}
          {otherReposCount > 0 && (
            <span> and {otherReposCount} other repositories</span>
          )}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="contribution-candle">
        <div className="contribution-candle__left"></div>
        <div className="contribution-candle__divider" />
        <div className="contribution-candle__right">
          <div className="contribution-candle__loading">
            Loading activity overview...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="contribution-candle">
        <div className="contribution-candle__left"></div>
        <div className="contribution-candle__divider" />
        <div className="contribution-candle__right">
          <div className="contribution-candle__error">
            Error loading activity overview
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contribution-candle">
      <div className="contribution-candle__left">
        {renderActivityOverview()}
      </div>
      <div className="contribution-candle__divider" />
      <div className="contribution-candle__right">
        <ReactECharts option={option} style={{ height: '280px', width: '100%' }} />
      </div>
    </div>
  );
};

export default ContributionCandle;
