import React from "react";
import styled from "styled-components";

const MailButtonWrapper = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
  }
  &:disabled > svg path {
    stroke-opacity: 0.445;
  }

  &:active:not(:disabled) {
    background-color: rgba(216, 88, 136, 0.2);
  }

  & > svg {
    width: 26px;
    height: 26px;
    padding-left: 2px;
    padding-top: 2px;
    transition: 0.25s ease-in-out;
    stroke: #141414;
  }

  /*

SVG태그는 다양한 스트로크(stroke) 속성을 제공한다.
- stroke : 선색 속성
- stroke-width : 선 굵기 속성
- stroke-linecap : 선의 양쪽 끝 모양 속성
- stroke-dasharray : 점선처리 속성

  */

  &:hover:not(:disabled) > svg > path {
    stroke: #d85888;
  }
  &:hover:not(:disabled) > svg > path {
    fill: rgba(216, 88, 136, 0.1);
  }

  &:active:not(:disabled) > svg > path {
    fill: rgba(216, 88, 136, 0.75);
  }
`;

export default function MailButton(
  props: React.ComponentPropsWithoutRef<"button">
) {
  return (
    <MailButtonWrapper {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
      >
        <path
          d="M5.2 5H20.8C21.8725 5 22.75 5.975 22.75 7.16667V20.1667C22.75 21.3583 21.8725 22.3333 20.8 22.3333H5.2C4.1275 22.3333 3.25 21.3583 3.25 20.1667V7.16667C3.25 5.975 4.1275 5 5.2 5Z"
          stroke="#141414"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.75 7.16675L13 14.2084L3.25 7.16675"
          stroke="#141414"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </MailButtonWrapper>
  );
}
