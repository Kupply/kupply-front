import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Typography from '../../assets/Typography';
import EditButton from '../../assets/myboardpage/InterestMajorEditButton';
import MockApplicationButton from '../../assets/myboardpage/MockApplication';
import InterestMajorButton from '../../assets/myboardpage/InterestMajorButton';
import { PieChartComponent, HalfPieChartComponent, PlotChartComponent } from '../../assets/myboardpage/MyBoardChart';
import MyStageChart from '../../assets/myboardpage/MyStage';
import SemesterButton from '../../assets/myboardpage/SemesterButton';
import EditModal from './EditModals/EditModal';
import ApplicationModal from './SubmitModals/ApplicationModal';
import { HelpMessage } from '../../assets/myboardpage/HellpMessage';

/* 
공통 정보: 이름, 학번, 1전공, 전화번호, 아이디, 비밀번호, 도전생 or 진입생

도전생 : 희망 1지망, 2지망 전공, 현재 학점, 희망 이중 지원학기
진입생 : 제2전공, 지원 당시 학점, 진입학기
*/

/* 
수정사항 1: BigSymbol 크기 및 위치 수정
수정사항 2: editButton 클릭 후에도 Active 버튼 유지
*/

const major = {
  Business: {
    image: 'path/to/computerScience.jpg',
    title: '경영대학',
    text: 'Business School',
  },
  Psychology: {
    image: 'path/to/computerScience.jpg',
    title: '심리학부',
    text: 'School of Psychology',
  },
  Economics: {
    image: 'path/to/computerScience.jpg',
    title: '경제학과',
    text: 'Department of Economics',
  },
  Statistics: {
    image: 'path/to/computerScience.jpg',
    title: '통계학과',
    text: 'Department of Statistics',
  },
  Media: {
    image: 'path/to/computerScience.jpg',
    title: '미디어학부',
    text: 'School of Media and Communication',
  },
  Computer: {
    image: 'path/to/computerScience.jpg',
    title: '컴퓨터학과',
    text: 'Department of Computer Science and Engineering',
  },
  FoodandResources: {
    image: 'path/to/computerScience.jpg',
    title: '식품자원경제학과',
    text: 'Department of Food and Resources',
  },
  Math: {
    image: 'path/to/computerScience.jpg',
    title: '수학과',
    text: 'Department of Mathematics',
  },
  Chemistry: {
    image: 'path/to/computerScience.jpg',
    title: '화학과',
    text: 'Department of Chemistry',
  },
};

type MajorOptions =
  | '경영대학'
  | '경제학과'
  | '심리학부'
  | '통계학과'
  | '수학과'
  | '화학과'
  | '미디어학부'
  | '식품자원경제학과'
  | '컴퓨터학과';

const collegeNameMapping = {
  식품자원경제학과: 'bio',
  미디어학부: 'media',
  컴퓨터학과: 'info',
  경영대학: 'bussiness',
  심리학부: 'psycho',
  화학과: 'science',
  수학과: 'science',
  경제학과: 'political',
  통계학과: 'political',
};

const collegeAPIMapping = {
  식품자원경제학과: 'foodecon',
  미디어학부: 'media',
  컴퓨터학과: 'computer',
  경영대학: 'business',
  심리학부: 'psychology',
  화학과: 'chemistry',
  수학과: 'mathematics',
  경제학과: 'economics',
  통계학과: 'statistics',
};

// 위의 major 객체에서 한글 title로 영어 text 찾는 함수
function getTextByTitle(targetTitle: string) {
  const majorText = Object.values(major).find((item) => item.title === targetTitle);
  return majorText ? majorText.text : '';
}

