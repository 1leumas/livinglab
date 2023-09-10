import React from "react";
import styled from "styled-components";

const SelectContainer = styled.div``;

const StyledSelect = styled.select`
  padding: 8px 16px;
  background-color: #555;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #666;
  }

  option:checked {
    background-color: #007bff;
    color: #fff;
  }
`;

const Select = ({ options, value, onChange, placeholder }) => {
  return (
    <SelectContainer>
      <StyledSelect value={value} onChange={onChange}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default Select;
