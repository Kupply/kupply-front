import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import AlertIconCheck from "./AlertIconCheck";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: row; // 가로 나열
  width: 594px;
  height: 102px;
  border-radius: 10px;
  background: rgba(248, 248, 248, 0.45);
  // 팝업 섀도우
  box-shadow: 0px 0px 27.713176727294922px 0px rgba(1, 43, 129, 0.08);
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 26px;
`;

export interface AlertSmallProps extends React.ComponentPropsWithoutRef<"div"> {
  mainText: string;
  subText: string;
}

export default function AlertSmall({ mainText, subText }: AlertSmallProps) {
  return (
    <ModalContainer>
      <div style={{ width: "137px", height: "100%" }}></div>
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
