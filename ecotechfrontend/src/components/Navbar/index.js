import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import {
  LogoContainer,
  Nav,
  NavLink,
  NavMenu,
  NavMenuItems,
  NavText,
  NavTextLink,
  NavbarToggle,
  Span,
  LogoImage,
  LogoText,
} from "./styles";
import logo from "../../assets/logo.png";

/**
 * Navbar Component
 *
 * Esse componente é responsável por renderizar a barra de navegação
 */

function Navbar() {
  // estado para controlar a visibilidade da sidebar
  const [sidebar, setSidebar] = useState(false);

  // funcao para alternar a visibilidade da sidebar
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavLink to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavLink>

          <LogoContainer>
            <LogoText>Eco Tech</LogoText>
            <LogoImage src={logo} alt="Logo" />
          </LogoContainer>
        </Nav>

        <NavMenu className={sidebar ? "active" : ""}>
          <NavMenuItems onClick={showSidebar}>
            <NavbarToggle>
              <NavLink to="#">
                <AiIcons.AiOutlineClose />
              </NavLink>
            </NavbarToggle>
            {SidebarData.map((item, index) => {
              return (
                <NavText key={index} className={item.cName}>
                  <NavTextLink to={item.path}>
                    {item.icon}
                    <Span>{item.title}</Span>
                  </NavTextLink>
                </NavText>
              );
            })}
          </NavMenuItems>
        </NavMenu>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
