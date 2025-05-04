import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import ProfileBox from '../../components/myBoard/ProfileBox';
import MajorBox from '../../components/myBoard/MajorBox';
import { Application, MockApply } from '../../components/myBoard/LiveApplicantStatus';
import ThreeYear from '../../components/myBoard/ThreeYearIndicator';
import QuartileIndicator from '../../components/myBoard/QuartileIndicator';
import PieChart from '../../components/myBoard/Graph/PieChart';
import Scatter from '../../components/myBoard/Graph/Scatter';
import InterestMajorButton from '../../assets/myboardpage/InterestMajorButton'; // 1지망 2지망 선택 버튼
import MyboardPasserPageVer from './MyboardPasser';
import { client } from '../../utils/HttpClient';
import { recruit } from '../../mappings/Recruiting'; // 2024-1 아직 갱신 X (몇명 뽑는다는 공지가 없어 아직 반영 X) + 과거데이터 (실제로 몇명 뽑았는지 갱신 X)
import { MajorOptionsKR } from '../../mappings/MajorTypes';
import { majorAPIMappingByKR } from '../../mappings/Mappings';
import { LastThreeSemesters } from '../../common/LastThreeSemesters';
import { LastFourSameSemesters } from '../../common/LastFourSameSemesters';

const MyBoardPage = () => {
  const [onViewMajor, setOnViewMajor] = useState<number>(1); // (1): 1지망 (2): 2지망
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [isOpenAppModal, setOpenAppModal] = useState(false);

  const onClickInterest1 = useCallback(() => {
    setOnViewMajor(1);
    console.log('1지망 선택');
  }, [onViewMajor]);

  const onClickInterest2 = useCallback(() => {
    setOnViewMajor(2);
    console.log('2지망 선택');
  }, [onViewMajor]);

  const [scrollY, setScrollY] = useState(window.scrollY + 20); // 배경 이미지 + 프로필 박스 화면 따라오기

  const onClickEditModal = () => {
    setOpenEditModal(true);
  };

  const onClickAppModal = () => {
    setOpenAppModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  const closeAppModal = () => {
    setOpenAppModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      let newPositionY = window.scrollY + 20;
      if (newPositionY < 0) {
        newPositionY = 0;
      }
      if (newPositionY > 850) {
        newPositionY = 800;
      }
      setScrollY(newPositionY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /////////////////////////////
  const [isApplied, setIsApplied] = useState<boolean>(false); // *********************** 개발 위해 잠시 수정 *************************
  const [CurrentPic, setCurrentPic] = useState('');

  // onClick 이벤트가 아닌, 사용자 모의지원 완료 여부에 따라 IsApplied 값이 바뀌도록 수정해야 한다.
  const onClickApplication = useCallback(() => {
    setIsApplied(true);
    console.log('모의지원 완료');
  }, [isApplied]);

  const [userData, setUserData] = useState(() => ({
    userName: '',
    userNickname: '',
    userProfilePic: 'rectProfile1',
    userProfileLink: '',
    userRole: 'candidate',
    firstMajor: '',
    studentId: '',
    hopeMajor1: '경영학과',
    hopeMajor2: '컴퓨터학과',
    curGPA: 4.5,
    hopeSemester: '2023-2',
  }));

  const [pastData1, setPastData1] = useState([
    {
      numOfSelection: 10,
      numOfPassed: 5,
      numOfApplied: 0,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 20,
      numOfPassed: 5,
      numOfApplied: 0,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 30,
      numOfPassed: 5,
      numOfApplied: 0,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
  ]);
  const [pastData2, setPastData2] = useState([
    {
      numOfSelection: 40,
      numOfPassed: 5,
      numOfApplied: 0,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 50,
      numOfPassed: 5,
      numOfApplied: 0,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 60,
      numOfPassed: 5,
      numOfApplied: 0,
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

  const [myStageData, setMyStageData] = useState([
    {
      majorName: '',
      recruitNum: 0,
      applyNum: 0,
      rank: 0,
    },
    {
      majorName: '',
      recruitNum: 0,
      applyNum: 0,
      rank: 0,
    },
  ]);

  const [isLogined, setisLogined] = useState<boolean>(false);
  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);
  // 로그인한 유저 정보 localStorage에
  const getMe = async () => {
    try {
      const APIresponse = await client.get('/user/getMe');
      const userInfo = APIresponse.data.data.user;

      // Fetch the last three semesters dynamically
      const lastThreeSemesters = LastThreeSemesters;

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
      pastData1Copy[0].numOfSelection = recruit[userInfo.hopeMajor1][lastThreeSemesters[0]];
      pastData1Copy[1].numOfSelection = recruit[userInfo.hopeMajor1][lastThreeSemesters[1]];
      pastData1Copy[2].numOfSelection = recruit[userInfo.hopeMajor1][lastThreeSemesters[2]];
      setPastData1(pastData1Copy);

      const pastData2Copy = [...pastData2];
      pastData2Copy[0].numOfSelection = recruit[userInfo.hopeMajor2][lastThreeSemesters[0]];
      pastData2Copy[1].numOfSelection = recruit[userInfo.hopeMajor2][lastThreeSemesters[1]];
      pastData2Copy[2].numOfSelection = recruit[userInfo.hopeMajor2][lastThreeSemesters[2]];
      setPastData2(pastData2Copy);

      const curDataCopy = [...curData];
      const lastFourSameSemesters = LastFourSameSemesters;
      const hopeMajor1LastFourRecruitNum = lastFourSameSemesters.map((semester) => {
        return recruit[userInfo.hopeMajor1][semester];
      });
      const hopeMajor2LastFourRecruitNum = lastFourSameSemesters.map((semester) => {
        return recruit[userInfo.hopeMajor2][semester];
      });

      curDataCopy[0].curNumOfSelection = Math.floor(
        hopeMajor1LastFourRecruitNum
          .sort((a, b) => a - b)
          .slice(1, 3)
          .reduce((a, b) => a + b) / 2,
      );
      curDataCopy[1].curNumOfSelection = Math.floor(
        hopeMajor2LastFourRecruitNum
          .sort((a, b) => a - b)
          .slice(1, 3)
          .reduce((a, b) => a + b) / 2,
      );
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
      localStorage.setItem('email', userInfo.email);
      localStorage.setItem('campus', userInfo.campus);
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
    if (isLogined) getMe();
  }, [isLogined]);

  const getPastData = async () => {
    // const semester = ['2023-2', '2023-1', '2022-2'];
    const semester = LastThreeSemesters; // Fetch last three semesters dynamically
    const hopeMajor1 = majorAPIMappingByKR[userData.hopeMajor1 as MajorOptionsKR];
    let hopeMajor2 = '';
    if (userData.hopeMajor2 !== '희망 없음') {
      hopeMajor2 = majorAPIMappingByKR[userData.hopeMajor2 as MajorOptionsKR];
    }

    const newPastData1 = [...pastData1];
    for (let i = 0; i < semester.length; i++) {
      try {
        const APIresponse = await client.get(`/pastData/${hopeMajor1}/${semester[i]}`);
        const { metadata, _ } = APIresponse.data.pastData;

        let competitionRate = 0;
        if (metadata.recruitNumber > 0) {
          competitionRate = +(metadata.appliedNumber / metadata.recruitNumber).toFixed(2);
        }

        newPastData1[i] = {
          numOfSelection: metadata.recruitNumber,
          numOfPassed: metadata.passedNumber,
          numOfApplied: metadata.appliedNumber,
          competitionRate: competitionRate,
          meanGpa: metadata.passedAvgGPAData.gpa,
          minGpa: metadata.passedMinimumGPAData.gpa,
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
          const { metadata, _ } = APIresponse.data.pastData;

          let competitionRate = 0;
          if (metadata.recruitNumber > 0) {
            competitionRate = +(metadata.appliedNumber / metadata.recruitNumber).toFixed(2);
          }

          newPastData2[i] = {
            numOfSelection: metadata.recruitNumber,
            numOfPassed: metadata.passedNumber,
            numOfApplied: metadata.appliedNumber,
            competitionRate: competitionRate,
            meanGpa: metadata.passedAvgGPAData.gpa,
            minGpa: metadata.passedMinimumGPAData.gpa,
          };
        } catch (err) {
          console.log(err);
        }
      }
      setPastData2(newPastData2);
    }
  };

  const getMyStageData = async () => {
    const APIresponse = await client.get('/dashboard/myStage');
    const data = APIresponse.data.data;

    // Get the last three semesters dynamically
    const semester = LastThreeSemesters;

    if (userData.hopeMajor1 && userData.hopeMajor2) {
      setMyStageData([
        {
          majorName: userData.hopeMajor1,
          recruitNum: recruit[userData.hopeMajor1][semester[0]] || 0, // Fetch for the latest semester dynamically
          applyNum: data[0].applyNum,
          rank: data[0].rank,
        },
        {
          majorName: userData.hopeMajor2,
          recruitNum: recruit[userData.hopeMajor2][semester[0]] || 0,
          applyNum: data[1].applyNum,
          rank: data[1].rank,
        },
      ]);
    }
  };

  useEffect(() => {
    if (isLogined) {
      try {
        if (userData.hopeMajor1 && userData.hopeMajor2) {
          getPastData();
        }
        getMyStageData();
        getCurData();
      } catch (err) {
        console.log(err);
      }
    }
  }, [userData, isLogined]);

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

  ////////////////////////////

  return (
    <>
      {userData.userRole === 'passer' ? (
        <MyboardPasserPageVer />
      ) : (
        <Wrapper style={{ backgroundPosition: `0 ${scrollY - 100}px` }}>
          <ProfileWrapper style={{ backgroundPosition: `0 ${scrollY - 200}px` }}>
            <ProfileBox
              userData={userData}
              isApplied={isApplied}
              isOpenEditModal={isOpenEditModal}
              setOpenEditModal={setOpenEditModal}
              closeEditModal={closeEditModal}
              onClickEditModal={onClickEditModal}
              isOpenAppModal={isOpenAppModal}
              setOpenAppModal={setOpenAppModal}
              closeAppModal={closeAppModal}
              onClickAppModal={onClickAppModal}
            />
          </ProfileWrapper>
          {/* {(isOpenAppModal || isOpenEditModal) && <Backdrop />} */}

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
                  curNumOfSelection={curData[onViewMajor - 1].curNumOfSelection}
                />
                <div style={{ marginTop: '0.35vw' }}></div>
                <MockApply curCompetitionRate={curData[onViewMajor - 1].curCompetitionRate} />
              </LiveWrapper>
              <ThreeYear onViewMajor={onViewMajor} userData={userData} pastData1={pastData1} pastData2={pastData2} />
            </div>
            <QuartileIndicator onViewMajor={onViewMajor} myStageData={myStageData} isApplied={isApplied} />
            {isApplied && (
              <div style={{ position: 'relative', display: 'flex', gap: '1.25vw' }}>
                <PieChart onViewMajor={onViewMajor} curData={curData} isApplied={isApplied} />
                <Scatter onViewMajor={onViewMajor} curData={curData} isApplied={isApplied} />
              </div>
            )}
          </MainWrapper>
        </Wrapper>
      )}
    </>
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

  width: 100vw;

  overflow-x: hidden;
  //min-height: 200vh;
  overflow-y: hidden;

  flex-shrink: 0;
  background: #fefafb;
  //background: black;

  background-image: url('designImage/myBoard/MyBoardBackground.png');
  background-size: 100vw;
  background-repeat: no-repeat;
  background-position: 0px -100px;
  padding-bottom: 165px;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 6.77vw;
  z-index: 100;
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

const BlurWrapper = styled.div`
  position: relative;

  width: 500px;
  height: 500px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  background: rgba(248, 248, 248, 0.45);

  z-index: 1000;
`;

const Backdrop = styled.div`
  width: 100%; // 100vw;
  height: 100%; // 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 4;
  background: rgba(20, 16, 19, 0.55);
`;

export default MyBoardPage;
