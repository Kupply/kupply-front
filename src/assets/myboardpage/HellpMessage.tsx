import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

const HelpBox = styled.button<{ isHovered: boolean }>`
  display: flex;
  width: 25px;
  height: 25px;
  //border: 2px solid black; /* 검정색 외곽선 추가 */
  //border-radius: 5px; /* 원하는 값으로 변경 */
`;

interface MessageBoxProps {
  isVisible: boolean;
}

interface SvgProps {
  isVisible: boolean;
}

interface MessageProps extends React.ComponentPropsWithoutRef<'button'> {}

const ModalMessageBox = styled.div<MessageBoxProps>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  //transition: visibility 0.3s ease-in-out;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  position: absolute;
  top: -95px;
  right: -430px;
  width: 467px;
  height: 67px;
  z-index: 1;
  background: #fff;
  //border-radius: 10px;
  filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1));
`;

const StyledSvg = styled.svg<SvgProps>`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  //transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  position: absolute;
  top: -32px;
  z-index: 1;
`;

/* 실시간 전용 헬프메세지 */
function HelpMessage(props: MessageProps) {
  const [isHovered, setIsHovered] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => {
        clearTimeout(hideTimeout);
      };
    } else {
      setIsVisible(true);
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 0);
    }
  }, [isHovered]);

  return (
    <div style={{ position: 'absolute', left: '260px', top: '189px' }}>
      <HelpBox onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} isHovered={isHovered}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          style={{ marginTop: '4px' }}
        >
          <g clip-path="url(#clip0_4175_15306)">
            <path
              d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
              stroke="#D85888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M9 12H9.0075" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 6V9" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_4175_15306">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </HelpBox>
      <ModalMessageBox isVisible={isVisible}>
        <Typography
          size="mediumText"
          style={{ color: 'var(--Black2, #D85888)', fontWeight: '700', lineHeight: '122.222%' }}
        >
          주의하세요!
        </Typography>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px', marginBottom: '2px' }}>
          <Typography size="normalText" style={{ color: 'var(--Black2, #434343)', lineHeight: '22px' }}>
            이중전공 지원 시즌에는 학점을 &nbsp;
          </Typography>
          <Typography
            size="normalText"
            style={{ color: 'var(--Black2, #D85888)', fontWeight: '700', lineHeight: '22px' }}
          >
            최대 2번까지 변경
          </Typography>
          <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', lineHeight: '22px' }}>
            할 수 있어요.
          </Typography>
        </div>
        <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', lineHeight: '22px' }}>
          정확한 나의 학점을 입력해서 확실한 지원정보 데이터를 제공 받아보세요.
        </Typography>
      </ModalMessageBox>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{ position: 'absolute', left: '4px', top: '24px' }}
      >
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          isVisible={isHovered}
        >
          <g filter="url(#filter0_b_3639_28210)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.0603169 0L0 0.079604L6.00138 8L12.0028 0.079604L11.9424 0H0.0603169Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_b_3639_28210"
              x="-54.3656"
              y="-54.3656"
              width="120.735"
              height="116.731"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3639_28210" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3639_28210" result="shape" />
            </filter>
          </defs>
        </StyledSvg>
      </div>
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
/* 모달 전용 헬프메세지 */
function ModalHelpMessage(props: MessageProps) {
  const [isHovered, setIsHovered] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isHovered) {
      setIsVisible(true);
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => {
        clearTimeout(hideTimeout);
      };
    } else {
      setIsVisible(true);
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 0);
    }
  }, [isHovered]);

  return (
    <div style={{ position: 'absolute', left: '260px', top: '189px' }}>
      <HelpBox onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} isHovered={isHovered}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          style={{ marginTop: '4px' }}
        >
          <g clip-path="url(#clip0_4175_15306)">
            <path
              d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
              stroke="#D85888"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M9 12H9.0075" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 6V9" stroke="#D85888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_4175_15306">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </HelpBox>
      <ModalMessageBox isVisible={isVisible}>
        <Typography
          size="mediumText"
          style={{ color: 'var(--Black2, #D85888)', fontWeight: '700', lineHeight: '122.222%' }}
        >
          주의하세요!
        </Typography>
        <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '2px', marginBottom: '2px' }}>
          <Typography size="normalText" style={{ color: 'var(--Black2, #434343)', lineHeight: '22px' }}>
            이중전공 지원 시즌에는 학점을
          </Typography>
          <Typography
            size="normalText"
            style={{ color: 'var(--Black2, #D85888)', fontWeight: '700', lineHeight: '22px' }}
          >
            최대 2번까지 변경
          </Typography>
          <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', lineHeight: '22px' }}>
            할 수 있어요.
          </Typography>
        </div>
        <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', lineHeight: '22px' }}>
          정확한 나의 학점을 입력해서 확실한 지원정보 데이터를 제공 받아보세요.
        </Typography>
      </ModalMessageBox>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{ position: 'absolute', left: '4px', top: '24px' }}
      >
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          isVisible={isHovered}
        >
          <g filter="url(#filter0_b_3639_28210)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.0603169 0L0 0.079604L6.00138 8L12.0028 0.079604L11.9424 0H0.0603169Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_b_3639_28210"
              x="-54.3656"
              y="-54.3656"
              width="120.735"
              height="116.731"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3639_28210" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3639_28210" result="shape" />
            </filter>
          </defs>
        </StyledSvg>
      </div>
    </div>
  );
}

export { HelpMessage, ModalHelpMessage };
