import React, { PropsWithChildren } from "react";
import styled from "styled-components";

// 이슈: onClick prop 으로 추가 여부

const ButtonWrapper = styled.button`
  display: flex;
  width: 627.232px;
  height: 68px;
  padding: 25px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #d85888;

  color: #d85888;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;

  &:hover:not(:disabled) {
    border: none;
    background: rgba(216, 88, 136, 0.1);
  }

  &:active:not(:disabled) {
    border: none;
    background: var(--primary, #d85888);
    color: #fff;
  }
`;

export interface VerificationButtonProps {
  onClick: () => void;
}

function VerificationButton({
  onClick,
  children,
}: PropsWithChildren<VerificationButtonProps>) {
  return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>;
}

export default VerificationButton;
