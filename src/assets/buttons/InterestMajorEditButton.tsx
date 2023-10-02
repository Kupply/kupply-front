import React from "react";
import styled from "styled-components";

export interface InterestMajorEditProps
  extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

const Button = styled.button<InterestMajorEditProps>`
  display: inline-flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.30);
`;

const Text = styled.text`
  color: var(--Black2, #434343);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
`;

function InterestMajorEditButton(props: InterestMajorEditProps) {
  const { children = "관심 전공 수정", active = false, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
}

export default InterestMajorEditButton;