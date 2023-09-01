import styled from 'styled-components';

export const LatestDataCard = styled.div`
  margin: 0px auto;
  padding: 35px;
  max-width: 400px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }

  p {
    margin-bottom: 10px;
    font-size: 18px;
    color: #555;
  }
`;