import React, { useState } from 'react';
import styled from 'styled-components';

// 일단 하드코딩
// background 90도 돌아간거 적용 X

function formatTimeTo12HourFormat(date: Date) {
  var hours = date.getHours();
  var minutes: number | string = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 12-hour clock
  minutes = minutes < 10 ? '0' + minutes : minutes.toString();
  var timeString = hours + ':' + minutes + ' ' + ampm;
  return timeString;
}

const Application = () => {
  const [updateTime, setUpdateTime] = useState(formatTimeTo12HourFormat(new Date()));
  const handleClick = () => {
    setUpdateTime(formatTimeTo12HourFormat(new Date()));
  };

  return (
    <AppliWrapper>
      <TitleWrapper style={{ top: '21px' }}>
        <TitleText>실시간 지원자</TitleText>
        <Information src="designImage/myBoard/InformationCircle.svg" alt="information" />
      </TitleWrapper>
      <Vector src="designImage/myBoard/MajorBoxVector.svg" alt="vector" style={{ top: '62px' }} />
      <NumberBox style={{ top: '73px' }}>
        <NumberText style={{ color: '#D85888' }}>32</NumberText>
        <NumberText style={{ color: 'rgba(67, 67, 67, 0.80)' }}>&nbsp;/ 12</NumberText>
        <NumberText2>명 정원</NumberText2>
      </NumberBox>
      <Content>32명의 지원자가 경영학과를 지원했습니다.</Content>
      <UpdateBox style={{ top: '146.5px' }}>
        <StyledSVG xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M11.5 2V5H8.5" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M10.2449 7.50001C9.91993 8.41997 9.30472 9.20937 8.49202 9.74926C7.67932 10.2892 6.71317 10.5503 5.73915 10.4933C4.76513 10.4363 3.83602 10.0643 3.09182 9.43334C2.34762 8.80237 1.82865 7.94662 1.61312 6.99503C1.39759 6.04345 1.49718 5.0476 1.89687 4.15754C2.29656 3.26748 2.97471 2.53144 3.82912 2.06033C4.68352 1.58921 5.6679 1.40856 6.63392 1.54558C7.59993 1.6826 8.49525 2.12988 9.18494 2.82001L11.4999 5.00001"
            stroke="#A8A8A8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </StyledSVG>
        <UpdateText onClick={handleClick}>Last Update {updateTime}</UpdateText>
      </UpdateBox>
    </AppliWrapper>
  );
};

const MockApply = () => {
  const [updateTime, setUpdateTime] = useState(formatTimeTo12HourFormat(new Date()));
  const handleClick = () => {
    setUpdateTime(formatTimeTo12HourFormat(new Date()));
  };

  return (
    <MockWrapper>
      <TitleWrapper style={{ top: '18px' }}>
        <TitleText>내 학점 위치 파악하기</TitleText>
        <Information src="designImage/myBoard/InformationCircle.svg" alt="information" />
      </TitleWrapper>
      <Vector src="designImage/myBoard/MajorBoxVector.svg" alt="vector" style={{ top: '57px' }} />
      <NumberBox style={{ top: '67px' }}>
        <NumberText style={{ color: '#D85888' }}>3.14</NumberText>
        <NumberText style={{ color: 'rgba(67, 67, 67, 0.80)' }}>&nbsp;: 1</NumberText>
      </NumberBox>
      <UpdateBox style={{ top: '116px' }}>
        <StyledSVG xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M11.5 2V5H8.5" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M10.2449 7.50001C9.91993 8.41997 9.30472 9.20937 8.49202 9.74926C7.67932 10.2892 6.71317 10.5503 5.73915 10.4933C4.76513 10.4363 3.83602 10.0643 3.09182 9.43334C2.34762 8.80237 1.82865 7.94662 1.61312 6.99503C1.39759 6.04345 1.49718 5.0476 1.89687 4.15754C2.29656 3.26748 2.97471 2.53144 3.82912 2.06033C4.68352 1.58921 5.6679 1.40856 6.63392 1.54558C7.59993 1.6826 8.49525 2.12988 9.18494 2.82001L11.4999 5.00001"
            stroke="#A8A8A8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </StyledSVG>
        <UpdateText onClick={handleClick}>Last Update {updateTime}</UpdateText>
      </UpdateBox>
    </MockWrapper>
  );
};

