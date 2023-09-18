import React from "react";
import styled from "styled-components";

export interface LoginButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

const Button = styled.button<LoginButtonProps>`
  display: flex;
  width: 628px;
  height: 68px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--Primary-color, #D85888);
`;

const Text = styled.text`
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

function LoginButton(props: LoginButtonProps) {
  const { children = "로그인하기", active = true, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
}

export default LoginButton;