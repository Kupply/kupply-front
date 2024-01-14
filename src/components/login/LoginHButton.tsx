import React from "react";
import styled from "styled-components";

const LoginButton = styled.button`
  display: flex;
  width: 110px;
  height: 40.244px;
  justify-content: center;
  margin-left: 843px;

  border-radius: 10px;
  border: 1.5px solid #d85888;
  cursor: pointer;
`;

const LoginText = styled.text`
  display: flex;
  width: 64px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 0 auto;

  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
`;

type LoginHButtonProps = {
  onClick: any;
};

function LoginHButton({ onClick }: LoginHButtonProps) {
  return (
    <LoginButton onClick={onClick}>
      <LoginText>Log In</LoginText>
    </LoginButton>
  );
}

export default LoginHButton;