export default function MyBoardPage() {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const [isApplied, setIsApplied] = useState<boolean>(true);
  const [onViewMajor, setOnViewMajor] = useState<number>(1); // 1지망 학과를 보고 있다는 의미
  const [scrollY, setScrollY] = useState(0);
  // Edit Modal 관련
  const [isOpenEditModal, setOpenEditModal] = useState<boolean>(false);
  // Application Modal 관련
  const [isOpenApcModal, setOpenApcModal] = useState<boolean>(false);

  // onClick 이벤트가 아닌, 사용자 모의지원 완료 여부에 따라 IsApplied 값이 바뀌도록 수정해야 한다.
  const onClickApplication = useCallback(() => {
    setIsApplied(true);
    console.log('모의지원 완료');
  }, [isApplied]);

  const onClickInterest1 = useCallback(() => {
    setOnViewMajor(1);
    console.log('1지망 선택');
  }, [onViewMajor]);

  const onClickInterest2 = useCallback(() => {
    setOnViewMajor(2);
    console.log('2지망 선택');
  }, [onViewMajor]);

  // 아래는 데이터를 보여주는 학기 버튼 선택 관련된 코드이다.
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

  // 아래는 모달 창 관련 코드이다.
  const onClickEditModal = useCallback(() => {
    setOpenEditModal(!isOpenEditModal);
    console.log(isOpenEditModal); // 디버그
  }, [isOpenEditModal]);

  const onClickApcModal = useCallback(() => {
    setOpenApcModal(!isOpenApcModal);
    console.log(isOpenApcModal); // 디버그
  }, [isOpenApcModal]);

  useEffect(() => {
    const handleScroll = () => {
      let newPositionY = window.scrollY - 200; // 내 노트북에는 화면 안에 모의지원버튼까지 보이지 않아서 임의로 조정해놨습니다
      if (newPositionY < 0) {
        newPositionY = 0;
      }

      if (newPositionY > 916) {
        newPositionY = 916;
      }
      setScrollY(newPositionY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 서버로부터 받는 정보들
  const [userData, setUserData] = useState({
    userName: '고대빵',
    userNickname: '잠만보',
    userProfilePic: 'rectProfile1',
    userProfileLink: '',
    userRole: 'candidate',
    firstMajor: '디자인조형학부',
    studentId: '2020220037',
    hopeMajor1: '경영대학',
    hopeMajor2: '미디어학부',
    curGPA: 4.2,
    hopeSemester: '2023-2',
  });

  // 좀 아닌 것 같지만 생각의 여유가 없기에
  // FIXME: numOfSelection(선발인원)들 하드코딩으로 바꿔야 함.
  const [pastData1, setPastData1] = useState([
    {
      numOfSelection: 10,
      numOfApplication: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 20,
      numOfApplication: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 30,
      numOfApplication: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
  ]);
  const [pastData2, setPastData2] = useState([
    {
      numOfSelection: 40,
      numOfApplication: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 50,
      numOfApplication: 5,
      competitionRate: 0,
      meanGpa: 0,
      minGpa: 0,
    },
    {
      numOfSelection: 60,
      numOfApplication: 5,
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

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const APIresponse = await axios.get(`http://localhost:8080/user/getMe`, config);
        const userInfo = APIresponse.data.data.user;

        setUserData({
          ...userData,
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
        });

        // 모의지원 했는지.
        setIsApplied(userInfo.isApplied);

        sessionStorage.setItem('userProfilePic', userInfo.profilePic);
        sessionStorage.setItem('userProfileLink', userInfo.profileLink);
        sessionStorage.setItem('nickname', userInfo.nickname);
        sessionStorage.setItem('studentId', userInfo.studentId);
        sessionStorage.setItem('firstMajor', userInfo.firstMajor);
        sessionStorage.setItem('hopeMajor1', userInfo.hopeMajor1);
        sessionStorage.setItem('hopeMajor2', userInfo.hopeMajor2);
        sessionStorage.setItem('curGPA', userInfo.curGPA.toFixed(2));
        sessionStorage.setItem('hopeSemester', userInfo.hopeSemester);
      } catch (err) {
        console.log(err);
      }
    };

    getUserInfo();
  }, []);

  useEffect(() => {
    const getPastData = async () => {
      const semester = ['2023-1', '2022-2', '2022-1'];
      const hopeMajor1 = collegeAPIMapping[userData.hopeMajor1 as MajorOptions];
      const hopeMajor2 = collegeAPIMapping[userData.hopeMajor2 as MajorOptions];

      const newPastData1 = [...pastData1];
      for (let i = 0; i < semester.length; i++) {
        try {
          const APIresponse = await axios.get(`http://localhost:8080/pastData/${hopeMajor1}/${semester[i]}`, config);
          const data = APIresponse.data.pastData;

          let competitionRate = 0;
          if (data.overallData.numberOfData > 0) {
            competitionRate = +(data.overallData.numberOfData / newPastData1[i].numOfSelection).toFixed(2);
          }

          newPastData1[i] = {
            numOfSelection: newPastData1[i].numOfSelection,
            numOfApplication: data.overallData.numberOfData,
            competitionRate: competitionRate,
            meanGpa: data.passedData.passedMeanGPAData.gpa,
            minGpa: data.passedData.passedMinimumGPAData.gpa,
          };
        } catch (err) {
          console.log(err);
        }
      }
      setPastData1(newPastData1);

      const newPastData2 = [...pastData2];
      for (let i = 0; i < semester.length; i++) {
        try {
          const APIresponse = await axios.get(`http://localhost:8080/pastData/${hopeMajor2}/${semester[i]}`, config);
          const data = APIresponse.data.pastData;

          let competitionRate = 0;
          if (data.overallData.numberOfData > 0) {
            competitionRate = +(data.overallData.numberOfData / newPastData2[i].numOfSelection).toFixed(2);
          }

          newPastData2[i] = {
            numOfSelection: newPastData2[i].numOfSelection,
            numOfApplication: data.overallData.numberOfData,
            competitionRate: competitionRate,
            meanGpa: data.passedData.passedMeanGPAData.gpa,
            minGpa: data.passedData.passedMinimumGPAData.gpa,
          };
        } catch (err) {
          console.log(err);
        }
      }
      setPastData2(newPastData2);
    };

    getPastData();
  }, []);

  useEffect(() => {
    const getCurData = async () => {
      try {
        const APIresponse = await axios.get(`http://localhost:8080/dashboard/hopeMajorsCurrentInfo`, config);
        const data = APIresponse.data.data;

        const newCurData = [...curData];

        for (let i = 0; i < 2; i++) {
          let curCompetitionRate = 0;
          if (data[i].curApplyNum > 0) {
            curCompetitionRate = newCurData[i].curNumOfSelection / data[i].curApplyNum;
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

    getCurData();
  }, []);

  return (
    <>
      <Wrapper>
        {isOpenEditModal ? (
          <EditModal isOpenModal={isOpenEditModal} setOpenModal={setOpenEditModal} onClickModal={onClickEditModal} />
        ) : null}
        {isOpenApcModal ? (
          <ApplicationModal
            isOpenModal={isOpenApcModal}
            setOpenModal={setOpenApcModal}
            onClickModal={onClickApcModal}
          />
        ) : null}
        <LeftSideWrapper>
          <div style={{ marginTop: '-82px' }}>
            <MyInformationBox translateY={scrollY}>
              <CharacterImageBox>
                <CharacterImage
                  src={
                    userData.userProfilePic === 'customProfile'
                      ? userData.userProfileLink
                      : `design_image/character/rectProfile/${userData.userProfilePic}.png`
                  }
                  alt="profile"
                />
              </CharacterImageBox>
              <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '128.01px' }}>
                <Typography
                  size="heading2"
                  style={{ color: 'var(--Main-Black, #141414)', marginTop: '20px', lineHeight: '125%' }}
                >
                  {userData.userName}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Typography
                    size="bodyText"
                    style={{ color: 'rgba(20, 20, 20, 0.60)', fontWeight: '500', marginLeft: '6px' }}
                  >
                    {userData.userRole === 'candidate' ? '도전자' : '합격자'} 님
                  </Typography>
                  <EditButton onClick={onClickEditModal} />
                </div>
              </div>
              <div style={{ marginTop: '15px' }}>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '500', marginLeft: '128.01px' }}
                >
                  {userData.firstMajor} {userData.studentId.substring(2, 4)}학번
                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '30px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '44px', marginLeft: '128.01px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M17.4993 8.33325C17.6088 8.33328 17.7172 8.31174 17.8183 8.26987C17.9194 8.22801 18.0113 8.16662 18.0887 8.08924C18.1661 8.01185 18.2274 7.91997 18.2693 7.81885C18.3112 7.71774 18.3327 7.60936 18.3327 7.49992V4.99992C18.3328 4.82506 18.2778 4.65463 18.1755 4.51279C18.0733 4.37095 17.9289 4.26491 17.763 4.20972L10.263 1.70972C10.0919 1.65275 9.90684 1.65275 9.73567 1.70972L2.23567 4.20972C2.06976 4.26491 1.92544 4.37095 1.82319 4.51279C1.72093 4.65463 1.66594 4.82506 1.66602 4.99992V7.49992C1.66599 7.60936 1.68752 7.71774 1.72939 7.81885C1.77126 7.91997 1.83264 8.01185 1.91003 8.08924C1.98742 8.16662 2.0793 8.22801 2.18041 8.26987C2.28153 8.31174 2.38991 8.33328 2.49935 8.33325H3.33268V14.3201C2.84663 14.4914 2.42549 14.8088 2.12707 15.2289C1.82866 15.6491 1.6676 16.1513 1.66602 16.6666V18.3333C1.66599 18.4427 1.68752 18.5511 1.72939 18.6522C1.77126 18.7533 1.83264 18.8452 1.91003 18.9226C1.98742 19 2.0793 19.0613 2.18041 19.1032C2.28153 19.1451 2.38991 19.1666 2.49935 19.1666H17.4993C17.6088 19.1666 17.7172 19.1451 17.8183 19.1032C17.9194 19.0613 18.0113 19 18.0887 18.9226C18.1661 18.8452 18.2274 18.7533 18.2693 18.6522C18.3112 18.5511 18.3327 18.4427 18.3327 18.3333V16.6666C18.3311 16.1513 18.17 15.6491 17.8716 15.2289C17.5732 14.8088 17.1521 14.4914 16.666 14.3201V8.33325H17.4993ZM16.666 17.4999H3.33268V16.6666C3.3329 16.4456 3.42077 16.2338 3.577 16.0776C3.73324 15.9213 3.94507 15.8335 4.16602 15.8333H15.8327C16.0536 15.8335 16.2655 15.9213 16.4217 16.0776C16.5779 16.2338 16.6658 16.4456 16.666 16.6666V17.4999ZM4.99935 14.1666V8.33325H6.66602V14.1666H4.99935ZM8.33268 14.1666V8.33325H11.666V14.1666H8.33268ZM13.3327 14.1666V8.33325H14.9993V14.1666H13.3327ZM3.33268 6.66658V5.6005L9.99935 3.378L16.666 5.6005V6.66658H3.33268Z"
                    fill="#434343"
                    fill-opacity="0.6"
                  />
                </svg>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400px', marginLeft: '10px' }}
                >
                  관심 전공
                </Typography>
              </div>
              <div style={{ display: 'flex', marginTop: '14px', marginLeft: '128px' }}>
                <InterestMajorBox>
                  <MajorSymbolShadow>
                    <MajorSymbol
                      src={`design_image/major_symbol/trans/medium/${
                        collegeNameMapping[userData.hopeMajor1 as MajorOptions]
                      }_trans_medium.png`}
                      alt={getTextByTitle(userData.hopeMajor1)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
                      <circle cx="56" cy="56" r="56" fill="url(#paint0_radial_3725_3779)" fill-opacity="0.7" />
                      <defs>
                        <radialGradient
                          id="paint0_radial_3725_3779"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(56 58.5751) rotate(90) scale(53.4249)"
                        >
                          <stop stop-color="#926853" stop-opacity="0.58" />
                          <stop offset="1" stop-color="white" stop-opacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </MajorSymbolShadow>
                  <div style={{ marginTop: '16px', marginLeft: '130px' }}>
                    <Typography
                      size="bodyText"
                      style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400', lineHeight: '20px' }}
                    >
                      1지망
                    </Typography>
                    <Typography size="bodyText" style={{ color: 'var(--Main-Black, #141414)', marginTop: '16px' }}>
                      {userData.hopeMajor1}
                    </Typography>
                    <Typography
                      size="normalText"
                      style={{
                        color: 'var(--Main-Black, #141414)',
                        fontWeight: '400',
                        lineHeight: '128.571%',
                        opacity: 0.8,
                      }}
                    >
                      {getTextByTitle(userData.hopeMajor1)}
                    </Typography>
                  </div>
                </InterestMajorBox>
              </div>
              <div style={{ display: 'flex', marginTop: '14px', marginLeft: '128px' }}>
                <InterestMajorBox>
                  <MajorSymbolShadow>
                    <MajorSymbol
                      src={`design_image/major_symbol/trans/medium/${
                        collegeNameMapping[userData.hopeMajor2 as MajorOptions]
                      }_trans_medium.png`}
                      alt={getTextByTitle(userData.hopeMajor2)}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
                      <circle cx="56" cy="56" r="56" fill="url(#paint0_radial_3725_1679)" fill-opacity="0.7" />
                      <defs>
                        <radialGradient
                          id="paint0_radial_3725_1679"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(56 58.5751) rotate(90) scale(53.4249)"
                        >
                          <stop stop-color="#7BBEEE" stop-opacity="0.6" />
                          <stop offset="1" stop-color="white" stop-opacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </MajorSymbolShadow>
                  <div style={{ marginTop: '16px', marginLeft: '130px' }}>
                    <Typography
                      size="bodyText"
                      style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400', lineHeight: '20px' }}
                    >
                      2지망
                    </Typography>
                    <Typography size="bodyText" style={{ color: 'var(--Main-Black, #141414)', marginTop: '8px' }}>
                      {userData.hopeMajor2}
                    </Typography>
                    <Typography
                      size="normalText"
                      style={{
                        color: 'var(--Main-Black, #141414)',
                        fontWeight: '400',
                        lineHeight: '114.286%',
                        opacity: 0.8,
                      }}
                    >
                      {getTextByTitle(userData.hopeMajor2)}
                    </Typography>
                  </div>
                </InterestMajorBox>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '30px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '44px', marginLeft: '128.01px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.15323 17.5L15.7787 17.5C16.6959 17.5 17.4395 16.7538 17.4395 15.8333L17.4395 4.16667C17.4395 3.24619 16.6959 2.5 15.7787 2.5L4.15323 2.5C3.23601 2.5 2.49246 3.24619 2.49246 4.16667L2.49245 15.8333C2.49245 16.7538 3.23601 17.5 4.15323 17.5Z"
                    stroke="#434343"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.81352 14.1665L8.30469 14.1665L8.30469 9.99984L5.81352 9.99984L5.81352 14.1665Z"
                    stroke="#434343"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.626 14.1665L14.1172 14.1665L14.1172 6.6665L11.626 6.6665L11.626 14.1665Z"
                    stroke="#434343"
                    stroke-opacity="0.6"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400px', marginLeft: '9.97px' }}
                >
                  현재 내 학점
                </Typography>
                <Typography
                  size="bodyText"
                  style={{ color: 'var(--Main-Black, #141414)', fontWeight: '500', marginLeft: '71.74px' }}
                >
                  {userData.curGPA}
                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '44px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '44px', marginLeft: '128.01px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M15.7765 3.3335H4.15101C3.23379 3.3335 2.49023 4.07969 2.49023 5.00016V16.6668C2.49023 17.5873 3.23379 18.3335 4.15101 18.3335H15.7765C16.6937 18.3335 17.4372 17.5873 17.4372 16.6668V5.00016C17.4372 4.07969 16.6937 3.3335 15.7765 3.3335Z"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.49023 8.3335H17.4372"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.2871 1.6665V4.99984"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.64258 1.6665V4.99984"
                    stroke="#8B8B8B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Typography
                  size="bodyText"
                  style={{ color: 'rgba(67, 67, 67, 0.60)', fontWeight: '400', marginLeft: '9.97px' }}
                >
                  희망 진입학기
                </Typography>
                <Typography
                  size="bodyText"
                  style={{ color: 'var(--Main-Black, #141414)', fontWeight: '500', marginLeft: '59.4px' }}
                >
                  {userData.hopeSemester}R
                </Typography>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284"
                height="2"
                viewBox="0 0 284 2"
                fill="none"
                style={{ marginTop: '44px', marginLeft: '128.01px' }}
              >
                <path d="M283 1L0.999992 1" stroke="#DFDFDF" stroke-linecap="round" />
              </svg>
              <div style={{ marginTop: '44px', marginLeft: '128.01px' }}>
                <MockApplicationButton onClick={onClickApcModal} />
              </div>
            </MyInformationBox>
          </div>
        </LeftSideWrapper>
        <div style={{ marginTop: '-82px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '154px', marginLeft: '551px', gap: '18px' }}>
            <InterestMajorButton onView={onViewMajor === 1} onClick={onClickInterest1} />
            <InterestMajorButton onView={onViewMajor === 2} onClick={onClickInterest2}>
              2지망
            </InterestMajorButton>
          </div>
          {onViewMajor === 1 ? (
            <>
              <div style={{ marginLeft: '551px' }}>
                <BigMajorSymbolBox style={{ marginTop: '32px' }}>
                  <BoxTitleText style={{ marginLeft: '136px' }}>1지망 관심전공</BoxTitleText>
                  <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                    <path d="M0 1L392 1" stroke="#DFDFDF" />
                  </svg>
                  <div style={{ marginTop: '56px' }}>
                    <div
                      style={{
                        width: '184px',
                        height: '241px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <BigMajorSymbol
                        src={`design_image/major_symbol/trans/large/${
                          collegeNameMapping[userData.hopeMajor1 as MajorOptions]
                        }_trans_large.png`}
                        alt={getTextByTitle(userData.hopeMajor1)}
                      />
                    </div>
                    <Typography
                      size="title2"
                      style={{
                        lineHeight: '138.889%',
                        marginTop: '34px',
                        textAlign: 'center',
                      }}
                    >
                      {userData.hopeMajor1}
                    </Typography>
                    <Typography
                      size="largeText"
                      style={{
                        fontWeight: '500',
                        opacity: '0.8',
                        marginTop: '0px',
                        textAlign: 'center',
                      }}
                    >
                      {getTextByTitle(userData.hopeMajor1)}
                    </Typography>
                  </div>
                </BigMajorSymbolBox>
                <div style={{ marginTop: '-571px', marginLeft: '424px' }}>
                  <CompetitionRateBox>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <BoxTitleText style={{ marginRight: '8px' }}>실시간 경쟁률</BoxTitleText>
                      <HelpMessage />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                      <path d="M0 1L392 1" stroke="#DFDFDF" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '52px', marginLeft: '36px' }}>
                      <Typography size="heading1" style={{ color: '#D85888', lineHeight: '104.167%' }}>
                        {`${curData[0].curCompetitionRate}\u00A0`}
                      </Typography>
                      <Typography
                        size="heading1"
                        style={{ color: 'rgba(67, 67, 67, 0.80)', fontWeight: '400', lineHeight: '50px' }}
                      >
                        : 1
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '37px', marginLeft: '36px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M13.416 2.3335V5.8335H9.91602"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.9521 8.74985C11.5729 9.82313 10.8552 10.7441 9.90703 11.374C8.95888 12.0038 7.8317 12.3085 6.69535 12.242C5.55899 12.1755 4.47503 11.7415 3.60679 11.0054C2.73856 10.2693 2.1331 9.27089 1.88165 8.16071C1.6302 7.05053 1.74638 5.8887 2.21269 4.8503C2.679 3.8119 3.47017 2.95318 4.46698 2.40355C5.46379 1.85392 6.61223 1.64315 7.73925 1.80301C8.86626 1.96287 9.9108 2.48469 10.7154 3.28985L13.4163 5.83318"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <Typography size="smallText" style={{ color: '#A8A8A8', marginLeft: '4px' }}>
                        Last Update 5:58 PM
                      </Typography>
                    </div>
                  </CompetitionRateBox>
                </div>
                <CompetitionRateBox style={{ marginTop: '23px', marginLeft: '424px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <BoxTitleText style={{ marginRight: '8px' }}>실시간 지원자</BoxTitleText>
                    <HelpMessage />
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                    <path d="M0 1L392 1" stroke="#DFDFDF" />
                  </svg>
                  <div style={{ paddingTop: '35px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '36px' }}>
                      <Typography size="heading1" style={{ color: '#D85888', lineHeight: '104.167%' }}>
                        {`${curData[0].curApplyNum}\u00A0`}
                      </Typography>
                      <Typography
                        size="heading1"
                        style={{ color: 'rgba(67, 67, 67, 0.80)', fontWeight: '400', lineHeight: '50px' }}
                      >
                        / {curData[0].curNumOfSelection}
                      </Typography>
                      <Typography
                        size="normalText"
                        style={{
                          color: 'var(--Black2, #434343)',
                          fontWeight: '400',
                          lineHeight: '112.5%',
                          marginLeft: '13px',
                        }}
                      >
                        {`\u00A0 명 정원`}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px', marginLeft: '36px' }}>
                      <Typography size={'smallText'} bold={'500px'} color="rgba(67, 67, 67, 0.80);">
                        {curData[0].curApplyNum}명의 지원자가 {userData.hopeMajor1}를 지원했습니다.
                      </Typography>
                      <div style={{ display: 'flex', marginTop: '18px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M13.416 2.3335V5.8335H9.91602"
                            stroke="#A8A8A8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.9521 8.74985C11.5729 9.82313 10.8552 10.7441 9.90703 11.374C8.95888 12.0038 7.8317 12.3085 6.69535 12.242C5.55899 12.1755 4.47503 11.7415 3.60679 11.0054C2.73856 10.2693 2.1331 9.27089 1.88165 8.16071C1.6302 7.05053 1.74638 5.8887 2.21269 4.8503C2.679 3.8119 3.47017 2.95318 4.46698 2.40355C5.46379 1.85392 6.61223 1.64315 7.73925 1.80301C8.86626 1.96287 9.9108 2.48469 10.7154 3.28985L13.4163 5.83318"
                            stroke="#A8A8A8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <Typography size="smallText" style={{ color: '#A8A8A8', marginLeft: '4px' }}>
                          Last Update 5:58 PM
                        </Typography>
                      </div>
                    </div>
                  </div>
                </CompetitionRateBox>

                <div style={{ marginTop: '-575px', marginLeft: '847px' }}>
                  <ThreeYearCumulativeDataBox>
                    <Typography
                      size="bodyText"
                      style={{ color: 'var(--Main-Black, #141414)', marginTop: '26px', marginLeft: '36px' }}
                    >
                      3학기 합격지표
                    </Typography>
                    <EachYearHeadBox>
                      <SemesterButton
                        isClicked={semesterBtnStates['2023-1R']}
                        onClick={() => handleSemesterBtnClick('2023-1R')}
                      >
                        2023-1R
                      </SemesterButton>
                      <SemesterButton
                        isClicked={semesterBtnStates['2022-2R']}
                        onClick={() => handleSemesterBtnClick('2022-2R')}
                      >
                        2022-2R
                      </SemesterButton>
                      <SemesterButton
                        isClicked={semesterBtnStates['2022-1R']}
                        onClick={() => handleSemesterBtnClick('2022-1R')}
                      >
                        2022-1R
                      </SemesterButton>
                    </EachYearHeadBox>
                    <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                      <path d="M0 1L392 1" stroke="#DFDFDF" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '41px' }}>
                      <Typography
                        size="bodyText"
                        style={{
                          color: 'var(--Main-Black, #141414)',
                          fontWeight: '600',
                          lineHeight: '90%',
                          marginLeft: '36px',
                        }}
                      >
                        {semesterBtnStates['2023-1R'] ? '2023-1' : semesterBtnStates['2022-2R'] ? '2022-2' : '2022-1'}R{' '}
                        {userData.hopeMajor1} 모집정보
                      </Typography>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        style={{ marginLeft: '6px' }}
                      >
                        <path
                          d="M26 37L34 30"
                          stroke="#141414"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M34 30L26 22"
                          stroke="#141414"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '51px' }}>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '36px' }}>
                        {semesterBtnStates['2023-1R'] ? '23-1' : semesterBtnStates['2022-2R'] ? '22-2' : '22-1'} 선발
                        인원
                      </Typography>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '85px' }}>
                        경쟁률
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '9px' }}>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '36px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData1[0].numOfSelection
                          : semesterBtnStates['2022-2R']
                          ? pastData1[1].numOfSelection
                          : pastData1[2].numOfSelection}
                        명
                      </Typography>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '143px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData1[0].competitionRate
                          : semesterBtnStates['2022-2R']
                          ? pastData1[1].competitionRate
                          : pastData1[2].competitionRate}{' '}
                        : 1
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '60.98px' }}>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '36px' }}>
                        합격자 평균 학점
                      </Typography>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '76px' }}>
                        합격자 최저 학점
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '9px' }}>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '36px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData1[0].meanGpa
                          : semesterBtnStates['2022-2R']
                          ? pastData1[1].meanGpa
                          : pastData1[2].meanGpa}
                      </Typography>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '142px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData1[0].minGpa
                          : semesterBtnStates['2022-2R']
                          ? pastData1[1].minGpa
                          : pastData1[2].minGpa}
                      </Typography>
                    </div>
                  </ThreeYearCumulativeDataBox>
                </div>
              </div>
              <div style={{ marginLeft: '551px', marginTop: '30px' }}>
                <RangeBox>
                  <Typography
                    size="bodyText"
                    style={{
                      color: 'var(--Main-Black, #141414)',
                      marginTop: '26px',
                      marginLeft: '36px',
                      marginBottom: '14px',
                    }}
                  >
                    내 학점 위치 파악하기
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1239" height="2" viewBox="0 0 1239 2" fill="none">
                    <path d="M0 1L1239 1" stroke="#DFDFDF" />
                  </svg>
                  <MyStageChart />
                </RangeBox>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '551px',
                  marginTop: '30px',
                  gap: '30px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <Graph_1_1Box>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        size="bodyText"
                        style={{
                          color: 'var(--Main-Black, #141414)',
                          marginLeft: '36px',
                          marginTop: '26px',
                          marginBottom: '14px',
                        }}
                      >
                        지원자 정보 살펴보기
                      </Typography>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{ marginLeft: '8px', marginTop: '14px' }}
                      >
                        <g clip-path="url(#clip0_3942_9326)">
                          <path
                            d="M10.0013 18.3327C14.6037 18.3327 18.3346 14.6017 18.3346 9.99935C18.3346 5.39698 14.6037 1.66602 10.0013 1.66602C5.39893 1.66602 1.66797 5.39698 1.66797 9.99935C1.66797 14.6017 5.39893 18.3327 10.0013 18.3327Z"
                            stroke="#141414"
                            stroke-opacity="0.8"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.0078 6.66602L9.99948 6.66602"
                            stroke="#141414"
                            stroke-opacity="0.8"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.0078 13.334L10.0078 10.0007"
                            stroke="#141414"
                            stroke-opacity="0.8"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3942_9326">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="674" height="2" viewBox="0 0 674 2" fill="none">
                      <path d="M0 1L674 1" stroke="#DFDFDF" />
                    </svg>
                    <PieChartComponent />
                  </Graph_1_1Box>
                  <Graph_2_1Box>
                    <HalfPieChartComponent />
                  </Graph_2_1Box>
                </div>
                <Graph_2Box>
                  <Typography
                    size="bodyText"
                    style={{
                      color: 'var(--Main-Black, #141414)',
                      marginLeft: '36px',
                      marginTop: '26px',
                      marginBottom: '14px',
                    }}
                  >
                    이중전공 지원자 학과 분포
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" width="535" height="2" viewBox="0 0 535 2" fill="none">
                    <path d="M0 1L535 1" stroke="#DFDFDF" />
                  </svg>
                  <PlotChartComponent />
                </Graph_2Box>
              </div>
            </>
          ) : (
            <>
              <div style={{ marginLeft: '551px' }}>
                <BigMajorSymbolBox style={{ marginTop: '32px' }}>
                  <BoxTitleText style={{ marginLeft: '136px' }}>2지망 관심전공</BoxTitleText>
                  <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                    <path d="M0 1L392 1" stroke="#DFDFDF" />
                  </svg>
                  <div style={{ marginTop: '56px' }}>
                    <div
                      style={{
                        width: '184px',
                        height: '241px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <BigMajorSymbol
                        src={`design_image/major_symbol/trans/large/${
                          collegeNameMapping[userData.hopeMajor2 as MajorOptions]
                        }_trans_large.png`}
                        alt={getTextByTitle(userData.hopeMajor2)}
                      />
                    </div>
                    <Typography
                      size="title2"
                      style={{
                        lineHeight: '138.889%',
                        marginTop: '34px',
                        textAlign: 'center',
                      }}
                    >
                      {userData.hopeMajor2}
                    </Typography>
                    <Typography
                      size="largeText"
                      style={{
                        fontWeight: '500',
                        opacity: '0.8',
                        marginTop: '0px',
                        textAlign: 'center',
                      }}
                    >
                      {getTextByTitle(userData.hopeMajor2)}
                    </Typography>
                  </div>
                </BigMajorSymbolBox>
                <div style={{ marginTop: '-571px', marginLeft: '424px' }}>
                  <CompetitionRateBox>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <BoxTitleText style={{ marginRight: '8px' }}>실시간 경쟁률</BoxTitleText>
                      <HelpMessage />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                      <path d="M0 1L392 1" stroke="#DFDFDF" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '52px', marginLeft: '36px' }}>
                      <Typography size="heading1" style={{ color: '#D85888', lineHeight: '104.167%' }}>
                        {`${curData[1].curCompetitionRate}\u00A0`}
                      </Typography>
                      <Typography
                        size="heading1"
                        style={{ color: 'rgba(67, 67, 67, 0.80)', fontWeight: '400', lineHeight: '50px' }}
                      >
                        : 1
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '37px', marginLeft: '36px' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M13.416 2.3335V5.8335H9.91602"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.9521 8.74985C11.5729 9.82313 10.8552 10.7441 9.90703 11.374C8.95888 12.0038 7.8317 12.3085 6.69535 12.242C5.55899 12.1755 4.47503 11.7415 3.60679 11.0054C2.73856 10.2693 2.1331 9.27089 1.88165 8.16071C1.6302 7.05053 1.74638 5.8887 2.21269 4.8503C2.679 3.8119 3.47017 2.95318 4.46698 2.40355C5.46379 1.85392 6.61223 1.64315 7.73925 1.80301C8.86626 1.96287 9.9108 2.48469 10.7154 3.28985L13.4163 5.83318"
                          stroke="#A8A8A8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <Typography size="smallText" style={{ color: '#A8A8A8', marginLeft: '4px' }}>
                        Last Update 5:58 PM
                      </Typography>
                    </div>
                  </CompetitionRateBox>
                </div>
                <CompetitionRateBox style={{ marginTop: '23px', marginLeft: '424px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <BoxTitleText style={{ marginRight: '8px' }}>실시간 지원자</BoxTitleText>
                    <HelpMessage />
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                    <path d="M0 1L392 1" stroke="#DFDFDF" />
                  </svg>
                  <div style={{ paddingTop: '35px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '36px' }}>
                      <Typography size="heading1" style={{ color: '#D85888', lineHeight: '104.167%' }}>
                        {`${curData[1].curApplyNum}\u00A0`}
                      </Typography>
                      <Typography
                        size="heading1"
                        style={{ color: 'rgba(67, 67, 67, 0.80)', fontWeight: '400', lineHeight: '50px' }}
                      >
                        / {curData[1].curNumOfSelection}
                      </Typography>
                      <Typography
                        size="normalText"
                        style={{
                          color: 'var(--Black2, #434343)',
                          fontWeight: '400',
                          lineHeight: '112.5%',
                          marginLeft: '13px',
                        }}
                      >
                        {`\u00A0 명 정원`}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px', marginLeft: '36px' }}>
                      <Typography size={'smallText'} bold={'500px'} color="rgba(67, 67, 67, 0.80);">
                        {curData[1].curApplyNum}명의 지원자가 {userData.hopeMajor2}를 지원했습니다.
                      </Typography>
                      <div style={{ display: 'flex', marginTop: '18px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M13.416 2.3335V5.8335H9.91602"
                            stroke="#A8A8A8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.9521 8.74985C11.5729 9.82313 10.8552 10.7441 9.90703 11.374C8.95888 12.0038 7.8317 12.3085 6.69535 12.242C5.55899 12.1755 4.47503 11.7415 3.60679 11.0054C2.73856 10.2693 2.1331 9.27089 1.88165 8.16071C1.6302 7.05053 1.74638 5.8887 2.21269 4.8503C2.679 3.8119 3.47017 2.95318 4.46698 2.40355C5.46379 1.85392 6.61223 1.64315 7.73925 1.80301C8.86626 1.96287 9.9108 2.48469 10.7154 3.28985L13.4163 5.83318"
                            stroke="#A8A8A8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <Typography size="smallText" style={{ color: '#A8A8A8', marginLeft: '4px' }}>
                          Last Update 5:58 PM
                        </Typography>
                      </div>
                    </div>
                  </div>
                </CompetitionRateBox>

                <div style={{ marginTop: '-575px', marginLeft: '847px' }}>
                  <ThreeYearCumulativeDataBox>
                    <Typography
                      size="bodyText"
                      style={{ color: 'var(--Main-Black, #141414)', marginTop: '26px', marginLeft: '36px' }}
                    >
                      3학기 합격지표
                    </Typography>
                    <EachYearHeadBox>
                      <SemesterButton
                        isClicked={semesterBtnStates['2023-1R']}
                        onClick={() => handleSemesterBtnClick('2023-1R')}
                      >
                        2023-1R
                      </SemesterButton>
                      <SemesterButton
                        isClicked={semesterBtnStates['2022-2R']}
                        onClick={() => handleSemesterBtnClick('2022-2R')}
                      >
                        2022-2R
                      </SemesterButton>
                      <SemesterButton
                        isClicked={semesterBtnStates['2022-1R']}
                        onClick={() => handleSemesterBtnClick('2022-1R')}
                      >
                        2022-1R
                      </SemesterButton>
                    </EachYearHeadBox>
                    <svg xmlns="http://www.w3.org/2000/svg" width="392" height="2" viewBox="0 0 392 2" fill="none">
                      <path d="M0 1L392 1" stroke="#DFDFDF" />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '41px' }}>
                      <Typography
                        size="bodyText"
                        style={{
                          color: 'var(--Main-Black, #141414)',
                          fontWeight: '600',
                          lineHeight: '90%',
                          marginLeft: '36px',
                        }}
                      >
                        {semesterBtnStates['2023-1R'] ? '2023-1' : semesterBtnStates['2022-2R'] ? '2022-2' : '2022-1'}R{' '}
                        {userData.hopeMajor2} 모집정보
                      </Typography>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        style={{ marginLeft: '6px' }}
                      >
                        <path
                          d="M26 37L34 30"
                          stroke="#141414"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M34 30L26 22"
                          stroke="#141414"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '51px' }}>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '36px' }}>
                        {semesterBtnStates['2023-1R'] ? '23-1' : semesterBtnStates['2022-2R'] ? '22-2' : '22-1'} 선발
                        인원
                      </Typography>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '85px' }}>
                        경쟁률
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '9px' }}>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '36px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData2[0].numOfSelection
                          : semesterBtnStates['2022-2R']
                          ? pastData2[1].numOfSelection
                          : pastData2[2].numOfSelection}
                        명
                      </Typography>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '143px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData2[0].competitionRate
                          : semesterBtnStates['2022-2R']
                          ? pastData2[1].competitionRate
                          : pastData2[2].competitionRate}{' '}
                        : 1
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '60.98px' }}>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '36px' }}>
                        합격자 평균 학점
                      </Typography>
                      <Typography size="mediumText" style={{ color: 'rgba(20, 20, 20, 0.60)', marginLeft: '76px' }}>
                        합격자 최저 학점
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '9px' }}>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '36px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData2[0].meanGpa
                          : semesterBtnStates['2022-2R']
                          ? pastData2[1].meanGpa
                          : pastData2[2].meanGpa}
                      </Typography>
                      <Typography
                        size="largeText"
                        style={{ color: 'var(--Main-Black, #141414)', fontWeight: '600', marginLeft: '142px' }}
                      >
                        {semesterBtnStates['2023-1R']
                          ? pastData2[0].minGpa
                          : semesterBtnStates['2022-2R']
                          ? pastData2[1].minGpa
                          : pastData2[2].minGpa}
                      </Typography>
                    </div>
                  </ThreeYearCumulativeDataBox>
                </div>
              </div>
              <div style={{ marginLeft: '551px', marginTop: '30px' }}>
                <RangeBox>
                  <Typography
                    size="bodyText"
                    style={{
                      color: 'var(--Main-Black, #141414)',
                      marginTop: '26px',
                      marginLeft: '36px',
                      marginBottom: '14px',
                    }}
                  >
                    내 학점 위치 파악하기
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1239" height="2" viewBox="0 0 1239 2" fill="none">
                    <path d="M0 1L1239 1" stroke="#DFDFDF" />
                  </svg>
                  <MyStageChart />
                </RangeBox>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '551px',
                  marginTop: '30px',
                  gap: '30px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <Graph_1_1Box>
                    <Typography
                      size="bodyText"
                      style={{
                        color: 'var(--Main-Black, #141414)',
                        marginLeft: '36px',
                        marginTop: '26px',
                        marginBottom: '14px',
                      }}
                    >
                      지원자 정보 살펴보기
                    </Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" width="674" height="2" viewBox="0 0 674 2" fill="none">
                      <path d="M0 1L674 1" stroke="#DFDFDF" />
                    </svg>
                    <PieChartComponent />
                  </Graph_1_1Box>
                  <Graph_2_1Box>
                    <HalfPieChartComponent />
                  </Graph_2_1Box>
                </div>
                <Graph_2Box>
                  <Typography
                    size="bodyText"
                    style={{
                      color: 'var(--Main-Black, #141414)',
                      marginLeft: '36px',
                      marginTop: '26px',
                      marginBottom: '14px',
                    }}
                  >
                    이중전공 지원자 학과 분포
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" width="535" height="2" viewBox="0 0 535 2" fill="none">
                    <path d="M0 1L535 1" stroke="#DFDFDF" />
                  </svg>
                  <PlotChartComponent />
                </Graph_2Box>
              </div>
            </>
          )}
          {isApplied ? null : (
            <BlurWrapper>
              <BlurMsg>
                <Typography size="largeText">쿠플라이에서 모의지원 후 열람 가능해요!</Typography>
                <Typography size="mediumText" style={{ lineHeight: '136.111%' }}>
                  모의지원을 완료한 후, 나와 함께 {userData.hopeMajor1}를 지원한 지원자의 실시간 지원통계를
                  열람해보세요.
                  <br />
                  모의지원하라는 홍보성 문구가 필요해요.
                </Typography>
              </BlurMsg>
            </BlurWrapper>
          )}
        </div>
      </Wrapper>
    </>
  );
}

