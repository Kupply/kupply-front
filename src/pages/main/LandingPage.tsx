import styled from 'styled-components';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import Banner from '../../components/landing/Banner';
import RankingTable from '../../components/landing/RankingTable';
import FAQ from '../../components/landing/FAQ';
import ProfileBox from '../../components/myBoard/ProfileBox';
import { client } from '../../utils/HttpClient';

export interface ITableData {
  rank: number;
  secondMajor: string;
  engName: string;
  pastRecruitNumber: number;
  recruitNumber: number;
  applyNumber: number;
  competition: number;
  pastPassedRate: number;
  pastPassedNum: number;
  pastmin: number;
  pastmean: number;
  interest: number;
  interestedNum: number; //지망 아니면 0, n지망일경우 n이다.
  imagesrc: string;
}

function LandingPage() {
  const location = useLocation();

  const scrollToQ = () => {
    if (faqRef.current) {
      const yOffset = -100;
      const y = faqRef.current.getBoundingClientRect().top + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const smoothScrollTo = (target: number, duration: number): void => {
    const startPosition: number = window.pageYOffset;
    const distance: number = target - startPosition;
    const startTime: number = performance.now();

    const ease = (time: number, start: number, distance: number, duration: number): number => {
      time /= duration / 2;
      if (time < 1) return (distance / 2) * time * time + start;
      time--;
      return (-distance / 2) * (time * (time - 2) - 1) + start;
    };

    const animation = (currentTime: number): void => {
      const timeElapsed: number = currentTime - startTime;
      const run: number = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const [isLogined, setisLogined] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  useEffect(() => {
    if (location.state?.fromButton) {
      scrollToQ();
    }
  }, [location.state]);

  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [CurrentPic, setCurrentPic] = useState('');
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
  const [tableData, setTableData] = useState<ITableData[]>(dummyData);

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

  const loadData = async () => {
    try {
      const response = await client.get('/landing');
      if (response.data.data.length > 0) {
        setTableData(response.data.data);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (isLogined) {
      getMe();
      loadData();
    }
  }, [isLogined]);

  const faqRef = useRef<HTMLDivElement>(null);
  const rankRef = useRef<HTMLDivElement>(null);

  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const onClickEditModal = () => {
    setOpenEditModal(true);
  };
  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  return (
    <>
      {userData.userRole === 'passer' ? (
        <MainWrapper2>
          <Content>
            <Banner
              scrollToFAQ={() => {
                if (faqRef.current) {
                  const yOffset = -100;
                  const y = faqRef.current.getBoundingClientRect().top + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            />
            <FAQ ref={faqRef} />
          </Content>
        </MainWrapper2>
      ) : (
        <MainWrapper>
          <Side>
            <ProfileBox
              userData={userData}
              isApplied={isApplied}
              isOpenEditModal={isOpenEditModal}
              setOpenEditModal={setOpenEditModal}
              closeEditModal={closeEditModal}
              onClickEditModal={onClickEditModal}
              locationUsed="Landing"
            />
          </Side>
          <Content>
            <Banner
              scrollToFAQ={() => {
                if (faqRef.current) {
                  const yOffset = -100;
                  const y = faqRef.current.getBoundingClientRect().top + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
            />
            <RankingTable tableData={tableData} ref={rankRef} />
            <FAQ ref={faqRef} />
          </Content>
        </MainWrapper>
      )}
    </>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  background: #fefafb;
`;

const MainWrapper2 = styled.div`
  position: relative;
  justify-content: center;
  width: 100vw;
  height: auto;
  display: flex;
  background: #fefafb;
`;

const Side = styled.div`
  width: 27.29vw;
  height: auto;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 72.71vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const dummyData = [
  {
    rank: 1,
    secondMajor: '경영대학',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 1,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 2,
    secondMajor: '미디어학부',
    engName: 'School of Media & Communication',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 2,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 3,
    secondMajor: '컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 4,
    secondMajor: '식품자원경제학과',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 1,
    secondMajor: '경영대학',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 1,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 2,
    secondMajor: '미디어학부',
    engName: 'School of Media & Communication',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 2,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 3,
    secondMajor: '컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
  {
    rank: 4,
    secondMajor: '식품자원경제학과',
    engName: 'Business School',
    pastRecruitNumber: 12,
    recruitNumber: 12,
    applyNumber: 32,
    competition: 2.7,
    pastPassedRate: 3.59,
    pastPassedNum: 4.46,
    pastmean: 4.46,
    pastmin: 4.46,
    interest: 56,
    interestedNum: 0,
    imagesrc: '../../designImage/landing/interest.svg',
  },
];

export default LandingPage;
