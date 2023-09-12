import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Typography from "../../../assets/Typography";
import AlertIconCheck from "../../../assets/icons/AlertIconCheck";

// 2023.09.04 수정중 by 윤진
// ref: https://velog.io/@chlgdnd/%EB%AA%A8%EB%8B%AC-%EC%B0%BD-Fade-out-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0Feat.-React-Typescript

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row; // 가로 나열
  width: 594px;
  height: 102px;
  border-radius: 10px;
  background: rgba(248, 248, 248, 0.45);
  // 팝업 섀도우
  box-shadow: 0px 0px 27.713176727294922px 0px rgba(1, 43, 129, 0.08);
  align-items: center;
  justify-content: center;

  // isOpen 값에 따라 조건부 애니메이션 적용
  animation: ${(props) =>
    props.isOpen
      ? css`
          ${ModalIn}
        `
      : css`
          ${ModalOut}
        `};
  animation-duration: 0.5s;
`;

/*
const ModalWrapper = styled.div`
  height: 100%;
  width: 100%;
  gap: 26px;
`;
*/

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 26px;
`;

// 모달창 애니메이션 (Fade In)
const ModalIn = keyframes`
  from{
    opacity: 1;
    transform: translateY(0);
  }
  to{
    opacity: 0;
    transform: translateY(-30px);
  }
`;

// 모달창 애니메이션 (Fade Out)
const ModalOut = keyframes`
  from{
    opacity: 0;
    transform: translateY(-30px);
  }
  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

interface AlertSmallProps extends React.ComponentPropsWithoutRef<"div"> {
  mainText: string;
  subText: string;
  isOpen: boolean;
  // onClose: () => void;
  // children: JSX.Element;
}

export default function AlertSmall({
  mainText,
  subText,
  isOpen,
}: AlertSmallProps) {
  return (
    <ModalContainer isOpen={isOpen}>
      <AlertIconCheck width="62px" height="62px" />
      <TextWrapper>
        <Typography
          size="mediumText"
          color="#141414"
          style={{ fontWeight: "700", lineHeight: "88.889%" }}
        >
          {mainText}
        </Typography>
        <div style={{ height: "8px" }}></div>
        <Typography size="normalText" color="#141414">
          {subText}
        </Typography>
      </TextWrapper>
    </ModalContainer>
  );
}