/* 
전체 페이지 크기 (헤더, 풋터 포함)
width: 1921px;
height: 2378px;   
*/

const Wrapper = styled.div`
  width: 100%; // 1920px;
  height: 2020px; // 100%; // (헤더, 풋터 제외 크기) 이 크기로 퍼센트 계산
  background: #fcfcfc;
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 1564px;
    height: 1564px;
    border-radius: 1564px;
    filter: blur(75px);
    opacity: 0.7;
    background: radial-gradient(
      60.96% 60.96% at 58.12% 41.5%,
      rgba(216, 88, 136, 0.5) 0%,
      rgba(255, 175, 189, 0.05) 100%
    );
    z-index: -1;
    top: -833px;
    left: -1px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 1494px;
    height: 1494px;
    border-radius: 1494px;
    filter: blur(75px);
    opacity: 0.5;
    background: radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(232, 88, 136, 0.25) 0%, rgba(255, 255, 255, 0) 100%);
    z-index: -1;
    top: 199px;
    right: -518px;
  }
`;

const LeftSideWrapper = styled.div`
  width: 522px;
  height: 100%;
  position: absolute;
  flex-shrink: 0;
  background: linear-gradient(89deg, rgba(238, 238, 238, 0.44) 10.94%, rgba(217, 217, 217, 0) 99.54%);
  left: 0;
  top: 0;
  //border: 1px solid gray; // 외곽선 추가 (나중에 삭제)
`;

