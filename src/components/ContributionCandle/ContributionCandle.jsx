import './ContributionCandle.css';
import ReactECharts from 'echarts-for-react';

const ContributionCandle = ({ contributionData, loading, error }) => {

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
        {/* Left side content can be added here */}
      </div>
      <div className="contribution-candle__divider" />
      <div className="contribution-candle__right">
        <ReactECharts option={option} style={{ height: '280px', width: '100%' }} />
      </div>
    </div>
  );
};

export default ContributionCandle;
