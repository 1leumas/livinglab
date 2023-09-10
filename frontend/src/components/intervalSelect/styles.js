import styled from "styled-components";

export const IntervalSelectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IntervalSelectContainer = styled.div`
  background-color: gray;
  padding: 20px;
  width: 300px;
  height: 220px;
  border-radius: 8px;
  position: relative;
`;

export const CloseButton = styled.button`
  background-color: red;
  color: white;
  font-size: 1.2em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OkButton = styled.button`
  background-color: green;
  color: white;
  font-size: 1.2em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IntervalInputLabel = styled.label`
  font-size: 1em;
  font-weight: bold;
  margin-top: 10px;
  display: block;
`;

export const IntervalInput = styled.input`
  width: 95%;
  padding: 8px;
  font-size: 1em;
  border: none;
  border-radius: 4px;
  margin: 10px auto;
  display: block;
`;