// ----------------Box----------------
const MyInformationBox = styled.div<{ translateY: number }>`
  width: 521px;
  height: 1104px;
  position: absolute;
  border: 0px solid var(--White, #fff);
  background: rgba(255, 255, 255, 0.3);
  transform: ${(props) => `translateY(${props.translateY}px)`};
`;

const InterestMajorBox = styled.div`
  // 나중에 학과별로 에셋 만들기
  width: 282px;
  height: 114px;
  position: relative;
  border-radius: 5px;
  border: 1px solid #eee;
  backdrop-filter: blur(9px);
`;

const MajorSymbolShadow = styled.div`
  width: 112px;
  height: 112px;
  position: absolute;
  fill: radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0) 100%);
  margin-top: 16px;
  margin-left: 3px;
`;

const BigMajorSymbolBox = styled.div`
  width: 394px;
  height: 571px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(231.86% 143.11% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const CompetitionRateBox = styled.div`
  width: 393px;
  height: 274px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const ThreeYearCumulativeDataBox = styled.div`
  width: 394px;
  height: 571px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  //backdrop-filter: blur(12px);
`;

const EachYearHeadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 362px;
  height: 44px;
  border-radius: 5px;
  border: 1px solid #eee;
  box-shadow: 0px 2.91057px 145.52846px 0px rgba(20, 20, 20, 0.05);
  margin-top: 10px;
  margin-left: 16px;
