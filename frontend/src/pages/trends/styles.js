import styled from "styled-components";

export const TrendsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
`;