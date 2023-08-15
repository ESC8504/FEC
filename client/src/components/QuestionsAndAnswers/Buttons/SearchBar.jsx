import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
  const SEARCH_FILTER_START_NUM = 3;
  const handleChange = (e) => {
    const { value } = e.target;
    // 3 or more
    if (value.length >= SEARCH_FILTER_START_NUM) {
      onSearch(value);
    } else {
      onSearch('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        onChange={handleChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SearchBar;