`;

const RangeBox = styled.div`
  width: 1241px;
  height: 252px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const Graph_1_1Box = styled.div`
  width: 676px;
  height: 520px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const Graph_2_1Box = styled.div`
  width: 676px;
  height: 288px;
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

const Graph_2Box = styled.div`
  width: 535px;
  height: 828px;
  flex-shrink: 0;
  fill: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  stroke-width: 1px;
  stroke: var(--DF_Grey-2, #dfdfdf);
  border-radius: 10px;
  border: 1px solid var(--DF_Grey-2, #dfdfdf);
  background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);
`;

// ----------------ImageBox----------------
const CharacterImageBox = styled.div`
  margin-left: 128.01px;
  margin-top: 150px;
`;

const CharacterImage = styled.img`
  width: 111px;
  height: 111px;
  object-fit: cover;

  /*
  width: 179.618px;
  height: 179.618px;
  //background: lightgray;
  position: absolute;
  top: 2.02x;
  left: -34px;
  */
`;

const MajorSymbol = styled.img`
  width: 48.345px;
  height: 63.473px;
  //margin-top: -12.4px; // 11.6
  //margin-left: 15.29px; // 40.29
  position: absolute;
  left: 40.29px;
  top: 11.6px;
`;

const BigMajorSymbol = styled.img`
  width: 100%; // 184px;
  height: 100%; // 241px;
  object-fit: fill;
`;

// ----------------SVG----------------

const BlurWrapper = styled.div`
  display: flex;
  width: 1242px;
  height: 829px;
  border-radius: 10px;
  background: rgba(248, 248, 248, 0.45);
  backdrop-filter: blur(15px);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  position: absolute;
  top: 1045px; // 1115px;
  left: 550px;
  z-index: 2;
`;

const BlurMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  margin: 0 auto;
  gap: 24px;
`;
// ---------------Blur Wrapper for non-applied user---------------

const BoxTitleText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-style: normal;
  line-height: 100%;
  font-size: 20px;
  font-weight: 700;
  margin-top: 26px;
  margin-left: 36px;
  margin-bottom: 14px;
`;
