// PeakDataCard.jsx

import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 150px; // or any size you want
  height: 150px; // make it square
  background-color: #fff; // or any color you like
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 20px;
`;

const Label = styled.div`
  font-size: 1em;
  color: #333;
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #000;
`;

const Unit = styled.div`
  font-size: 1em;
  color: #333;
  margin-bottom: 5px;
`;

const PeakDataCard = ({ label, value, unit }) => {
  return (
    <CardContainer>
      <Label>{label}</Label>
      <Value>{value}</Value>
      <Unit>{unit}</Unit>
    </CardContainer>
  );
};

export default PeakDataCard;
