import { useState, useRef, useEffect } from 'react';
import './Year.css';
import { useContributionData } from '../../hooks/useContributionData';

const Year = ({ username }) => {
  const { contributionData } = useContributionData(username);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Generate year list (from current year down to starting year)
  const currentYear = new Date().getFullYear();
  const startingYear = contributionData?.contributionYears?.[contributionData.contributionYears.length - 1] || 2013;
  const years = [];
  for (let year = currentYear; year >= startingYear; year--) {
    years.push(year);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsDropdownOpen(false);
  };

  return (
    <div className="year-selector" ref={dropdownRef}>
      {/* Desktop: List of year buttons */}
      <div className="year-selector__list">
        {years.map((year) => (
          <button
            key={year}
            className={`year-selector__button ${selectedYear === year ? 'year-selector__button--active' : ''}`}
            onClick={() => setSelectedYear(year)}
            type="button"
          >
            {year}
          </button>
        ))}
      </div>

      {/* Mobile: Dropdown */}
      <div className="year-selector__dropdown-wrapper">
        <button
          className="year-selector__dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
          type="button"
        >
          <span>{selectedYear}</span>
          <svg
            className={`year-selector__dropdown-icon ${isDropdownOpen ? 'year-selector__dropdown-icon--open' : ''}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z" />
          </svg>
        </button>

        {isDropdownOpen && (
          <div className="year-selector__dropdown" role="listbox">
            {years.map((year) => (
              <button
                key={year}
                className={`year-selector__dropdown-item ${selectedYear === year ? 'year-selector__dropdown-item--active' : ''}`}
                onClick={() => handleYearSelect(year)}
                role="option"
                aria-selected={selectedYear === year}
                type="button"
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Year;
