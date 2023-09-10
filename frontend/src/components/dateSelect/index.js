import React, { useState } from "react";
import {
  DateSelectOverlay,
  DateSelectContainer,
  CloseButton,
  OkButton,
  DateInputLabel,
  DateInput,
} from "./styles";
import { FaTimes, FaCheck } from "react-icons/fa";

const DateSelect = ({ onClose, onSearch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    onSearch(startDate, endDate);
    onClose();
  };

  return (
    <DateSelectOverlay>
      <DateSelectContainer>
        <h3>Select Date Range:</h3>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <DateInputLabel>Start Date:</DateInputLabel>
        <DateInput
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <DateInputLabel>End Date:</DateInputLabel>
        <DateInput
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <OkButton onClick={handleSearch}>
          <FaCheck />
        </OkButton>
      </DateSelectContainer>
    </DateSelectOverlay>
  );
};

export default DateSelect;
