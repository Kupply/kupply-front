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

/* 질문: onClick 이벤트 추가하려면 무조건 button 이어야 되나? */
const Logo = styled.button`
  padding-left: 128px;
  cursor: pointer;
  background: none;
  border: none;

  color: #2C323A;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 2.2px;
`

const Menu = styled.button`
  padding-right: 80px;
  display: inline-block;
  cursor: pointer;
  color: #2C323A;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
  background: none;
  border: none;
`

const NavItem = styled.ul`
  padding-left: 84px;
  margin-right: 843px;
`

/* 질문1) 로그인 버튼이 헤더에 고정적으로 위치하면 안될 것 같은데, 어떻게 넣지? 
   질문2) 배열 for문에 돌릴 때 i 만 갈아끼우는 것처럼, hanedleClick const 를 저렇게 개별적으로 생성하는 것이 아니라 효율적으로 생성하는 방법 없을까?
*/

function Header() {
  
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  }
  const handleLogoClick = () => {
    navigate("/");
  }
  const handleMenu1Click = () => {
    navigate("/previous");
  }
  const handleMenu2Click = () => {
    navigate("/myboard");
  }
  const handleMenu3Click = () => {
    navigate("/community");
  }

  return (
    <Container>
      <Logo onClick={handleLogoClick}>Kupply</Logo>
      <NavItem>
        <Menu onClick={handleMenu1Click}>PREVIOUSLY</Menu>
        <Menu onClick={handleMenu2Click}>MYBOARD</Menu>
        <Menu onClick={handleMenu3Click}>COMMUNITY</Menu>
      </NavItem>
      <LoginHButton onClick={handleLoginClick}/>
    </Container>
  );
}

export default Header;
