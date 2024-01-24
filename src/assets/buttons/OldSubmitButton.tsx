import React from "react";
import styled from "styled-components";

export interface SubmitButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

const Button = styled.button<SubmitButtonProps>`
  display: flex;
  width: 628px;
  padding: 24px 34px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: ${(props) =>
    props.active ? "#D85888" : "rgba(223, 223, 223, 0.75)"};
`;

const Text = styled.text`
  color: var(--white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

export default function SubmitButton(props: SubmitButtonProps) {
  const { children = "제출하기", active = true, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
}
