import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import MobileProfile from '../../mobile/components/myboard/Profile';
import { MobileTabMenu02_1, MobileTabMenu02_2 } from '../../mobile/assets/tabMenu/TabMenu02';
import MyboardBanner from '../../mobile/components/myboard/Banner';
import { MobileApplication, MobileMockApply } from '../../mobile/components/myboard/Information';
import MobileThreeYear from '../../mobile/components/myboard/ThreeYear';
import MobileQuartileIndicator from '../../mobile/components/myboard/QuartileIndicator';
import MobileScatter from '../../mobile/components/myboard/Scatter';
import MobilePieChart from '../../mobile/components/myboard/PieChart';
import client from '../../utils/HttpClient';
import { recruit } from '../../common/Recruiting';
import { MajorOptionsKR } from '../../types/MajorTypes';
import { collegeAPIMappingByKR } from '../../utils/Mappings';

const MobileMyBoard = () => {
  const [onViewMajor, setOnViewMajor] = useState<number>(1); // (1): 1지망 (2): 2지망

  const handleViewChange = useCallback((newView: any) => {
    setOnViewMajor(newView);
  }, []);

  /////////////////////////////
  const [isApplied, setIsApplied] = useState<boolean>(true); // *********************** 개발 위해 잠시 수정 *************************
  const [CurrentPic, setCurrentPic] = useState('');

  // onClick 이벤트가 아닌, 사용자 모의지원 완료 여부에 따라 IsApplied 값이 바뀌도록 수정해야 한다.
  const onClickApplication = useCallback(() => {
    setIsApplied(true);
    console.log('모의지원 완료');
  }, [isApplied]);

  const [userData, setUserData] = useState(() => ({
    userName: '고대빵',
    userNickname: '고대빵',
    userProfilePic: CurrentPic,
    userProfileLink: '',
    userRole: 'candidate',
    firstMajor: '미디어학부',
    studentId: '2021160009',
    hopeMajor1: '수학과',
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

  const getMyStageData = async () => {
    const APIresponse = await client.get('/dashboard/myStage');
    const data = APIresponse.data.data;
    if (userData.hopeMajor1 && userData.hopeMajor2) {
      setMyStageData([
        {
          majorName: userData.hopeMajor1,
          recruitNum: recruit[userData.hopeMajor1]['2023-2'] || 0,
          applyNum: data[0].applyNum,
          rank: data[0].rank,
        },
        {
          majorName: userData.hopeMajor2,
          recruitNum: recruit[userData.hopeMajor2]['2023-2'] || 0,
          applyNum: data[1].applyNum,
          rank: data[1].rank,
        },
      ]);
    }
  };

  useEffect(() => {
    try {
      if (userData.hopeMajor1 && userData.hopeMajor2) {
        getPastData();
      }
      getMyStageData();
      getCurData();
    } catch (err) {
      console.log(err);
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

  return (
    <>
      {userData.userRole === 'passer' ? (
        <></>
      ) : (
        <MobilePageWrapper>
          <MobileProfile userData={userData} />
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
          />
          <MobileMockApply curCompetitionRate={curData[onViewMajor - 1].curCompetitionRate} />
          <MobileThreeYear onViewMajor={onViewMajor} userData={userData} pastData1={pastData1} pastData2={pastData2} />
          <MobileQuartileIndicator onViewMajor={onViewMajor} myStageData={myStageData} isApplied={isApplied} />
          <MobilePieChart onViewMajor={onViewMajor} curData={curData} isApplied={isApplied} />
          <MobileScatter onViewMajor={onViewMajor} curData={curData} isApplied={isApplied} />
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