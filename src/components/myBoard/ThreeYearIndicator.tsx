import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { MajorOptionsKR as MajorOptions } from '../../types/MajorTypes';
import SemesterButton from '../../assets/tabMenu/TabMenu02';

import { collegeAPIMappingByKR as collegeAPIMapping } from '../../utils/Mappings';

// 하드코딩
// tapmenu02 부모 컨포넌트에 따라 크기 조정되게 변경해야 됨

const ThreeYear = () => {
  const navigate = useNavigate();
  const [CurrentPic, setCurrentPic] = useState('');
  const [userData, setUserData] = useState({
    userName: '',
    userNickname: '',
    userProfilePic: CurrentPic,
    userProfileLink: '',
    userRole: '',
    firstMajor: '',
    studentId: '',
    hopeMajor1: '',
    hopeMajor2: '',
    curGPA: 0,
    hopeSemester: '',
  });

  interface SemesterBtnStates {
    '2023-1R': boolean;
    '2022-2R': boolean;
    '2022-1R': boolean;
  }

  const [semesterBtnStates, setSemesterBtnStates] = useState<SemesterBtnStates>({
    '2023-1R': true,
    '2022-2R': false,
    '2022-1R': false,
  });

  const handleSemesterBtnClick = (buttonName: keyof SemesterBtnStates) => {
    // Create a new object with updated isClicked values
    const updatedBtnStates: SemesterBtnStates = { ...semesterBtnStates };
    for (const key in semesterBtnStates) {
      updatedBtnStates[key as keyof SemesterBtnStates] = key === buttonName;
    }
    setSemesterBtnStates(updatedBtnStates);
  };

  return (
    <Wrapper>
      <TitleBox>
        <TitleText>3개년 합격지표</TitleText>
      </TitleBox>
      <StyleSvg xmlns="http://www.w3.org/2000/svg" width="21.98vw" height="2" viewBox="0 0 422 2" fill="none">
        <path d="M0 1L422 0.999963" stroke="#DFDFDF" />
      </StyleSvg>
      <EachYearHeadBox>
        <SemesterButton isClicked={semesterBtnStates['2023-1R']} onClick={() => handleSemesterBtnClick('2023-1R')}>
          2023-1R
        </SemesterButton>
        <SemesterButton isClicked={semesterBtnStates['2022-2R']} onClick={() => handleSemesterBtnClick('2022-2R')}>
          2022-2R
        </SemesterButton>
        <SemesterButton isClicked={semesterBtnStates['2022-1R']} onClick={() => handleSemesterBtnClick('2022-1R')}>
          2022-1R
        </SemesterButton>
      </EachYearHeadBox>

      <Text1Box>
        <Text1>
          {semesterBtnStates['2023-1R'] ? '2023-1' : semesterBtnStates['2022-2R'] ? '2022-2' : '2022-1'}R{' '}
          {userData.hopeMajor1} 모집정보{' '}
        </Text1>
        <button
          onClick={() => {
            navigate('/archive/' + collegeAPIMapping[userData.hopeMajor1 as MajorOptions]);
          }}
        >
          <Arrow src="designImage/myBoard/RightArrow.svg" alt="arrow" />
        </button>
      </Text1Box>

      <Text2 style={{ position: 'absolute', top: '8.56vw', left: '2.5vw' }}>
        {semesterBtnStates['2023-1R'] ? '23-1' : semesterBtnStates['2022-2R'] ? '22-2' : '22-1'} 선발 인원
      </Text2>
      <Text3 style={{ position: 'absolute', top: '9.74vw', left: '2.5vw' }}>25명</Text3>
      <Text2 style={{ position: 'absolute', top: '8.56vw', left: '12.14vw' }}>경쟁률</Text2>
      <Text3 style={{ position: 'absolute', top: '9.74vw', left: '12.14vw' }}>3.59 : 1</Text3>
      <Text2 style={{ position: 'absolute', top: '11.81vw', left: '2.5vw' }}>합격자 평균 학점</Text2>
      <Text3 style={{ position: 'absolute', top: '12.99vw', left: '2.5vw' }}>4.23</Text3>
      <Text2 style={{ position: 'absolute', top: '11.81vw', left: '12.14vw' }}>합격자 최저 학점</Text2>
      <Text3 style={{ position: 'absolute', top: '12.99vw', left: '12.14vw' }}>4.12</Text3>
      <Text4>설문조사를 통해 제공되는 자체 통계로 실제 통계와 상이할 수 있습니다.</Text4>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 22.08vw;
  height: 17.37vw;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  backdrop-filter: blur(12px);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="424" height="353" viewBox="0 0 424 353" fill="none"%3E%3Cg filter="url(%23filter0_b_318_1187)"%3E%3Cpath d="M10 2.65413e-05C4.47715 2.69041e-05 -1.60625e-07 4.47718 0 10L9.68486e-06 343C9.84549e-06 348.523 4.47716 353 10 353L414 353C419.523 353 424 348.523 424 343V10C424 4.47715 419.523 -3.6283e-07 414 0L10 2.65413e-05Z" fill="url(%23paint0_radial_318_1187)" fill-opacity="0.9"/%3E%3Cpath d="M0.5 10C0.5 4.75332 4.75329 0.500027 10 0.500027L414 0.5C419.247 0.5 423.5 4.75329 423.5 10V343C423.5 348.247 419.247 352.5 414 352.5L10 352.5C4.75331 352.5 0.50001 348.247 0.50001 343L0.5 10Z" stroke="%23DFDFDF"/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id="filter0_b_318_1187" x="-24" y="-24" width="472" height="401" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"%3E%3CfeFlood flood-opacity="0" result="BackgroundImageFix"/%3E%3CfeGaussianBlur in="BackgroundImageFix" stdDeviation="12"/%3E%3CfeComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_318_1187"/%3E%3CfeBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_318_1187" result="shape"/%3E%3C/filter%3E%3CradialGradient id="paint0_radial_318_1187" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(424 4.32745) rotate(140.568) scale(548.952 831.341)"%3E%3Cstop stop-color="white"/%3E%3Cstop offset="1" stop-color="white" stop-opacity="0"/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E');
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(8px);
  }
`;

const TitleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  top: 1.05vw;
  left: 2.08vw;
`;

const EachYearHeadBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18.85vw;
  height: 2.17vw;
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: 0px 2.911px 145.528px 0px rgba(20, 20, 20, 0.05);

  top: 3.54vw;
  left: 1.61vw;
`;

const Text1Box = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 6.59vw;
  left: 2.5vw;
`;

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;

  /* BODY TEXT_Bold */
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const Text1 = styled.div`
  color: #141414;

  /* BODY TEXT_Medium */
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 24px */
`;

const Text2 = styled.div`
  position: absolute;

  color: rgba(20, 20, 20, 0.6);

  /* normal_Medium */
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
`;

const Text3 = styled.div`
  position: absolute;

  color: #141414;

  /* subtitle_Bold */
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 28.8px */
`;

const Text4 = styled.div`
  position: absolute;
  top: 15.26vw;
  left: 2.5vw;

  color: var(--A8_Grey-4, #a8a8a8);

  /* detail_Regular */
  font-family: Pretendard;
  font-size: 0.625vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 14.4px */
`;

///////////////// image /////////////////

const StyleSvg = styled.svg`
  position: absolute;
  top: 3.05vw;
`;

const Arrow = styled.img`
  display: flex;
  width: 2.6vw;
  height: 2.46vw;

  flex-shrink: 0;
`;

export default ThreeYear;
