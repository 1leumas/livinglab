import { createGlobalStyle } from 'styled-components';
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    padding: 0;
    min-height: 95%;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;