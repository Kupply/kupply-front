import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

/* 실시간 전용 헬프메세지 */
const HelpBox = styled.button<{ isHovered: boolean }>`
  display: flex;
  width: 40px;
  height: 20px;
  position: absolute;
  top: 20px;
`;

interface MessageBoxProps {
  isVisible: boolean;
};

interface SvgProps {
  isVisible: boolean;
};

interface MessageProps 
  extends React.ComponentPropsWithoutRef<"button"> {
};

const MessageBox = styled.div<MessageBoxProps>`
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  position: absolute;
  top: -30px;
  right: -280px;
  width: 528px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.80);
  //border-radius: 10px;
  filter: drop-shadow(0px 0px 30px rgba(0,0,0,0.10));
`;

const ChartMessageBox = styled.div<MessageBoxProps>`
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  position: absolute;
  top: -30px;
  right: -280px;
  width: 528px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.80);
  //border-radius: 10px;
  filter: drop-shadow(0px 0px 30px rgba(0,0,0,0.10));
`;

const ModalMessageBox = styled.div<MessageBoxProps>`
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  position: absolute;
  top: -100px;
  //right: -280px;
  width: 467px;
  height: 87px;
  z-index: 1000;
  background: #FFF;
  //border-radius: 10px;
  filter: drop-shadow(0px 0px 30px rgba(0,0,0,0.10));
`;

const StyledSvg = styled.svg<SvgProps>`
  opacity: ${props => (props.isVisible ? 1 : 0)};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  position: absolute;
  top: -32px;
  z-index: 1000;
`;

function HelpMessage(props: MessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ marginTop: "-5px" }}>
      <HelpBox
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isHovered={isHovered}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"
          style={{ marginTop: "5px" }}
        >
          <g clip-path="url(#clip0_4175_12466)">
            <path d="M10.0013 18.3337C14.6037 18.3337 18.3346 14.6027 18.3346 10.0003C18.3346 5.39795 14.6037 1.66699 10.0013 1.66699C5.39893 1.66699 1.66797 5.39795 1.66797 10.0003C1.66797 14.6027 5.39893 18.3337 10.0013 18.3337Z" stroke="#141414" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.0078 6.66699L9.99948 6.66699" stroke="#141414" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.0078 13.333L10.0078 9.99967" stroke="#141414" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_4175_12466">
              <rect width="30" height="30" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </HelpBox>
      <MessageBox isVisible={isHovered}>
        <Typography size="smallText" style={{ color: "var(--Main-Black, #141414)", fontWeight: "400", lineHeight: "157.143%" }}>
        본 통계는 서비스 이용자의 수집된 정보를 기반으로 한 것으로, 실제 통계와 상이할 수 있습니다.
        </Typography>
      </MessageBox>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "absolute", right: "238px" }}
      >
        <StyledSvg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none"
          isVisible={isHovered}
        >
          <g filter="url(#filter0_b_3639_20534)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0603169 0L0 0.079604L6.00138 8L12.0028 0.079604L11.9424 0H0.0603169Z" fill="white" fill-opacity="0.8"/>
          </g>
          <defs>
            <filter id="filter0_b_3639_20534" x="-54.3656" y="-54.3656" width="120.735" height="116.731" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3639_20534"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3639_20534" result="shape"/>
            </filter>
          </defs>
        </StyledSvg>
      </div>
    </div>
  )
};

/* 차트 전용 헬프메세지 */

/* 모달 전용 헬프메세지 */
function ModalHelpMessage(props: MessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ position: "absolute", top: "162px", left: "185px" }}>
      <HelpBox
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        isHovered={isHovered}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"
          style={{ marginTop: "5px" }}
        >
          <g clip-path="url(#clip0_4175_15306)">
            <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 12H9.0075" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 6V9" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_4175_15306">
              <rect width="18" height="18" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </HelpBox>
      <ModalMessageBox isVisible={isHovered}>
        <Typography size="mediumText" style={{ color: "var(--Black2, #D85888)", fontWeight: "700", lineHeight: "122.222%" }}>
        주의하세요!
        </Typography>
        <div style={{ display: "flex", alignItems: "baseline", marginTop: "2px", marginBottom: "2px" }}>
          <Typography size="normalText" style={{ color: "var(--Black2, #434343)", lineHeight: "22px" }}>
            이중전공 지원 시즌에는 학점을
          </Typography>
          <Typography size="normalText" style={{ color: "var(--Black2, #D85888)", fontWeight: "700", lineHeight: "22px" }}>
            최대 2번까지 변경
          </Typography>
          <Typography size="normalText" style={{ color: "var(--Main-Black, #141414)", lineHeight: "22px" }}>
            할 수 있어요.
          </Typography>
        </div>
        <Typography size="normalText" style={{ color: "var(--Main-Black, #141414)", lineHeight: "22px" }}>
          정확한 나의 학점을 입력해서 확실한 지원정보 데이터를 제공 받아보세요.
        </Typography>
      </ModalMessageBox>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "absolute",  }}
      >
        <StyledSvg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none"
          isVisible={isHovered}
        >
          <g filter="url(#filter0_b_3639_28210)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.0603169 0L0 0.079604L6.00138 8L12.0028 0.079604L11.9424 0H0.0603169Z" fill="white"/>
          </g>
          <defs>
            <filter id="filter0_b_3639_28210" x="-54.3656" y="-54.3656" width="120.735" height="116.731" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3639_28210"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3639_28210" result="shape"/>
            </filter>
          </defs>
        </StyledSvg>
      </div>
    </div>
  )
};


export {HelpMessage, ModalHelpMessage};