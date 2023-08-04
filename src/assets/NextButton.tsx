import React from "react";
import styled from "styled-components";

export interface NextButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

const Button = styled.button<NextButtonProps>`
  display: flex;
  width: 628px;
  padding: 24px 34px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  opacity: 0.75;
  background: ${(props) => (props.active ? "#D85888" : "#EEE")};
`;

const Text = styled.text`
  color: var(--white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

function NextButton(props: NextButtonProps) {
  const { children = "Next", active = false, ...rest } = props;
  return (
    <Button active={active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
}

export default NextButton;
