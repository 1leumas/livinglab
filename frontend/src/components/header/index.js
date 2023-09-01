import React from "react";
import { Link } from "react-router-dom";
import { HeaderContainer, HeaderTitle, LogoTitleContainer, Navigation } from "./styles";
import logo from "./images/logounijui.png";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoTitleContainer>
        <img src={logo} alt="Logo UniJui" width="100" height="100" />
        <HeaderTitle>Living Lab</HeaderTitle>
      </LogoTitleContainer>
      <Navigation>
        <Link to="/">Home</Link>
        <Link to="/trends">Trends</Link>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;