import React, { useState, useEffect, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import ProfileBox from '../../components/myBoard/ProfileBox';
import MajorBox from '../../components/myBoard/MajorBox';
import { Application, MockApply } from '../../components/myBoard/LiveApplicantStatus';
import ThreeYear from '../../components/myBoard/ThreeYearIndicator';
import QuartileIndicator from '../../components/myBoard/QuartileIndicator';
import PieChart from '../../components/myBoard/Graph/PieChart';
import Scatter from '../../components/myBoard/Graph/Scatter';
import InterestMajorButton from '../../assets/myboardpage/InterestMajorButton'; // 1지망 2지망 선택 버튼
import client from '../../utils/HttpClient';
import { recruit } from '../../common/Recruiting'; // 2024-1 아직 갱신 X (몇명 뽑는다는 공지가 없어 아직 반영 X) + 과거데이터 (실제로 몇명 뽑았는지 갱신 X)
import { MajorOptionsKR } from '../../types/MajorTypes';
import { collegeAPIMappingByKR } from '../../utils/Mappings';

const MyBoardPage = () => {
  const [onViewMajor, setOnViewMajor] = useState<number>(1); // (1): 1지망 (2): 2지망
  const onClickInterest1 = useCallback(() => {
    setOnViewMajor(1);
    console.log('1지망 선택');
  }, [onViewMajor]);

  const onClickInterest2 = useCallback(() => {
    setOnViewMajor(2);
    console.log('2지망 선택');
  }, [onViewMajor]);

  const [scrollY, setScrollY] = useState(0); // 배경 이미지 + 프로필 박스 화면 따라오기

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /////////////////////////////
  const [isApplied, setIsApplied] = useState<boolean>(true); // *********************** 개발 위해 잠시 수정 *************************
  const [CurrentPic, setCurrentPic] = useState('');
  const [userData, setUserData] = useState(() => ({
    userName: '고대빵',
    userNickname: '빵대고대빵',
    userProfilePic: CurrentPic,
    userProfileLink: '',
    userRole: 'candidate',
    firstMajor: '미디어학부',
    studentId: '2021160009',
    hopeMajor1: '경영학과',
    hopeMajor2: '컴퓨터학과',
    curGPA: 4.5,
    hopeSemester: '2023-2',
  }));

  const [pastData1, setPastData1] = useState([
    {
      numOfSelection: 10,
      numOfPassed: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 20,
      numOfPassed: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 30,
      numOfPassed: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
  ]);
  const [pastData2, setPastData2] = useState([
    {
      numOfSelection: 40,
      numOfPassed: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 50,
      numOfPassed: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 60,
      numOfPassed: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
  ]);

  // 사용자 희망전공1, 2의 실시간 지원 현황 데이터
  const [curData, setCurData] = useState([
    {
      curNumOfSelection: 10,
      curApplyNum: 0,
      curCompetitionRate: 0,
      fullChartData: [],
      halfChartData: [],
      scatterChartData: [],
    },
    {
      curNumOfSelection: 20,
      curApplyNum: 0,
      curCompetitionRate: 0,
      fullChartData: [],
      halfChartData: [],
      scatterChartData: [],
    },
  ]);

  // 로그인한 유저 정보 localStorage에
  const getMe = async () => {
    try {
      const APIresponse = await client.get('/user/getMe');
      const userInfo = APIresponse.data.data.user;

      setUserData((prevUserData) => ({
        ...prevUserData,
        userName: userInfo.name,
        userNickname: userInfo.nickname,
        userProfilePic: userInfo.profilePic,
        userProfileLink: userInfo.profileLink,
        userRole: userInfo.role,
        firstMajor: userInfo.firstMajor,
        studentId: userInfo.studentId,
        hopeMajor1: userInfo.hopeMajor1,
        hopeMajor2: userInfo.hopeMajor2,
        curGPA: userInfo.curGPA,
        hopeSemester: userInfo.hopeSemester,
      }));
      setCurrentPic(userInfo.profilePic);

      // 학기 별 모집인원 수
      const pastData1Copy = [...pastData1];
      pastData1Copy[0].numOfSelection = recruit[userInfo.hopeMajor1]['2023-2'];
      pastData1Copy[1].numOfSelection = recruit[userInfo.hopeMajor1]['2023-1'];
      pastData1Copy[2].numOfSelection = recruit[userInfo.hopeMajor1]['2022-2'];
      setPastData1(pastData1Copy);

      const pastData2Copy = [...pastData2];
      pastData2Copy[0].numOfSelection = recruit[userInfo.hopeMajor2]['2023-2'];
      pastData2Copy[1].numOfSelection = recruit[userInfo.hopeMajor2]['2023-1'];
      pastData2Copy[2].numOfSelection = recruit[userInfo.hopeMajor2]['2022-2'];
      setPastData2(pastData2Copy);

      const curDataCopy = [...curData];
      curDataCopy[0].curNumOfSelection = recruit[userInfo.hopeMajor1]['2024-1'];
      curDataCopy[1].curNumOfSelection = recruit[userInfo.hopeMajor2]['2024-1'];
      setCurData(curDataCopy);

      // 모의지원 했는지.
      setIsApplied(userInfo.isApplied);

      localStorage.setItem('userProfilePic', userInfo.profilePic);
      localStorage.setItem('userProfileLink', userInfo.profileLink);
      localStorage.setItem('name', userInfo.name);
      localStorage.setItem('nickname', userInfo.nickname);
      localStorage.setItem('phoneNumber', userInfo.phoneNumber);
      localStorage.setItem('studentId', userInfo.studentId);
      localStorage.setItem('firstMajor', userInfo.firstMajor);
      localStorage.setItem('role', userInfo.role);
      if (userInfo.role === 'candidate') {
        localStorage.setItem('hopeMajor1', userInfo.hopeMajor1);
        localStorage.setItem('hopeMajor2', userInfo.hopeMajor2);
        localStorage.setItem('curGPA', userInfo.curGPA.toFixed(2));
        localStorage.setItem('hopeSemester', userInfo.hopeSemester);
        localStorage.setItem('isApplied', userInfo.isApplied);
      } else {
        localStorage.setItem('secondMajor', userInfo.secondMajor);
        localStorage.setItem('passSemester', userInfo.passSemester);
        localStorage.setItem('passGPA', userInfo.passGPA.toFixed(2));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  const getPastData = async () => {
    const semester = ['2023-1', '2022-2', '2022-1'];
    const hopeMajor1 = collegeAPIMappingByKR[userData.hopeMajor1 as MajorOptionsKR];
    let hopeMajor2 = '';
    if (userData.hopeMajor2 !== '희망 없음') {
      hopeMajor2 = collegeAPIMappingByKR[userData.hopeMajor2 as MajorOptionsKR];
    }

    const newPastData1 = [...pastData1];
    for (let i = 0; i < semester.length; i++) {
      try {
        const APIresponse = await client.get(`/pastData/${hopeMajor1}/${semester[i]}`);
        const data = APIresponse.data.pastData;

        let competitionRate = 0;
        if (data.overallData.numberOfData > 0) {
          competitionRate = +(data.overallData.numberOfData / newPastData1[i].numOfSelection).toFixed(2);
        }

        newPastData1[i] = {
          numOfSelection: newPastData1[i].numOfSelection,
          numOfPassed: data.passedData.passedNumberOfData,
          competitionRate: competitionRate,
          meanGpa: data.passedData.passedMeanGPAData.gpa,
          minGpa: data.passedData.passedMinimumGPAData.gpa,
        };
      } catch (err) {
        console.log(err);
      }
    }
    setPastData1(newPastData1);

    if (hopeMajor2) {
      const newPastData2 = [...pastData2];
      for (let i = 0; i < semester.length; i++) {
        try {
          const APIresponse = await client.get(`/pastData/${hopeMajor2}/${semester[i]}`);
          const data = APIresponse.data.pastData;

          let competitionRate = 0;
          if (data.overallData.numberOfData > 0) {
            competitionRate = +(data.overallData.numberOfData / newPastData2[i].numOfSelection).toFixed(2);
          }

          newPastData2[i] = {
            numOfSelection: newPastData2[i].numOfSelection,
            numOfPassed: data.passedData.passedNumberOfData,
            competitionRate: competitionRate,
            meanGpa: data.passedData.passedMeanGPAData.gpa,
            minGpa: data.passedData.passedMinimumGPAData.gpa,
          };
        } catch (err) {
          console.log(err);
        }
      }
      setPastData2(newPastData2);
    }
  };
  useEffect(() => {
    if (userData.hopeMajor1 && userData.hopeMajor2) {
      getPastData();
    }
  }, [userData]);

  const getCurData = async () => {
    try {
      const APIresponse = await client.get('/dashboard/hopeMajorsCurrentInfo');
      const data = APIresponse.data.data;

      const newCurData = [...curData];

      for (let i = 0; i < 2; i++) {
        let curCompetitionRate = 0;
        if (data[i].curApplyNum > 0) {
          curCompetitionRate = +(data[i].curApplyNum / newCurData[i].curNumOfSelection).toFixed(2);
        }

        newCurData[i] = {
          curNumOfSelection: newCurData[i].curNumOfSelection,
          curApplyNum: data[i].curApplyNum,
          curCompetitionRate: curCompetitionRate,
          fullChartData: data[i].fullChartData,
          halfChartData: data[i].halfChartData,
          scatterChartData: data[i].scatterChartData,
        };
      }

      setCurData(newCurData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCurData();
  }, []);

  ////////////////////////////

  return (
    <Wrapper style={{ backgroundPosition: `0 ${scrollY - 200}px` }}>
      {/* <GlobalStyles /> */}
      <ProfileWrapper>
        <ProfileBox userData={userData} />
      </ProfileWrapper>

      <MainWrapper>
        <InterestMajorBox>
          <InterestMajorButton onView={onViewMajor === 1} onClick={onClickInterest1} style={{ zIndex: 2 }} />
          {userData.hopeMajor2 !== '희망 없음' ? (
            <InterestMajorButton onView={onViewMajor === 2} onClick={onClickInterest2} style={{ zIndex: 2 }}>
              2지망
            </InterestMajorButton>
          ) : (
            <></>
          )}
        </InterestMajorBox>
        <div style={{ position: 'relative', display: 'flex', gap: '1.25vw' }}>
          <MajorBox onViewMajor={onViewMajor} userData={userData} />
          <LiveWrapper>
            <Application
              onViewMajor={onViewMajor}
              userData={userData}
              curApplyNum={curData[onViewMajor - 1].curApplyNum}
            />
            <div style={{ marginTop: '0.35vw' }}></div>
            <MockApply curCompetitionRate={curData[onViewMajor - 1].curCompetitionRate} />
          </LiveWrapper>
          <ThreeYear onViewMajor={onViewMajor} userData={userData} pastData1={pastData1} pastData2={pastData2} />
        </div>
        <QuartileIndicator />
        <div style={{ position: 'relative', display: 'flex', gap: '1.25vw' }}>
          <PieChart />
          <Scatter />
        </div>
      </MainWrapper>
    </Wrapper>
  );
};

const GlobalStyles = createGlobalStyle` // 가로 스크롤 숨기기
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  max-width: 1920px;
  overflow-x: hidden;
  //min-height: 200vh;
  max-height: 200vh;

  flex-shrink: 0;
  background: #fefafb;
  //background: black;

  background-image: url('designImage/myBoard/MyBoardBackground.png');
  background-size: 100vw 1027px;
  background-repeat: no-repeat;
  background-position: 0px;

  padding-bottom: 165px;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 6.77vw;
`;

const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  //margin-top: 62.02px;
  margin-left: 5.83vw;
  gap: 1.25vw;
`;

const LiveWrapper = styled.div`
  position: relative;
  row-gap: 0.34vw;

  z-index: 1;
`;

const InterestMajorBox = styled.div`
  display: flex;
  margin-top: 58px;
  gap: 0.9375vw;
`;

export default MyBoardPage;
