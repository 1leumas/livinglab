import styled from "styled-components";

// Styled wrapper for centering
export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  color: black;
  padding: "20px";
  border-radius: "10px";
`;

// Styled container for checkboxes
export const CheckboxContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  flex-direction: row;
  align-items: center;
`;

export const TooltipContainer = styled.div`
  background-color: #3e3939;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`;

export const CheckBox = styled.input`
  margin-right: 0.5rem;
`;