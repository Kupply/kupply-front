import React from "react";
import styled, { css } from "styled-components";

/* Props 항목
(아이콘의 크기를 결정하는 변수)
- width 값
- height 값  */

const IconWrapper = styled.div<AlertIconCheckProps>`
  position: relative;
  width: ${(props) => props.width || "80px"};
  height: ${(props) => props.height || "80px"};
  border-radius: 50%;
  background-color: #d858880d;
  // opacity: 0.05;

  & > svg:not(:root) {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 25%;
    bottom: 40%;
    left: 25%;
    right: 40%;
  }
`;

export interface AlertIconCheckProps
  extends React.ComponentPropsWithoutRef<"div"> {
  width: string;
  height: string;
}

export default function AlertIconCheck({ width, height }: AlertIconCheckProps) {
  return (
    <IconWrapper width={width} height={height}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          d="M15.9485 29.3332C23.2886 29.3332 29.2388 23.3636 29.2388 15.9998C29.2388 8.63604 23.2886 2.6665 15.9485 2.6665C8.60848 2.6665 2.6582 8.63604 2.6582 15.9998C2.6582 23.3636 8.60848 29.3332 15.9485 29.3332Z"
          stroke="#D85888"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.3783 12.6665L14.2869 18.7776L11.5181 15.9998"
          stroke="#D85888"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}
