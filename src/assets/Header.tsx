import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1920px;
  height: 103px;
  flex-shrink: 0;
`;

const Logo = styled.button`
  display: flex;
  background: none;
  border: none;
`;

const LogoImage = styled.img`
  width: 29.569px;
  height: 29.569px;
  flex-shrink: 0;
`;

const LogoText = styled.div`
  color: #000;
  font-family: Gmarket Sans;
  font-size: 21.345px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Menu = styled.button`
  display: inline-flex;
  background: none;
  border: none;
  display: inline-flex;
  padding: 8px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;

  &:hover {
    background: rgba(216, 88, 136, 0.1);
    color: #d85888;
    font-weight: 600;
  }
`;

function Header2() {
  const navigate = useNavigate();
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
    <Wrapper>
      <Logo onClick={handleLogoClick}>
        <LogoImage src="../../design_image/logo.png" />{" "}
        <LogoText>쿠플라이</LogoText>
      </Logo>
      <Menu onClick={handleMenu1Click}>합격자료</Menu>
      <Menu onClick={handleMenu2Click}>마이보드</Menu>
      <Menu onClick={handleMenu3Click}>커뮤니티</Menu>
    </Wrapper>
  );
}

export default Header2;
