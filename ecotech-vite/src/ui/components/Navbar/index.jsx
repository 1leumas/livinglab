import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData.jsx";
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
} from "./styles";
import logo from "../../../assets/logo.png";
import { useState } from "react";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavLink to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavLink>

          <LogoContainer>
            <LogoImage src={logo} alt="Logo" to="/" />
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
