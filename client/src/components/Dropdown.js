import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">--Select--</option>
        <option value="Month-To-Date">Month-To-Date</option>
        <option value="Year-To-Date">Year-To-Date</option>
        <option value="Prior MTD">Prior MTD</option>
        <option value="Prior YTD">Prior YTD</option>
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;

