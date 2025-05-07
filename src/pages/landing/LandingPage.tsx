import React, { useRef, useState, useEffect, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import RankingTable from '../../components/landing/RankingTable';
import PassedDataCard from '../../components/landing/PassedDataCard';
import Preview from '../../components/landing/Preview';
import FAQ from '../../components/landing/OldFAQ';
import Ending from '../../components/landing/Ending';
import TextFieldBox from '../../assets/OldTextFieldBox';
import Typography from '../../assets/OldTypography';
import axios from 'axios';
import { client } from '../../utils/HttpClient';
import { ICardData } from '../../components/landing/PassedDataCard';
import { Card } from '@mui/material';
import {Card02} from '../../assets/cards/Card02';

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

const GlobalStyle = createGlobalStyle`
  body {
    scroll-behavior: smooth;
  }
`;

const ScrollToY = (to: number, duration: number) => {
  if (duration <= 0) return;
  const difference = to - window.scrollY;
  const perTick = (difference / duration) * 10;

  setTimeout(() => {
    window.scrollTo(0, window.scrollY + perTick);
    if (window.scrollY === to) return;
    ScrollToY(to, duration - 10);
  }, 10);
};

const LandingPage = () => {
  const [tableData, setTableData] = useState<ITableData[]>([]);

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

  const cardData = tableData.map((data) => ({
    name: data.secondMajor,
    eng: data.engName,
    합격자수: data.pastPassedNum,
    선발인원: data.pastRecruitNumber,
    min: data.pastmin,
    mean: data.pastmean,
    semester: '23-1',
    imagesrc: data.imagesrc,
  }));

  const tableContent = useRef<HTMLDivElement>(null);

  const onClickDownArrow = () => {
    tableContent.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const delay = 500;

    setTimeout(() => {
      const targetY = 330;
      ScrollToY(targetY, 700); // 스크롤 애니메이션 지속 시간을 설정할 수 있습니다.
    }, delay);
  }, []);

  const isWithinTimeRange = () => {
    const now = new Date();
    const startTime = new Date('2023-11-06T09:00:00'); //2023-11-08로 고쳐야함
    const endTime = new Date('2023-11-30T23:59:59');

    return now >= startTime && now <= endTime;
  };

  return (
    <Wrapper>
      <HeadImageWrapper translateY={scrollY}>
        <img src="../../designImage/landing/LandingImage.png" style={{ width: '1248px', height: '880px' }}></img>
        <HeadTextWrapper>
          <Typography size="mediumText" color="#D85888">
            {isWithinTimeRange() ? '실시간 지원현황' : '실시간 지원현황'}
          </Typography>
          <Typography size="heading1" style={{ marginTop: '14px' }}>
            {isWithinTimeRange()
              ? '쿠플라이 실시간 이중전공 모의지원 현황'
              : '지금은 모의지원 기간이 (11/6-11/10) 아닙니다.'}
          </Typography>
          <Typography
            color="rgba(20, 20, 20, 0.60)"
            style={{ marginTop: '12px', fontSize: '30px', marginBottom: '25px' }}
          >
            {isWithinTimeRange()
              ? '실시간으로 업데이트 되는 이중전공 지원 현황을 살펴보세요!'
              : '스크롤을 내려 쿠플라이가 제공하는 다른 서비스들을 살펴보세요.'}
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="51"
            viewBox="0 0 50 51"
            fill="none"
            style={{ cursor: 'pointer' }}
            onClick={onClickDownArrow}
          >
            <path
              d="M14.584 27.5967L25.0007 38.0133L35.4173 27.5967"
              stroke="#D85888"
              stroke-opacity="0.6"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.584 13.0137L25.0007 23.4303L35.4173 13.0137"
              stroke="#D85888"
              stroke-opacity="0.6"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </HeadTextWrapper>
      </HeadImageWrapper>
      <div ref={tableContent} style={{ marginBottom: '120px' }}></div>
      <PassedDataCard cardData={cardData} />
      <Preview />
      <FAQ />
      <Ending />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1920px;
`;

const HeadImageWrapper = styled.div<{ translateY: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 400px;
  transform: ${(props) => `translateY(${props.translateY}px)`};
`;

const HeadTextWrapper = styled.div`
  position: relative;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LandingPage;
