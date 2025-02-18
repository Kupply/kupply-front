import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { MajorOptionsKR as MajorOptions } from '../../../mappings/MajorTypes';

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

const MobileApplication = ({
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
  const [updateTime, setUpdateTime] = useState(formatTimeTo12HourFormat(new Date()));
  const handleClick = () => {
    setUpdateTime(formatTimeTo12HourFormat(new Date()));
  };

  const majorKoreanName: MajorOptions = onViewMajor === 1 ? userData.hopeMajor1 : userData.hopeMajor2;

  return (
    <ApplyWrapper>
      <HeadBox>
        <UpdateBox>
          <svg xmlns="http://www.w3.org/2000/svg" width="4.44vw" height="4.44vw" viewBox="0 0 16 16" fill="none">
            <path
              d="M7.99967 7.33333C9.47243 7.33333 10.6663 6.13943 10.6663 4.66667C10.6663 3.19391 9.47243 2 7.99967 2C6.52691 2 5.33301 3.19391 5.33301 4.66667C5.33301 6.13943 6.52691 7.33333 7.99967 7.33333Z"
              fill="#D85888"
              stroke="#D85888"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.3332 13.9997V12.4441C13.3332 11.619 13.0522 10.8277 12.5521 10.2442C12.052 9.66079 11.3737 9.33301 10.6665 9.33301H5.33317C4.62593 9.33301 3.94765 9.66079 3.44755 10.2442C2.94746 10.8277 2.6665 11.619 2.6665 12.4441V13.9997"
              fill="#D85888"
              stroke="#D85888"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <UpdateTitle>{majorKoreanName} 선발 정보</UpdateTitle>
        </UpdateBox>
        <UpdateBox>
          <StyledSVG xmlns="http://www.w3.org/2000/svg" width="3.33vw" height="3.33vw" viewBox="0 0 12 12" fill="none">
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
      </HeadBox>

      <BodyWrapper>
        <TitleWrapper>
          <TitleText>실시간 지원자</TitleText>
        </TitleWrapper>
        <Vector style={{ top: '11.39vw' }} />

        <NumberBox style={{ top: '14.72vw' }}>
          <NumberText style={{ color: '#D85888' }}>{curApplyNum}</NumberText>
          <NumberText style={{ color: 'rgba(67, 67, 67, 0.80)' }}>&nbsp;/ {curNumOfSelection}</NumberText>
          <NumberText2>&nbsp; 명 정원</NumberText2>
        </NumberBox>
        <Content>
          {curApplyNum}명의 지원자가 {majorKoreanName}를 지원했어요.
        </Content>
      </BodyWrapper>
    </ApplyWrapper>
  );
};

//////////////////////////

const MobileMockApply = ({ curCompetitionRate }: { curCompetitionRate: any }) => {
  const [updateTime, setUpdateTime] = useState(formatTimeTo12HourFormat(new Date()));
  const handleClick = () => {
    setUpdateTime(formatTimeTo12HourFormat(new Date()));
  };

  return (
    <MockWrapper>
      <BodyWrapper>
        <TitleWrapper>
          <TitleText>모의지원 실시간 경쟁률</TitleText>
        </TitleWrapper>
        <Vector style={{ top: '11.39vw' }} />

        <NumberBox style={{ top: '16.67vw' }}>
          <NumberText style={{ color: '#D85888' }}>{curCompetitionRate}</NumberText>
          <NumberText style={{ color: 'rgba(67, 67, 67, 0.80)' }}>&nbsp;: 1</NumberText>
        </NumberBox>
      </BodyWrapper>

      <UpdateText2 onClick={handleClick}>{updateTime}</UpdateText2>
    </MockWrapper>
  );
};

const ApplyWrapper = styled.div`
  position: relative;
  width: 91.11vw;
  height: 44.44vw;

  margin-top: 16.67vw;
`;

const MockWrapper = styled.div`
  position: relative;
  width: 91.11vw;
  height: 44.44vw;

  margin-top: 3.89vw;
`;

const HeadBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  width: 91.11vw;
  justify-content: space-between;
`;

const UpdateBox = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  gap: 1.67vw;
`;

const BodyWrapper = styled.div`
  display: flex;
  position: relative;
  width: 91.11vw;
  height: 33.33vw;
  flex-shrink: 0;
  fill: radial-gradient(230.3% 140.56% at 0% 1.23%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  stroke-width: 1px;
  stroke: #dfdfdf;
  backdrop-filter: blur(12px);
  border-radius: 2.78vw;
  border: 1px solid #dfdfdf;

  margin-top: 5vw;
`;

const TitleWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 6.11vw;
  top: 3.33vw;
`;

const NumberBox = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;

  left: 6.11vw;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  top: 25vw;
  left: 6.11vw;

  color: rgba(67, 67, 67, 0.8);
  /* mob_tiny_Regular */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 13.2px */
`;

///////////////// text /////////////////
const UpdateTitle = styled.text`
  color: #141414;

  /* mob_body_Bold */
  font-family: Pretendard;
  font-size: 5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
`;

const UpdateText = styled.text`
  color: #a8a8a8;

  /* detail_Regular */
  font-family: Pretendard;
  font-size: 3.33vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
`;

const UpdateText2 = styled.text`
  color: transparent;

  /* detail_Regular */
  font-family: Pretendard;
  font-size: 0;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
`;

const TitleText = styled.text`
  color: #141414;

  /* mob_detail_Medium */
  font-family: Pretendard;
  font-size: 3.89vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
`;

const NumberText = styled.text`
  /* mob_head1_bold */
  font-family: Pretendard;
  font-size: 8.33vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

const NumberText2 = styled.text`
  color: var(--Black2, #434343);

  /* normal_Medium */
  font-family: Pretendard;
  font-size: 4.44vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
  opacity: 0.8;
`;
///////////////// image /////////////////

const StyledSVG = styled.svg`
  &:hover {
    cursor: pointer;
  }
`;

const Vector = styled.div`
  position: absolute;
  width: 91.11vw;
  height: 0px;
  flex-shrink: 0;
  stroke-width: 1px;
  color: #dfdfdf;
  z-index: 1;

  border: 1px solid #dfdfdf;
`;

export { MobileApplication, MobileMockApply };
