import styled from "styled-components";

export const DataCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 9px 7px 40px -6px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  width: 350px;
  padding: 25px;
  height: 250px;
  min-height: 400px;
  margin: 20px;
  border-radius: 5px;
  position: relative;
`;

export const DataCardTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;
export const DataCardValue = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;