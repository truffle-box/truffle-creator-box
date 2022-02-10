import { useState } from "react";

import { Navbar } from "react-bulma-components";
import styled from "styled-components";

import Login from "./Login";

import truffle from "../Assets/icon.png";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: #4a4a4a;
`;

const Navigation = () => {
  const [navIsActive, setNavIsActive] = useState(false);

  return (
    <Navbar
      active={navIsActive}
      transparent={true}
      style={{ background: "none" }}
    >
      <Navbar.Brand>
        <Navbar.Item renderAs="span">
          <Link to="/">
            <img src={truffle} alt="Truffle Creator" />
          </Link>
        </Navbar.Item>
        <Navbar.Burger
          onClick={() => setNavIsActive(navIsActive ? false : true)}
        />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item renderAs="span">
            <StyledLink to="/">home</StyledLink>
          </Navbar.Item>
          <Navbar.Item renderAs="span">
            <StyledLink to="/gallery">gallery</StyledLink>
          </Navbar.Item>
          <Navbar.Item renderAs="span">
            <StyledLink to="/about">about</StyledLink>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container align="end">
          <Navbar.Item renderAs="span">
            <Login />
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Navigation;
