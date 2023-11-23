import styled from "styled-components";

export const PeakDataCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  max-width: 75%;
  margin-left: auto; // Automatically adjust left margin
  margin-right: auto; // Automatically adjust right margin

  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;

export const DataCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 15px;
  margin: 15px;
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 18px;
    color: #1a1a1a;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #4a4a4a;
  }

  @media (max-width: 768px) {
    width: 110px;
    height: 110px;
    padding: 10px;
  }
`;
