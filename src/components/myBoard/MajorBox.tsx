import React from 'react';
import styled from 'styled-components';

/* 일단 하드코딩부터 */

const MajorBox = () => {
  return (
    <Wrapper>
      <TextBox>
        <TitleText>1지망 관심전공</TitleText>
      </TextBox>
      <Vector src="designImage/myBoard/MajorBoxVector.svg" alt="vector" />

      <MajorWrapper>
        <Major src="designImage/majorSymbol/newMajorImage/BusinessLarge.png" alt="business" />
        <Shadow src="designImage/majorSymbol/BusinessShadow.svg" alt="shadow" />
      </MajorWrapper>
      <MajorTextBox>
        <전공Text>경영대학</전공Text>
        <MajorText>Business School</MajorText>
      </MajorTextBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 16.2vw;
  height: 17.37vw;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  backdrop-filter: blur(12px);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='311' height='353' viewBox='0 0 311 353' fill='none'%3E%3Cg filter='url(%23filter0_b_318_1192)'%3E%3Cpath d='M301 5.16567e-06C306.523 5.26371e-06 311 4.47716 311 10L311 343C311 348.523 306.523 353 301 353H9.99999C4.47715 353 -5.94454e-07 348.523 0 343L3.58426e-05 10C3.64371e-05 4.47715 4.47719 -9.80385e-08 10 0L301 5.16567e-06Z' fill='url(%23paint0_radial_318_1192)' fill-opacity='0.9'/%3E%3Cpath d='M310.5 10L310.5 343C310.5 348.247 306.247 352.5 301 352.5H9.99999C4.75329 352.5 0.499999 348.247 0.5 343L0.500036 10C0.500036 4.75329 4.75333 0.5 10 0.5L301 0.500005C306.247 0.500005 310.5 4.7533 310.5 10Z' stroke='%23DFDFDF'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_b_318_1192' x='-24' y='-24' width='359' height='401' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeGaussianBlur in='BackgroundImageFix' stdDeviation='12'/%3E%3CfeComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_318_1192'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_318_1192' result='shape'/%3E%3C/filter%3E%3CradialGradient id='paint0_radial_318_1192' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(1.51875e-05 4.32749) rotate(47.2729) scale(474.646 721.971)'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(8px);
    fill: radial-gradient(230.3% 140.56% at 0% 1.23%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
    stroke-width: 1px;
    stroke: #dfdfdf;
    backdrop-filter: blur(12px);
  }
`;

const TextBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  margin-top: 1.03vw;
`;

const MajorWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
`;

const MajorTextBox = styled.div`
  position: relative;
  display: center;
  justify-content: center;

  margin-top: 10.22vw;
`;

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;
  text-align: center;

  /* BODY TEXT_Bold */
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const 전공Text = styled.div`
  color: #141414;
  text-align: center;

  /* subtitle_Bold */
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
`;

const MajorText = styled.div`
  color: #141414;
  text-align: center;

  /* normal_Regular */
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 19.2px */
  opacity: 0.8;
`;
///////////////// image /////////////////

const Vector = styled.img`
  position: absolute;
  top: 2.95vw;
  flex-shrink: 0;
  width: 16.12vw;
`;

const Major = styled.img`
  position: absolute;
  top: 3.08vw;
  left: 5.76vw;

  width: 4.61vw;
  height: 5.92vw;
  flex-shrink: 0;
`;

const Shadow = styled.img`
  position: absolute;
  top: 3.53vw;
  left: 3.22vw;

  width: 8.365vw;
  height: 8.2vw;
  flex-shrink: 0;
  fill: radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0) 100%);
`;

export default MajorBox;
