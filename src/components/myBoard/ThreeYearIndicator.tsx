import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { MajorOptionsKR as MajorOptions } from '../../mappings/MajorTypes';
import { collegeNameMappingByKR as collegeAPIMapping } from '../../mappings/Mappings';
import { majorNameMapping } from '../../mappings/Mappings';
import SemesterButton from '../../assets/tabMenu/TabMenu02';
import { LastThreeSemesters } from '../../common/LastThreeSemesters';
import ToolTip02 from '../../assets/toolTips/Tooltip02';
interface SemesterBtnStates {
  [key: string]: boolean;
  // Use an index signature to allow dynamic keys
}

const ThreeYear = ({
  onViewMajor,
  userData,
  pastData1,
  pastData2,
}: {
  onViewMajor: number;
  userData: any;
  pastData1: any[];
  pastData2: any[];
}) => {
  const [hover, setHover] = useState(false);
  const [svgHover, setSvgHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onHoverOut = () => {
    setHover(false);
  };

  const onSvgHover = () => {
    setSvgHover(true);
  };

  const onSvgHoverOut = () => {
    setSvgHover(false);
  };

  const semesters = LastThreeSemesters;

  let initialState: SemesterBtnStates = {};
  semesters.forEach((semester, index) => {
    initialState[semester] = index === 0;
    // set true for the first semester, false for others
  });

  const [semesterBtnStates, setSemesterBtnStates] = React.useState<SemesterBtnStates>(initialState);
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

  const navigate = useNavigate();
  const majorKoreanName: MajorOptions = onViewMajor === 1 ? userData.hopeMajor1 : userData.hopeMajor2;

  const getSemesterLabel = (semesterKey: string) => {
    return semesterKey.replace(/(\d{4})-(\d)/, '$1-$2');
  };

  const handleSemesterBtnClick = (buttonName: string) => {
    const updatedBtnStates: SemesterBtnStates = { ...semesterBtnStates };
    Object.keys(semesterBtnStates).forEach((key) => {
      updatedBtnStates[key] = key === buttonName;
    });
    setSemesterBtnStates(updatedBtnStates);

    // Finding the index safely assuming all keys are valid and are from `semesters`
    const index = semesters.indexOf(buttonName);
    if (index !== -1) {
      setSelectedSemesterIndex(index);
    }
  };

  const selectedPastData = onViewMajor === 1 ? pastData1[selectedSemesterIndex] : pastData2[selectedSemesterIndex];

  return (
    <Wrapper>
      <TitleBox>
        <TitleText>지난 합격지표</TitleText>
      </TitleBox>
      <StyleSvg xmlns="http://www.w3.org/2000/svg" width="21.98vw" height="2" viewBox="0 0 422 2" fill="none">
        <path d="M0 1L422 0.999963" stroke="#DFDFDF" />
      </StyleSvg>
      <EachYearHeadBox>
        {semesters.map((semester) => (
          <SemesterButton
            key={semester}
            isClicked={semesterBtnStates[semester]}
            onClick={() => handleSemesterBtnClick(semester)}
          >
            {semester}R
          </SemesterButton>
        ))}
      </EachYearHeadBox>

      <Text1Box>
        <Text1>
          {getSemesterLabel(semesters[selectedSemesterIndex])}R {majorKoreanName} 선발정보
        </Text1>
        <button
          onClick={() => {
            navigate('/archive/' + collegeAPIMapping[majorKoreanName as MajorOptions]);
          }}
        >
          <Arrow src="designImage/myBoard/RightArrow.svg" alt="arrow" />
        </button>
      </Text1Box>

      <Text2 style={{ position: 'absolute', top: '8.56vw', left: '2.5vw' }}>선발인원</Text2>
      <Text3 style={{ position: 'absolute', top: '9.74vw', left: '2.5vw' }}>{selectedPastData.numOfSelection}명</Text3>
      <Text2 style={{ position: 'absolute', top: '8.56vw', left: '12.14vw' }}>합격률</Text2>
      <ToolTip02
        onMouseEnter={onSvgHover}
        onMouseLeave={onSvgHoverOut}
        hoverState={svgHover}
        style={{ position: 'absolute', top: '8.40vw', left: '14.30vw' }}
      >
        해당 학기에 쿠플라이에서 <br /> 모의지원한 회원들의 합격률로, <br /> 실제 합격률과는 다를 수 있어요.
      </ToolTip02>
      <Text3 style={{ position: 'absolute', top: '9.74vw', left: '12.14vw' }}>
        {selectedPastData.numOfApplied === 0
          ? '집계불가'
          : +((selectedPastData.numOfPassed / selectedPastData.numOfApplied) * 100).toFixed(2) + '%'}
      </Text3>
      <Text2 style={{ position: 'absolute', top: '11.81vw', left: '2.5vw' }}>합격자 학점 평균값</Text2>
      <Text3 style={{ position: 'absolute', top: '12.99vw', left: '2.5vw' }}>
        {selectedPastData.meanGpa.toFixed(2)}
      </Text3>
      <Text2 style={{ position: 'absolute', top: '11.81vw', left: '12.14vw' }}>합격자 학점 최저값</Text2>
      <Text3 style={{ position: 'absolute', top: '12.99vw', left: '12.14vw' }}>
        {selectedPastData.minGpa.toFixed(2)}
      </Text3>
      <Text4>
        해당 통계는 쿠플라이 서비스를 통해 모은 정보를 바탕으로 한 것으로 <br /> 실제 통계와 다를 수 있어요.
      </Text4>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 22.08vw;
  height: 17.37vw;
  flex-shrink: 0;
  border-radius: 0.52vw;
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
    background-image: url('data:image/svg+xml,%0A%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22424%22%20height%3D%22353%22%20viewBox%3D%220%200%20424%20353%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url%28%23filter0_b_318_1187%29%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M10%202.65413e-05C4.47715%202.69041e-05%20-1.60625e-07%204.47718%200%2010L9.68486e-06%20343C9.84549e-06%20348.523%204.47716%20353%2010%20353L414%20353C419.523%20353%20424%20348.523%20424%20343V10C424%204.47715%20419.523%20-3.6283e-07%20414%200L10%202.65413e-05Z%22%20fill%3D%22url%28%23paint0_radial_318_1187%29%22%20fill-opacity%3D%220.9%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0.5%2010C0.5%204.75332%204.75329%200.500027%2010%200.500027L414%200.5C419.247%200.5%20423.5%204.75329%20423.5%2010V343C423.5%20348.247%20419.247%20352.5%20414%20352.5L10%20352.5C4.75331%20352.5%200.50001%20348.247%200.50001%20343L0.5%2010Z%22%20stroke%3D%22%23DFDFDF%22/%3E%0A%20%20%3C/g%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_318_1187%22%20x%3D%22-24%22%20y%3D%22-24%22%20width%3D%22472%22%20height%3D%22401%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22/%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2212%22/%3E%0A%20%20%20%20%20%20%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_318_1187%22/%3E%0A%20%20%20%20%20%20%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_318_1187%22%20result%3D%22shape%22/%3E%0A%20%20%20%20%3C/filter%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22paint0_radial_318_1187%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%28-3.33771e-05%204.32746%29%20rotate%2839.4319%29%20scale%28548.952%20831.342%29%22%3E%0A%20%20%20%20%20%20%3Cstop%20stop-color%3D%22white%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%3C/defs%3E%0A%3C/svg%3E%0A');
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
  top: 6vw; // top: 6.59vw;
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
