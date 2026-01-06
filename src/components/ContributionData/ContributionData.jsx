import ContributionGraph from "../ContributionGraph/ContributionGraph";
import ContributionCandle from "../ContributionCandle/ContributionCandle";
import { useContributionData } from "../../hooks/useContributionData";
import './ContributionData.css';
import { useMemo } from "react";

const ContributionData = ({ username }) => {
  // Fetch contribution data at the parent level
  const { contributionData, loading, error } = useContributionData(username);

  const totalContributions = useMemo(() => {
    if (!contributionData?.contributionCalendar) {
      return 0;
    }
    return contributionData.contributionCalendar.totalContributions || 0;
  }, [contributionData]);

  return (
    <div>
    <h2 className="contribution-graph__title">
    {totalContributions} contributions in the last year
  </h2>
    <div className="contribution-data">
       
      <ContributionGraph 
        contributionData={contributionData}
        loading={loading}
        error={error}
      />
      <hr style={{ 
        border: 'none',
        borderTop: '1px solid var(--color-border)', 
        margin: '16px 0'
      }} />
      <ContributionCandle 
        contributionData={contributionData}
        loading={loading}
        error={error}
      />
    </div>
    </div>
  );
};

export default ContributionData;