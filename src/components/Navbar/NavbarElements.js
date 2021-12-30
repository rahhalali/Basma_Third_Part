import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: white;
  box-shadow: 0px 0px 10px gray;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
`;

export const Logo = styled.img`
  height: 30px;
  width: 150px;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    color: #dc143c;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  padding:15px;
`;

export const NavBtnLink = styled.div`
  border-radius: 4px;
  background: #dc143c;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
