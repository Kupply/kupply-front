import React from "react";
import styled, { css } from "styled-components";
import CheckButton from "./CheckButton";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  margin-left: 8px;
  margin-right: 8px;
`;

/* 수정사항 - svg 이미지에 onClick 이벤트 구현 필요 */
export default function CheckFieldBox({ children }: any) {
  return (
    <Container>
      <CheckButton />
      <Title>{children}</Title>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="fi:x-circle">
          <path
            id="Vector"
            d="M12.1334 17.2666L15.8667 13.9999"
            stroke="#141414"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            id="Vector_2"
            d="M15.8667 14L12.1334 10.2667"
            stroke="#141414"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
    </Container>
  );
}
