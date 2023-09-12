import React from "react";
import styled from "styled-components";

/* 23.08.22 디자인 변경 수정 완료 - 버튼 background 색상 */

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
  opacity: ${(props) => (props.active ? "null" : "0.75")}; // 수정
  background: ${(props) =>
    props.active
      ? "rgba(216, 88, 136, 0.80)"
      : "var(--df-grey-2, #DFDFDF)"}; // 수정
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
  const { children = "다음", active = true, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
}

export default NextButton;
