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

<<<<<<< HEAD
export default Date;
=======
export default Date;
>>>>>>> 3556261612e203808ce67b4fff70236f4be63907
