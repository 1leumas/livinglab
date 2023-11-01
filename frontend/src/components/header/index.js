import React from "react";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  HeaderTitle,
  LogoTitleContainer,
  Navigation,
} from "./styles";
import logo from "./images/ecotech.png";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoTitleContainer>
        <Link to="/">
          <img src={logo} alt="Logo UniJui" width="150" height="100" />
        </Link>
        <HeaderTitle>Eco Tech</HeaderTitle>
      </LogoTitleContainer>
      <Navigation>
        <Link to="/">Home</Link>
        <Link to="/trends">Trends</Link>
        <Link to="/compare">Devices</Link>
        <Link to="/about">About</Link>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
