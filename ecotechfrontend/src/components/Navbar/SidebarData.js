import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

/*
 * SidebarData
 *
 * Esse componente é responsável por renderizar os itens do menu lateral
 */

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Particulas",
    path: "/particulas",
    icon: <AiIcons.AiOutlineLineChart />,
    cName: "nav-text",
  },
  {
    title: "Estação Aeroporto",
    path: "/aeroporto",
    icon: <AiIcons.AiOutlineLineChart />,
    cName: "nav-text",
  },
  {
    title: "Estação Cruzeiro",
    path: "/cruzeiro",
    icon: <AiIcons.AiOutlineLineChart />,
    cName: "nav-text",
  },
  {
    title: "Sobre",
    path: "/about",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
