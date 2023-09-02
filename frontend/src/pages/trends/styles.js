import styled from "styled-components";

export const TrendsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeRangeButton = styled.button`
  display: inline-block;
  margin-right: 10px;
  padding: 8px 16px;
  background-color: ${({ selected }) => (selected ? "#333" : "#555")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#444" : "#666")};
  }
`;

export const CustomTooltipContainer = styled.div`
  background-color: gray;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .label {
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

export const ChartContainer = styled.div`
  margin-top: 20px;
  background-color: rgb(97, 97, 97);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ExportButton = styled.button`
  margin-left: auto;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
