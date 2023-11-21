import styled from "styled-components";
import { Link } from "react-router-dom";

/*
 * Navbar styles
 *
 * Esse componente é responsável por estilizar a barra de navegação
 */

export const Nav = styled.div`
  background-color: #010e41;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const NavLink = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
`;

export const NavMenu = styled.nav`
  background-color: #010e41;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 850ms;
  z-index: 1000; // Set a high z-index value // overwrites the default value of 1

  &.active {
    left: 0;
    transition: 350ms;
  }
`;

export const NavMenuItems = styled.ul`
  width: 100%;
`;

export const NavText = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;
`;

export const NavTextLink = styled(Link)`
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-radius: 4px;

  &:hover {
    background-color: #1a83ff;
  }
`;

export const NavbarToggle = styled.li`
  background-color: #010e41;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Span = styled.span`
  margin-left: 16px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 10px;
  background-color: #010e41;
`;

export const LogoImage = styled.img`
  height: 60px;
  margin-right: 1rem;
  background-color: #010e41;
`;
