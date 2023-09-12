import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import AlertIconCheck from "./AlertIconExclamation";

// 2023.09.04 수정중 by 윤진

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 818px;
  height: 918px;
  border-radius: 20px;
  background: #fff;
  align-items: center;
`;

// onClick 이벤트 미구현
const ModalButtonWrapper = styled.button`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  margin-left: 722px;
`;

const StyledAlertIconCheck = styled(AlertIconCheck)`
  margin-bottom: 15px;
`;

export interface AlertLargeProps extends React.ComponentPropsWithoutRef<"div"> {
  mainText: string;
  subText: string;
  notiText: string;
}

export default function AlertLarge({
  mainText,
  subText,
  notiText,
}: AlertLargeProps) {
  return (
    <ModalContainer>
      <ModalButtonWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path
            d="M37.5 22.5L22.5 37.5"
            stroke="#141414"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.5 22.5L37.5 37.5"
            stroke="#141414"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </ModalButtonWrapper>
      <div style={{ height: "255px" }}></div>
      <StyledAlertIconCheck width="80px" height="80px" />
      <Typography size="largeText" color="#141414">
        {mainText}
      </Typography>
      <div style={{ height: "26px" }}></div>
      <Typography size="mediumText" color="#141414">
        {subText}
      </Typography>
      <div style={{ height: "289px" }}></div>
      <Typography size="smallText" color="#B9B9B9">
        {notiText}
      </Typography>
    </ModalContainer>
  );
}
