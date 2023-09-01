import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: rgb(72,72,72);
  height: 70px; // Altura aumentada para 70px
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 2rem;
  margin-left: 20px; // Espaço entre logo e título
  color: white;
`;

export const LogoTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Navigation = styled.nav`
  a {
    margin-left: 20px;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    font-size: 1.5rem;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: white;
    }
  }
`;
