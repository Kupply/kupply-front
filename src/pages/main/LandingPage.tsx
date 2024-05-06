import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Banner from '../../components/landing/Banner';
import RankingTable from '../../components/landing/RankingTable';
import FAQ from '../../components/landing/FAQ';
import ProfileBox from '../../components/myBoard/ProfileBox';
import client from '../../utils/HttpClient';

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

  // useEffect(() => {
  //   if (location.state?.fromButton) {
  //     smoothScrollTo(1100, 1500);
  //   }
  // }, [location.state]);

  // useEffect(() => {
  //   if (location.state?.fromButton) {
  //     window.scrollTo(0, 1100);
  //   }
  // }, [location.state]);

  useEffect(() => {
    if (location.state?.fromButton) {
      scrollToQ();
    }
  }, [location.state]);

  const [CurrentPic, setCurrentPic] = useState('');
  const [userData, setUserData] = useState(() => ({
    userName: '고대빵',
    userNickname: '빵대고대빵',
    userProfilePic: CurrentPic,
    userProfileLink: '',
    userRole: 'candidate',
    firstMajor: 'media',
    studentId: '2021160009',
    hopeMajor1: 'business',
    hopeMajor2: 'computer',
    curGPA: 4.5,
    hopeSemester: '2023-2',
  }));

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

  const [tableData, setTableData] = useState<ITableData[]>(dummyData);

  useEffect(() => {
    const loadData = async () => {
      try {
        // const response = await axios.get('http://localhost:8080/landing');
        const response = await client.get('/landing');
        setTableData(response.data.data);
      } catch (e) {
        alert(e);
      }
    };
    loadData();
  }, []);

  // const cardData = tableData.map((data) => ({
  //   name: data.secondMajor,
  //   eng: data.engName,
  //   합격자수: data.pastPassedNum,
  //   선발인원: data.pastRecruitNumber,
  //   min: data.pastmin,
  //   mean: data.pastmean,
  //   semester: '23-1',
  //   imagesrc: data.imagesrc,
  // }));

  // const tableContent = useRef<HTMLDivElement>(null);

  // const onClickDownArrow = () => {
  //   tableContent.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // const [scrollY, setScrollY] = useState(0);

  const faqRef = useRef<HTMLDivElement>(null);
  const rankRef = useRef<HTMLDivElement>(null);

  return (
    <MainWrapper>
      <Side>
        <ProfileBox userData={userData} />
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
  );
}

const MainWrapper = styled.div`
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
