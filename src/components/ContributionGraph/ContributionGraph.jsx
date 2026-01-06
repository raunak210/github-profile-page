import './ContributionGraph.css';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';

// Format dates as YYYY-MM-DD for ECharts
const formatDate = (date) => {
  if (typeof date === 'string') {
    return date; // Already in YYYY-MM-DD format
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const ContributionGraph = ({ contributionData, loading, error }) => {
  
  // Transform contribution calendar data to ECharts format
  const chartData = useMemo(() => {
    if (!contributionData?.contributionCalendar?.weeks) {
      return [];
    }
    
    const weeks = contributionData.contributionCalendar.weeks;
    const allDays = weeks.flatMap((week) => week.contributionDays || []);
    
    // Transform to ECharts format: [dateString, count]
    return allDays.map((day) => [day.date, day.contributionCount || 0]);
  }, [contributionData]);
  
  // Calculate date range for display (ECharts calendar needs array format)
  const dateRange = useMemo(() => {
    if (!contributionData?.contributionCalendar?.weeks) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      return [
        formatDate(startDate),
        formatDate(endDate)
      ];
    }
    
    const weeks = contributionData.contributionCalendar.weeks;
    const allDays = weeks.flatMap((week) => week.contributionDays || []);
    
    if (allDays.length === 0) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      return [
        formatDate(startDate),
        formatDate(endDate)
      ];
    }
    
    // Get first and last dates from the data
    const dates = allDays.map(day => day.date).sort();
    return [dates[0], dates[dates.length - 1]];
  }, [contributionData]);
  
  // Calculate total contributions
  
  
  // Calculate max contribution count for visualMap scaling
  const maxContribution = useMemo(() => {
    if (chartData.length === 0) return 20;
    return Math.max(...chartData.map(([, count]) => count), 20);
  }, [chartData]);
  
  const option = useMemo(() => ({
    tooltip: {
      position: 'top',
      formatter: (params) => {
        if (!params || !params.data || !Array.isArray(params.data)) {
          return '';
        }
        const dateStr = params.data[0];
        const count = params.data[1] || 0;
        
        if (!dateStr) return '';
        
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return `${count} contribution${count !== 1 ? 's' : ''}`;
          
          const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          return `${count} contribution${count !== 1 ? 's' : ''} on ${formattedDate}`;
        } catch (e) {
          return `${count} contribution${count !== 1 ? 's' : ''} on ${dateStr}`;
        }
      }
    },
    visualMap: {
      min: 0,
      max: maxContribution,
      calculable: false,
      orient: 'horizontal',
      left: 'center',
      bottom: 10,
      inRange: {
        color: [
          '#ebedf0',  // no activity (GitHub grey)
          '#9be9a8',  // 1 contribution (light green)
          '#40c463',  // 2-3 contributions (medium green)
          '#30a14e',  // 4-5 contributions (dark green)
          '#216e39'   // 6+ contributions (darker green)
        ]
      },
      pieces: [
        { min: 0, max: 0, color: '#ebedf0' },
        { min: 1, max: 1, color: '#9be9a8' },
        { min: 2, max: 3, color: '#40c463' },
        { min: 4, max: 5, color: '#30a14e' },
        { min: 6, max: maxContribution, color: '#216e39' }
      ],
      show: false // Hide the visualMap legend
    },
    calendar: {
      top: 60,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: dateRange,
      itemStyle: {
        borderWidth: 2,
        borderColor: '#fff'
      },
      splitLine: {
        show: false // Remove the black lines separating months
      },
      dayLabel: {
        firstDay: 0, // Start week on Sunday (GitHub style)
        nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
        margin: 5,
        fontSize: 12,
        color: '#57606a'
      },
      monthLabel: {
        nameMap: 'en',
        margin: 10,
        fontSize: 12,
        color: '#57606a',
        align: 'left'
      },
      yearLabel: {
        show: false
      }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: chartData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  }), [chartData, dateRange, maxContribution]);

  if (loading) {
    return (
      <div>
        <h2 className="contribution-graph__title">Loading contributions...</h2>
        <div className="contribution-graph">
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="contribution-graph__title">Error loading contributions</h2>
        <div className="contribution-graph">
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)' }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contribution-graph">
      {/* Scrollable container for mobile */}
      <div className="contribution-graph__scroll-container">
        <div className="contribution-graph__chart">
          <ReactECharts 
            option={option} 
            style={{ height: '200px', width: '100%' }}
          />
        </div>
      </div>
      <div className="contribution-graph__header">
        <div>
          <span className="contribution-graph__legend-label">Learn how we count contributions</span>
        </div>
        
        <div className="contribution-graph__legend">
          <span className="contribution-graph__legend-label">Less</span>
          <div className="contribution-graph__legend-squares">
            <div className="contribution-graph__legend-square" style={{ backgroundColor: '#ebedf0' }}></div>
            <div className="contribution-graph__legend-square" style={{ backgroundColor: '#9be9a8' }}></div>
            <div className="contribution-graph__legend-square" style={{ backgroundColor: '#40c463' }}></div>
            <div className="contribution-graph__legend-square" style={{ backgroundColor: '#30a14e' }}></div>
            <div className="contribution-graph__legend-square" style={{ backgroundColor: '#216e39' }}></div>
          </div>
          <span className="contribution-graph__legend-label">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;

