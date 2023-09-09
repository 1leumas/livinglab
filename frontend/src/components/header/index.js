import React from "react";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  HeaderTitle,
  LogoTitleContainer,
  Navigation,
} from "./styles";
import logo from "./images/logounijui.png";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoTitleContainer>
        <Link to="/">
          <img src={logo} alt="Logo UniJui" width="100" height="100" />
        </Link>
        <HeaderTitle>Living Lab</HeaderTitle>
      </LogoTitleContainer>
      <Navigation>
        <Link to="/">Home</Link>
        <Link to="/trends">Trends</Link>
        <Link to="/compare">Compare</Link>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;
