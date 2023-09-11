import React from "react";
import styled from "styled-components";

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
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <path
          d="M25.9173 47.3337C37.6614 47.3337 47.1819 37.7824 47.1819 26.0003C47.1819 14.2183 37.6614 4.66699 25.9173 4.66699C14.1733 4.66699 4.65283 14.2183 4.65283 26.0003C4.65283 37.7824 14.1733 47.3337 25.9173 47.3337Z"
          stroke="#D85888"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M33.0064 20.667L23.2602 30.4448L18.8301 26.0003"
          stroke="#D85888"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </IconWrapper>
  );
}
