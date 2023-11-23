import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.div`
  background-color: rgba(35, 37, 38, 0.95); // Dark grey with slight transparency
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
`;

export const NavLink = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
  color: #f5f5f5; // Light color for contrast
`;

export const NavMenu = styled.nav`
  background-color: rgba(35, 37, 38, 0.95); // Consistent with Nav
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 850ms;
  z-index: 1000;

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
    background-color: #1a83ff; // Bright color for hover effect
  }
`;

export const NavbarToggle = styled.li`
  background-color: rgba(35, 37, 38, 0.95); // Consistent with Nav
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Span = styled.span`
  margin-left: 16px;
  color: #f5f5f5; // Light color for contrast
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 10px;
`;

export const LogoImage = styled.img`
  height: 60px;
  margin-right: 1rem;
`;
