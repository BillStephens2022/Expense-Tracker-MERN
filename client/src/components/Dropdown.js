import React, { useState } from 'react';

const Dropdown = ({ onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState('CurrentMTD');

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    onOptionChange(selectedOption);
  }

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">--Select--</option>
        <option value="CurrentMTD">Current MTD</option>
        <option value="CurrentYTD">Current YTD</option>
        <option value="PriorMTD">Prior MTD</option>
        <option value="PriorYTD">Prior YTD</option>
      </select>
    </div>
  );
};

export default Dropdown;

