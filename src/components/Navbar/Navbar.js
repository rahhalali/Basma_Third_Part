import React, { useContext } from "react";
import {
  Nav,
  NavLink,
  Logo,
  Left,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import basma from "../assets/basma-removebg-preview.png";
import SessionContext from "../../context/SessionContext";

function Navbar() {
  const {
    actions: { logout },
  } = useContext(SessionContext);
  return (
    <>
      <Nav>
        <Left>
          <NavLink to="/">
            <Logo src={basma} alt="basma" />
          </NavLink>
        </Left>
        <NavMenu>
          <NavLink to="/">List</NavLink>

          <NavLink to="/chart">Graph</NavLink>
        </NavMenu>
        <NavBtn>
          <NavLink to="/login">
            <NavBtnLink onClick={() => logout()}>Sign Out</NavBtnLink>
          </NavLink>
        </NavBtn>
      </Nav>
    </>
  );
}

export default Navbar;
