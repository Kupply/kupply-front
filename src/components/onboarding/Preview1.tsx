import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RankingTable from './RankingTable';
import CTA02 from '../../assets/CTAs/CTA02';
import { client } from '../../utils/HttpClient';
import Typography from '../../assets/Typography';
import { isDateInRange, isPeriodPassed, currentMonth } from '../../common/ApplicationPeriod';
import { tab } from '@testing-library/user-event/dist/tab';

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

function Preview1() {
  const navigate = useNavigate();

  const [isLogined, setisLogined] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  const [tableData, setTableData] = useState<ITableData[]>(dummyData);
  //const [tableData, setTableData] = useState<ITableData[]>([]);

  useEffect(() => {
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

    if (isLogined) loadData();
  }, [isLogined]);

  // 회원의 모의지원 여부에 따라 테이블 블러 여부를 결정한다.
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    const appliedValue = localStorage.getItem('isApplied');
    if (appliedValue !== null) {
      setIsApplied(appliedValue === 'true');
    }
  }, []);

  return (
    <MainWrapper>
      <ContentWrapper>
        <Typography size="0.94vw" bold="700" color="#D85888">
          실시간 지원현황
        </Typography>
        <Typography size="2.5vw" bold="700" style={{ lineHeight: '121.88%', margin: '0.42vw 0 1.46vw 0' }}>
          쿠플라이 모의지원 현황을 실시간으로 확인해보세요
        </Typography>
        <Typography
          size="1.04vw"
          bold="500"
          color="rgba(20,20,20,0.6)"
          style={{ lineHeight: '120%', opacity: 0.8, marginBottom: '5.94vw' }}
        >
          쿠플라이 모의지원 현황을 통해 <br /> 이중전공 학과의 이번 학기 경쟁률을 예측할 수 있어요.
        </Typography>
        <RankingTable tableData={tableData} />
      </ContentWrapper>
      {!isLogined ? (
        <>
          <Blur />
          <ButtonWrapper>
            <Typography size="1.57vw" bold="700" color="#2C323A" style={{ textAlign: 'center', lineHeight: '131.58%' }}>
              고파스 아이디로 로그인하고 <br /> 이중전공 모의지원 현황을 확인해보세요
            </Typography>
            <CTA02
              onClick={() => {
                navigate('/login');
              }}
              size="small"
              style={{ marginTop: '1.24vw' }}
            >
              로그인하러 가기
            </CTA02>
          </ButtonWrapper>
        </>
      ) : isDateInRange ? (
        // 모의지원 기간 내
        isApplied ? null : (
          <>
            <Blur />
            <ButtonWrapper>
              <Typography
                size="1.57vw"
                bold="700"
                color="#2C323A"
                style={{ textAlign: 'center', lineHeight: '131.58%' }}
              >
                지금 희망 전공에 모의지원하고 <br /> 실시간 전체 모의지원 현황을 확인해보세요.
              </Typography>
              <CTA02
                onClick={() => {
                  navigate('/myboard');
                }}
                size="small"
                style={{ marginTop: '1.24vw' }}
              >
                나도 모의지원 하러가기
              </CTA02>
            </ButtonWrapper>
          </>
        )
      ) : isPeriodPassed ? (
        currentMonth === 6 || currentMonth === 7 ? ( // 1학기 모의지원 종료 후 (6월, 7월)
          <>
            <Blur>
              <Typography size="1.57vw" bold="700" style={{ textAlign: 'center', lineHeight: '131.58%', opacity: 0.8 }}>
                1학기 모의지원 서비스는 종료되었습니다.
              </Typography>
            </Blur>
          </>
        ) : (
          // 2학기 모의지원 종료 후 (12월, 1월)
          <>
            <Blur>
              <Typography size="1.57vw" bold="700" style={{ textAlign: 'center', lineHeight: '131.58%', opacity: 0.8 }}>
                2학기 모의지원 서비스는 종료되었습니다.
              </Typography>
            </Blur>
          </>
        )
      ) : // 학기 시작 이후 모의지원 기간 전
      currentMonth < 5 ? (
        <>
          <Blur>
            <Typography
              size="1.57vw"
              bold="700"
              style={{ textAlign: 'center', lineHeight: '131.58%', opacity: 0.8, marginBottom: '1vw' }}
            >
              1학기 모의지원 서비스는 5월 1일 오픈됩니다.
              <br /> 기다리는 동안 과거 합격자료를 살펴보며 이중전공을 준비해요!
            </Typography>
            <CTA02 onClick={() => navigate('/archive')}>과거 합격자료 보러가기</CTA02>
          </Blur>
        </>
      ) : (
        <>
          <Blur>
            <Typography
              size="1.57vw"
              bold="700"
              style={{ textAlign: 'center', lineHeight: '131.58%', opacity: 0.8, marginBottom: '1vw' }}
            >
              2학기 모의지원 서비스는 11월 1일 오픈됩니다.
              <br /> 기다리는 동안 과거 합격자료를 살펴보며 이중전공을 준비해요!
            </Typography>
            <CTA02 onClick={() => navigate('/archive')}>과거 합격자료 보러가기</CTA02>
          </Blur>
        </>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 66.43vw;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 67.34vw;
  margin-top: 11.46vw;
  margin-left: 15.63vw;
  display: flex;
  flex-direction: column;
`;

const Blur = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 68.56vw;
  height: 33vw;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(7.5px);
  position: absolute;
  top: 30.82%;
  left: 15.63%;
  -webkit-backdrop-filter: blur(10px);
`;

const ButtonWrapper = styled.div`
  width: 67.34vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 15.63%;
  z-index: 20;
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

export default Preview1;
