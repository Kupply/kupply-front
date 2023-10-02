import React from "react";
import styled from "styled-components";

export interface InterestMajorProps
  extends React.ComponentPropsWithoutRef<"button"> {
  active?: boolean;
}

const Button = styled.button<InterestMajorProps>`
  display: inline-flex;
  width: 124px;
  height: 46px;
  padding: 16px 40px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 5px;
  background: rgba(216, 88, 136, 0.23);
`;

const Text = styled.text`           // 2지망으로 바꾸면 이상해짐
  color: var(--PRIMARY, #D85888);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

function InterestMajorButton(props: InterestMajorProps) {
  const { children = "1지망", active = false, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
}

export default InterestMajorButton;