import React from "react";
import styled from "styled-components";
import LoginHButton from "./LoginHButton";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 103px;
  background-color: whitesmoke;
`;

const Logo = styled.button`
  cursor: pointer;
  background: none;
  border: none;

  color: #2c323a;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.2px;
`;

const Menu = styled.button`
  display: inline-block;
  cursor: pointer;
  color: #2c323a;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  background: none;
  border: none;
  margin-left: 82px;
`;

const NavItem = styled.ul`
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  padding-left: 128px;
  padding-right: 128px;
  align-items: center;
  margin: 0 auto;
  display: flex;
`;

function Header() {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleMenu1Click = () => {
    navigate("/previous");
  };
  const handleMenu2Click = () => {
    navigate("/myboard");
  };
  const handleMenu3Click = () => {
    navigate("/community");
  };

  return (
    <Container>
      <Wrapper>
        <Logo onClick={handleLogoClick}>Kupply</Logo>
        <NavItem>
          <Menu onClick={handleMenu1Click}>PREVIOUSLY</Menu>
          <Menu onClick={handleMenu2Click}>MYBOARD</Menu>
          <Menu onClick={handleMenu3Click}>COMMUNITY</Menu>
        </NavItem>
        <LoginHButton onClick={handleLoginClick} />
      </Wrapper>
    </Container>
  );
}

export default Header;
