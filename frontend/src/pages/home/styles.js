import styled from "styled-components";

export const DataCard = styled.div`
  margin: 0 auto;
  padding: 35px;
  max-width: 400px;
  background-color: gray;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    color: white;
  }

  p {
    margin-bottom: 10px;
    font-size: 18px;
    color: white;
  }
`;

export const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
