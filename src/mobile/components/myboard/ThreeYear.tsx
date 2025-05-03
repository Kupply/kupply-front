import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import MobileTabMenuButton from '../../assets/tabMenu/TabMenu';
import { useNavigate } from 'react-router-dom';
import { MajorOptionsKR as MajorOptions } from '../../../mappings/MajorTypes';
import { collegeNameMappingByKR as collegeAPIMapping } from '../../../mappings/Mappings';
import { majorNameMapping } from '../../../mappings/Mappings';
import { LastThreeSemesters } from '../../../common/LastThreeSemesters';
interface SemesterBtnStates {
  [key: string]: boolean;
  // Use an index signature to allow dynamic keys
}

const MobileThreeYear = ({
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
        <Icon src="designImage/mobile/myboard/ThreeYear.svg" alt="Icon" />
        <TitleText>지난 합격지표</TitleText>
      </TitleBox>

      <BodyBox>
        <EachYearHeadBox>
          {semesters.map((semester) => (
            <MobileTabMenuButton
              key={semester}
              isClicked={semesterBtnStates[semester]}
              onClick={() => handleSemesterBtnClick(semester)}
            >
              {semester}R
            </MobileTabMenuButton>
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
            <Arrow src="designImage/mobile/myboard/Arrow.svg" alt="arrow" />
          </button>
        </Text1Box>

        <Text2 style={{ position: 'absolute', top: '36.11vw', left: '5vw' }}>선발인원</Text2>
        <Text3 style={{ position: 'absolute', top: '41.94vw', left: '5vw' }}>{selectedPastData.numOfSelection}명</Text3>
        <Text2 style={{ position: 'absolute', top: '36.11vw', left: '52.22vw' }}>합격률</Text2>
        <Text3 style={{ position: 'absolute', top: '41.11vw', left: '52.22vw' }}>
          {selectedPastData.numOfApplied === 0
            ? '집계불가'
            : +((selectedPastData.numOfPassed / selectedPastData.numOfApplied) * 100).toFixed(2) + '%'}
        </Text3>
        <Text2 style={{ position: 'absolute', top: '51.94vw', left: '5vw' }}>합격자 학점 평균값</Text2>
        <Text3 style={{ position: 'absolute', top: '57.22vw', left: '5vw' }}>
          {selectedPastData.meanGpa.toFixed(2)}
        </Text3>
        <Text2 style={{ position: 'absolute', top: '51.94vw', left: '52.22vw' }}>합격자 학점 최저값</Text2>
        <Text3 style={{ position: 'absolute', top: '57.22vw', left: '52.22vw' }}>
          {selectedPastData.minGpa.toFixed(2)}
        </Text3>
        <Text4>
          해당 통계는 쿠플라이 서비스를 통해 모은 정보를 바탕으로 한 것으로 <br /> 실제 통계와 다를 수 있어요.
          <br /> (합격률은 해당 학기에 쿠플라이에서 모의 지원한 회원들의 합격률로, <br />
          실제 합격률과는 다를 수 있어요.)
        </Text4>
      </BodyBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 91.11vw;
  height: 86.67vw;

  margin-top: 16.67vw;
`;

const BodyBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  width: 91.11vw;
  height: 69.44vw;
  flex-shrink: 0;
  border-radius: 2.78vw;
  border: 1px solid #dfdfdf;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;

  gap: 1.67vw;
  margin-bottom: 2.5vw;
`;

const EachYearHeadBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82.22vw;
  height: 12.22vw;
  flex-shrink: 0;

  border-radius: 1.39vw;
  border: 1px solid #eee;
  box-shadow: 0px 1.465px 73.252px 0px rgba(20, 20, 20, 0.05);

  top: 4.44vw;
`;

const Text1Box = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 22.5vw;
  left: 4.44vw;

  gap: 1.67vw;
`;

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;

  /* mob_body_Bold */
  font-family: Pretendard;
  font-size: 5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
`;

const Text1 = styled.div`
  color: #141414;

  /* BODY TEXT_Medium */
  font-family: Pretendard;
  font-size: 3.88vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 24px */
`;

const Text2 = styled.div`
  position: absolute;

  color: rgba(20, 20, 20, 0.7);
  text-align: center;
  font-family: Pretendard;
  font-size: 3.61vw;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 107.692% */
`;

const Text3 = styled.div`
  position: absolute;

  /* mob_title3_Bold */
  font-family: Pretendard;
  font-size: 5.56vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const Text4 = styled.div`
  position: absolute;
  top: 74.44vw;
  left: 0;

  color: #a8a8a8;

  /* mob_tiny_Regular */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 13.2px */
`;

///////////////// image /////////////////

const Icon = styled.img`
  position: relative;
  display: flex;

  width: 4.44vw;
  height: 4.44vw;
`;

const Arrow = styled.img`
  display: flex;
  width: 3.33vw;
  height: 3.33vw;

  flex-shrink: 0;
`;

export default MobileThreeYear;
