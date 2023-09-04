// 수정 완료 (2023.08.06)
// 질문 1: active 상태와 hover 상태일 때의 스타일이 동일한데, 아래와 같이 작성해도 되는가?
// 질문 2: disabled 상태를 아에 배제해도 되는가?

import React from "react";
import styled, { css } from "styled-components";

const FooterButtonWrapper = styled.button<{ activated: boolean }>`
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.activated
      ? css`
          // active
          color: #141414;
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 14px; /* 100% */
          text-transform: uppercase;
          border: none;
          background-color: transparent;
        `
      : css`
          // default
          color: rgba(20, 20, 20, 0.7);
          font-family: Pretendard;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px; /* 100% */
          text-transform: uppercase;
          border: none;
          background-color: transparent;

          // hover
          &:hover:not(:disabled) {
            color: #141414;
            font-family: Pretendard;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 14px; /* 100% */
            text-transform: uppercase;
            border: none;
            background-color: transparent;
          }
        `}
`;

export interface FooterButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  activated: boolean;
}

export default function FooterButton(props: FooterButtonProps) {
  return <FooterButtonWrapper {...props}>{props.children}</FooterButtonWrapper>;
}

/*
const ButtonWrapper = styled.button`
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;

  color: rgba(20, 20, 20, 0.7);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px; 

  text-transform: uppercase;
  border: none;
  background-color: transparent;

  &:hover:active:not(:disabled) {
    color: #141414;
    font-weight: 500;
  }
`;

export interface FooterButtonProps {
  children: ReactNode;
}
export default function FooterButton({ children }: FooterButtonProps) {
  return <ButtonWrapper>{children}</ButtonWrapper>;
}
*/
