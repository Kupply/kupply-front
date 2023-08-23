import React from "react";
import styled from "styled-components";

export interface PrevButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

const Button = styled.button<PrevButtonProps>`
  display: flex;
  width: 156px;
  padding: 24px 34px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  border: ${(props) =>
    props.active ? "1px solid #d85888" : "1px solid var(--df-grey-2, #dfdfdf)"};
  opacity: ${(props) => (props.active ? "null" : "0.45")};
  background: var(--white, #fff);
`;

const Text = styled.text`
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;

function PrevButton(props: PrevButtonProps) {
  const { children = "이전", active = true, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text style={{ color: active ? "#D85888" : "#DFDFDF" }}>{children}</Text>
    </Button>
  );
}

export default PrevButton;
