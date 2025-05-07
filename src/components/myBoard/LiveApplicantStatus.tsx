import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import ToolTip05 from '../../assets/toolTips/ToolTip05';
import { MajorOptionsKR as MajorOptions } from '../../mappings/MajorTypes';

const Application = ({
  onViewMajor,
  userData,
  curApplyNum,
  curNumOfSelection,
}: {
  onViewMajor: any;
  userData: any;
  curApplyNum: any;
  curNumOfSelection: any;
}) => {
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

  const [updateTime, setUpdateTime] = useState(formatTimeTo12HourFormat(new Date()));
  const handleClick = () => {
    setUpdateTime(formatTimeTo12HourFormat(new Date()));
  };

  const majorKoreanName: MajorOptions = onViewMajor === 1 ? userData.hopeMajor1 : userData.hopeMajor2;

  return (
    <AppliWrapper>
      <TitleWrapper style={{ top: '1.03vw' }}>
        <TitleText>실시간 지원자</TitleText>
        <ToolTip05>
          해당 통계는 쿠플라이 서비스를 통해 모은 정보를 바탕으로 한 것으로 실제 통계와 다를 수 있어요.
        </ToolTip05>
        {/*  <Information src="designImage/myBoard/InformationCircle.svg" alt="information" /> */}
      </TitleWrapper>
      <Vector src="designImage/myBoard/MajorBoxVector.svg" alt="vector" style={{ top: '3.05vw' }} />
      <NumberBox style={{ top: '3.59vw' }}>
        <NumberText style={{ color: '#D85888' }}>{curApplyNum}</NumberText>
        <NumberText style={{ color: 'rgba(67, 67, 67, 0.80)' }}>&nbsp;/ {curNumOfSelection}</NumberText>
        <NumberText2>명 정원</NumberText2>
      </NumberBox>
      <Content>
        {curApplyNum}명의 지원자가 {majorKoreanName}를 지원했어요.
      </Content>
      <UpdateBox style={{ top: '7.21vw' }}>
        <StyledSVG xmlns="http://www.w3.org/2000/svg" width="0.625vw" height="0.59vw" viewBox="0 0 12 12" fill="none">
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

//////////////////////////

const MockApply = ({ curCompetitionRate }: { curCompetitionRate: any }) => {
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

  const [updateTime, setUpdateTime] = useState(formatTimeTo12HourFormat(new Date()));
  const handleClick = () => {
    setUpdateTime(formatTimeTo12HourFormat(new Date()));
  };

  return (
    <MockWrapper>
      <TitleWrapper style={{ top: '0.89vw' }}>
        <TitleText>모의지원 실시간 경쟁률</TitleText>
        <ToolTip05>
          해당 통계는 쿠플라이 서비스를 통해 모은 정보를 바탕으로 한 것으로 실제 통계와 다를 수 있어요.
        </ToolTip05>
        {/* <Information src="designImage/myBoard/InformationCircle.svg" alt="information" />*/}
      </TitleWrapper>
      <Vector src="designImage/myBoard/MajorBoxVector.svg" alt="vector" style={{ top: '2.81vw' }} />
      <NumberBox style={{ top: '3.3vw' }}>
        <NumberText style={{ color: '#D85888' }}>{curCompetitionRate}</NumberText>
        <NumberText style={{ color: 'rgba(67, 67, 67, 0.80)' }}>&nbsp;: 1</NumberText>
      </NumberBox>
      <UpdateBox style={{ top: '5.71vw' }}>
        <StyledSVG xmlns="http://www.w3.org/2000/svg" width="0.625vw" height="0.59vw" viewBox="0 0 12 12" fill="none">
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
  height: 8.91vw;

  flex-shrink: 0;
  border-radius: 0.52vw;
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
  height: 8.12vw;
  flex-shrink: 0;
  border-radius: 0.52vw;
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
    background-image: url('data:image/svg+xml,%0A%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22312%22%20height%3D%22165%22%20viewBox%3D%220%200%20312%20165%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url%28%23filter0_b_338_1497%29%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M302%201.47722e-05C307.523%201.50516e-05%20312%204.0814%20312%209.11604V155.884C312%20160.919%20307.523%20165%20302%20165L9.99999%20165C4.47715%20165%20-1.9015e-07%20160.919%200%20155.884L5.54319e-06%209.11602C5.73334e-06%204.08138%204.47716%20-2.79398e-07%2010%200L302%201.47722e-05Z%22%20fill%3D%22url%28%23paint0_radial_338_1497%29%22%20fill-opacity%3D%220.9%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M302%200.500015C307.291%200.500015%20311.5%204.40008%20311.5%209.11604V155.884C311.5%20160.6%20307.291%20164.5%20302%20164.5L9.99999%20164.5C4.70873%20164.5%200.5%20160.6%200.5%20155.884L0.500006%209.11602C0.500006%204.40007%204.70874%200.5%2010%200.5L302%200.500015Z%22%20stroke%3D%22%23DFDFDF%22/%3E%0A%20%20%3C/g%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_338_1497%22%20x%3D%22-24%22%20y%3D%22-24%22%20width%3D%22360%22%20height%3D%22213%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22/%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2212%22/%3E%0A%20%20%20%20%20%20%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_338_1497%22/%3E%0A%20%20%20%20%20%20%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_338_1497%22%20result%3D%22shape%22/%3E%0A%20%20%20%20%3C/filter%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22paint0_radial_338_1497%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%28-2.45605e-05%202.02275%29%20rotate%2827.5809%29%20scale%28352.002%20445.93%29%22%3E%0A%20%20%20%20%20%20%3Cstop%20stop-color%3D%22white%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%3C/defs%3E%0A%3C/svg%3E%0A');
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

const AlterBox = styled.div`
  position: absolute;
  display: flex;

  top: 0px;
  left: 0px;
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

  margin-left: 0.52vw;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  top: 6.18vw;
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
  height: 0.98vw;

  flex-shrink: 0;
`;

const Vector = styled.img`
  position: absolute;

  flex-shrink: 0;
  width: 16.21vw;
`;

export { Application, MockApply };
