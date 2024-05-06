import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../assets/Typography';
import RankingTable from './RankingTable';
import CTA02 from '../../assets/CTAs/CTA02';
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

function Preview1() {
  const navigate = useNavigate();

  const [isLogined, setisLogined] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  const [tableData, setTableData] = useState<ITableData[]>(dummyData);
  const currentDate = new Date();
  const startDate = new Date('2024-05-10');
  const endDate = new Date('2024-05-31');
  const isDateInRange = currentDate >= startDate && currentDate <= endDate;

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await client.get('/landing');
        setTableData(response.data.data);
      } catch (e) {
        alert(e);
      }
    };

    if (isLogined) loadData();
  }, [isLogined]);

  return (
    <MainWrapper>
      <ContentWrapper>
        <Typography size="0.94vw" bold="700" color="#D85888">
          실시간 모의지원
        </Typography>
        <Typography size="2.5vw" bold="700" style={{ lineHeight: '121.88%', margin: '0.42vw 0 1.46vw 0' }}>
          모의지원 현황을 실시간으로 확인하세요.
        </Typography>
        <Typography
          size="1.04vw"
          bold="500"
          color="rgba(20,20,20,0.6)"
          style={{ lineHeight: '120%', opacity: 0.8, marginBottom: '5.94vw' }}
        >
          쿠플라이 모의지원 현황을 통해 <br /> 내가 희망하는 학과의 실시간 경쟁률을 확인하세요!
        </Typography>
        <RankingTable tableData={tableData} />
      </ContentWrapper>
      {!isLogined ? (
        <>
          <Blur />
          <ButtonWrapper>
            <Typography size="1.57vw" bold="700" color="#2C323A" style={{ textAlign: 'center', lineHeight: '131.58%' }}>
              지금 쿠플라이에 회원가입하고 <br /> 이중전공 모의지원 현황을 확인해보세요.
            </Typography>
            <CTA02
              onClick={() => {
                navigate('/signup0');
              }}
              size="small"
              style={{ marginTop: '1.24vw' }}
            >
              회원가입하러 가기
            </CTA02>
          </ButtonWrapper>
        </>
      ) : isDateInRange ? null : (
        <>
          <Blur />
          <ButtonWrapper>
            <Typography size="1.57vw" bold="700" color="#2C323A" style={{ textAlign: 'center', lineHeight: '131.58%' }}>
              모의지원 가능 기간은 5월 10일부터 5월 17일입니다. <br /> 기다리는 동안 과거 합격자료 살펴보며 이중전공을
              준비해요!
            </Typography>
            <CTA02
              onClick={() => {
                navigate('/archive');
              }}
              size="small"
              style={{ marginTop: '1.24vw' }}
            >
              과거 합격자료 보러가기
            </CTA02>
          </ButtonWrapper>
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
  width: 68.56vw;
  height: 100vw;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(7.5px);
  position: absolute;
  top: 30.82%;
  left: 15.63%;
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
