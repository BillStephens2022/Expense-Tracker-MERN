import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Date = () => {
  const [startDate, setStartDate] = useState('');

  return (
    <DatePicker 
        showIcon
        selected={startDate} 
        onChange={(date) => setStartDate(date)} />
  );
};

export default Date;