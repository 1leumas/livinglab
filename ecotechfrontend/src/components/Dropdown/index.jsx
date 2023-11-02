// Dropdown.js
import React from "react";
import styled from "styled-components";

const Select = styled.select`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 3rem;
  font-size: 1rem;
  width: 9rem;
`;

const Dropdown = ({ options, onChange, value }) => {
  return (
    <Select onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default Dropdown;
