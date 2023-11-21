import styled from "styled-components";

export const DataCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 350px;
  padding: 25px;
  height: 250px;
  min-height: 400px;
  margin: 20px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.1);
  color: black;
`;

export const DataCardValue = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;