const AppliWrapper = styled.div`
  width: 16.25vw;
  height: 181px;

  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='312' height='181' viewBox='0 0 312 181' fill='none'%3E%3Cg filter='url(%23filter0_b_318_1191)'%3E%3Cpath d='M302 1.62046e-05C307.523 1.65111e-05 312 4.47717 312 10V171C312 176.523 307.523 181 302 181L9.99999 181C4.47715 181 -1.9015e-07 176.523 0 171L5.54319e-06 10C5.73334e-06 4.47715 4.47716 -3.06492e-07 10 0L302 1.62046e-05Z' fill='url(%23paint0_radial_318_1191)' fill-opacity='0.9'/%3E%3Cpath d='M302 0.500016C307.247 0.500017 311.5 4.75331 311.5 10V171C311.5 176.247 307.247 180.5 302 180.5L9.99999 180.5C4.75329 180.5 0.5 176.247 0.5 171L0.500006 10C0.500006 4.7533 4.7533 0.5 10 0.5L302 0.500016Z' stroke='%23DFDFDF'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_b_318_1191' x='-24' y='-24' width='360' height='229' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeGaussianBlur in='BackgroundImageFix' stdDeviation='12'/%3E%3CfeComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_318_1191'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_318_1191' result='shape'/%3E%3C/filter%3E%3CradialGradient id='paint0_radial_318_1191' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(-4.29207e-05 2.21889) rotate(29.8134) scale(359.592 478.846)'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(8px);
  }
`;

const MockWrapper = styled.div`
  width: 16.25vw;
  height: 148px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='312' height='148' viewBox='0 0 312 148' fill='none'%3E%3Cg filter='url(%23filter0_b_318_1190)'%3E%3Cpath d='M302 1.62046e-05C307.523 1.65111e-05 312 4.47717 312 10V138C312 143.523 307.523 148 302 148L10 148C4.47714 148 -1.9015e-07 143.523 0 138L4.40701e-06 10C4.59716e-06 4.47716 4.47715 -3.06492e-07 10 0L302 1.62046e-05Z' fill='url(%23paint0_radial_318_1190)' fill-opacity='0.9'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M311 138V10C311 5.02945 306.971 1.00002 302 1.00002L10 1C5.02945 1 1 5.02944 1 10L1 138C1 142.971 5.02942 147 10 147L302 147C306.971 147 311 142.971 311 138ZM312 10C312 4.47717 307.523 1.65111e-05 302 1.62046e-05L10 0C4.47715 -3.06492e-07 4.59716e-06 4.47716 4.40701e-06 10L0 138C-1.9015e-07 143.523 4.47714 148 10 148L302 148C307.523 148 312 143.523 312 138V10Z' fill='%23DFDFDF'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_b_318_1190' x='-24' y='-24' width='360' height='196' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeGaussianBlur in='BackgroundImageFix' stdDeviation='12'/%3E%3CfeComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_318_1190'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_backgroundBlur_318_1190' result='shape'/%3E%3C/filter%3E%3CradialGradient id='paint0_radial_318_1190' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(3.82486 148) rotate(-25.6525) scale(341.871 411.839)'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(8px);
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.08vw;
  gap: 0.47vw;
`;

const NumberBox = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;

  left: 2.08vw;
`;

const UpdateBox = styled.div`
  position: absolute;
  display: flex;
  align-items: center;

  left: 2.08vw;
  gap: 0.26vw;
`;
///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;

  /* BODY TEXT_Bold */
  font-family: Pretendard;
  font-size: 1.042vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const NumberText = styled.div`
  /* head2_Bold */
  font-family: Pretendard;
  font-size: 2.08vw;
  font-style: normal;
  font-weight: 700;
  //line-height: 120%;
`;

const NumberText2 = styled.div`
  color: var(--Black2, #434343);
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 400;
  //line-height: 100%;
  opacity: 0.8;

  margin-left: 10px;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  top: 125.5px;
  left: 2.083vw;

  color: rgba(67, 67, 67, 0.8);
  font-family: Pretendard;
  font-size: 0.73vw;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const UpdateText = styled.div`
  color: var(--A8_Grey-4, #a8a8a8);

  /* detail_Regular */
  font-family: Pretendard;
  font-size: 0.625vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
`;

const StyledSVG = styled.svg`
  &:hover {
    cursor: pointer;
  }
`;

///////////////// image /////////////////

const Information = styled.img`
  display: flex;
  width: 1.042vw;
  height: 20px;

  flex-shrink: 0;
`;

const Vector = styled.img`
  position: absolute;

  flex-shrink: 0;
  width: 16.21vw;
`;

export { Application, MockApply };
