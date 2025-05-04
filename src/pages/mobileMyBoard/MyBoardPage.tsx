import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import MobileMyboardPasser from './MobileMyboardPasser';
import MobileProfile from '../../mobile/components/myboard/Profile';
import { MobileTabMenu02_1, MobileTabMenu02_2 } from '../../mobile/assets/tabMenu/TabMenu02';
import MyboardBanner from '../../mobile/components/myboard/Banner';
import { MobileApplication, MobileMockApply } from '../../mobile/components/myboard/Information';
import MobileThreeYear from '../../mobile/components/myboard/ThreeYear';
import MobileQuartileIndicator from '../../mobile/components/myboard/QuartileIndicator';
import MobileScatter from '../../mobile/components/myboard/Scatter';
import MobilePieChart from '../../mobile/components/myboard/PieChart';
import { client } from '../../utils/HttpClient';
import { recruit } from '../../mappings/Recruiting';
import { MajorOptionsKR } from '../../mappings/MajorTypes';
import { majorAPIMappingByKR } from '../../mappings/Mappings';
import MobileHeader from '../../mobile/assets/base/Header';
import MobileFooter from '../../mobile/assets/base/Footer';
import { LastThreeSemesters } from '../../common/LastThreeSemesters';
import { LastFourSameSemesters } from '../../common/LastFourSameSemesters';

const MobileMyBoard = () => {
  const [onViewMajor, setOnViewMajor] = useState<number>(1); // (1): 1지망 (2): 2지망

  const handleViewChange = useCallback((newView: any) => {
    setOnViewMajor(newView);
  }, []);

  /////////////////////////////
  const [isApplied, setIsApplied] = useState<boolean>(false); // *********************** 개발 위해 잠시 수정 *************************
  const [CurrentPic, setCurrentPic] = useState('');
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [isOpenAppModal, setOpenAppModal] = useState(false);

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

  const [isLogined, setisLogined] = useState<boolean>(false); // 개발 동안은 로그인 상태 유지
  //const [selected, setSelected] = useState(0);

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

  useEffect(() => {
    if (isLogined) getMe();
  }, [isLogined]);

  return (
    <>
      {userData.userRole === 'passer' ? (
        <>
          <MobileMyboardPasser />
        </>
      ) : (
        <MobilePageWrapper style={{ marginTop: '23.33vw' }}>
          <MobileHeader logined={isLogined} setLogin={setisLogined} />
          <MobileProfile
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
          <MiddleVector />
          {userData.hopeMajor2 !== '희망 없음' ? (
            <MobileTabMenu02_1 onViewMajor={onViewMajor} onViewChange={handleViewChange} />
          ) : (
            <MobileTabMenu02_2 onViewMajor={onViewMajor} onViewChange={handleViewChange} />
          )}

          <MyboardBanner onViewMajor={onViewMajor} userData={userData} />
          <MobileApplication
            onViewMajor={onViewMajor}
            userData={userData}
            curApplyNum={curData[onViewMajor - 1].curApplyNum}
            curNumOfSelection={curData[onViewMajor - 1].curNumOfSelection}
          />
          <MobileMockApply curCompetitionRate={curData[onViewMajor - 1].curCompetitionRate} />
          <MobileThreeYear onViewMajor={onViewMajor} userData={userData} pastData1={pastData1} pastData2={pastData2} />
          <MobileQuartileIndicator
            userData={userData}
            onViewMajor={onViewMajor}
            myStageData={myStageData[onViewMajor - 1]}
            isApplied={isApplied}
          />
          <MobilePieChart onViewMajor={onViewMajor} curData={curData} isApplied={isApplied} />
          <MobileScatter onViewMajor={onViewMajor} curData={curData} isApplied={isApplied} />
          <MobileFooter />
        </MobilePageWrapper>
      )}
    </>
  );
};

const MobilePageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  background: #f8f8f8;
  width: 100%;
  height: auto;
`;

const MiddleVector = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 2.5vw;
  flex-shrink: 0;
  opacity: 0.8;
  background: #e8e8e8;
`;

export default MobileMyBoard;
