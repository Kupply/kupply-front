import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import Typography from '../../assets/Typography';
import Card01 from '../../assets/cards/Card01';
import MainCard from './MainCard';
import SubCard from './SubCards';
import client from '../../utils/HttpClient';

function Banner() {
  const [cards, setCards] = useState(mockCards);
  const [isDetailed, setIsDetailed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSemester = '23-2';

  // const fetch = async () => {
  //   const data = await client.get('/dashboard/cards');
  //   console.log(data.data);
  //   setCards(
  //     cards.map((c) => {
  //       const res = data.data.find((ca: any) => ca.name === c.korName);
  //       return {
  //         korName: c.korName,
  //         engName: c.engName,
  //         filter: c.filter,
  //         TO: c.TO,
  //         semester: prevSemester,
  //         avgPass: res.passNum === 0 ? 0 : +(res.avg / res.passNum).toFixed(2),
  //         minPass: res.passNum === 0 ? 0 : res.min,
  //         compRate: +(res.passNum / c.TO).toFixed(2),
  //       };
  //     }),
  //   );
  // };
  // useEffect(() => {
  //   fetch();
  // });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [cards.length]);

  useEffect(() => {
    setIsDetailed(false);
    const timeoutId = setTimeout(() => {
      setIsDetailed(true);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  const calculateIndex = (index: number) => {
    const length = cards.length;
    return (index + length) % length;
  };

  return (
    <MainWrapper>
      <Typography size="0.94vw" bold="700" color="rgba(255,255,255,0.5)" style={{ margin: '5.21vw 0 0.42vw 0' }}>
        합격자료
      </Typography>
      <div style={{ display: 'felx' }}>
        <Typography size="2.5vw" bold="700" color="#FFF" style={{ lineHeight: '121.875%' }}>
          쿠플라이가 모아주는 고려대학교 인기 이중전공 정보모음
        </Typography>
        <Typography size="2.5vw" bold="300" color="#FFF" style={{ lineHeight: '121.875%' }}>
          .zip
        </Typography>
      </div>
      <Typography size="1.04vw" bold="500" color="#FFF" style={{ margin: '0.89vw 0 0.42vw 0' }}>
        쿠플라이가 현재 서비스 제공 중인 이준전공 학과의 정보들이에요.
      </Typography>
      <Typography size="1.04vw" bold="500" color="#FFF">
        앞으로 더 추가될 학과들을 기대해 주세요!
      </Typography>
      <ImageWrapper>
        <div style={{ display: 'flex', gap: '2.11vw' }}>
          {[-3, -2, -1].map((offset) => (
            <SubImage key={offset}>
              <SubCard {...cards[calculateIndex(currentIndex + offset)]} />
            </SubImage>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '2.11vw' }}>
          {[1, 2, 3].map((offset) => (
            <SubImage key={offset}>
              <SubCard {...cards[calculateIndex(currentIndex + offset)]} />
            </SubImage>
          ))}
        </div>
      </ImageWrapper>
      <CellPhone></CellPhone>
      <Notch src="../../designImage/onboarding/Notch.png" />
      <MainImage>
        <MainCard isDetailed={isDetailed} {...cards[currentIndex]} />
      </MainImage>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 52.66vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../../designImage/onboarding/Banner.png');
  background-size: cover;
  position: relative;
`;

const CellPhone = styled.div`
  width: 18.75vw;
  height: 34.09vw;
  border-top: 0.83vw solid #f3f4f8;
  border-left: 0.83vw solid #f3f4f8;
  border-right: 0.83vw solid #f3f4f8;
  background-color: #fff;
  border-radius: 2.72vw 2.72vw 0 0;
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 40.64vw;
  box-shadow: -36px 0 36px rgba(0, 0, 0, 0.3);
`;

const Notch = styled.img`
  width: 8.1vw;
  height: 1.58vw;
  position: absolute;
  top: 18.5vw;
  left: 46.84vw;
  z-index: 10;
`;

const ImageWrapper = styled.div`
  width: 102.08vw;
  height: 16.88vw;
  display: flex;
  justify-content: space-between;
  margin-top: 14.36vw;
`;

const MainImage = styled.div`
  width: 14.63vw;
  height: 19.69vw;
  position: absolute;
  top: 25.82vw;
  left: 43.41vw;
  z-index: 10;
`;

const SubImage = styled.div`
  width: 13vw;
  height: 17.5vw;
  border-radius: 0.42vw;
  background-color: aliceblue;
`;

const mockCards = [
  {
    korName: '경영대학 경영학과',
    engName: 'Business School',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 37,
    compRate: 4.23,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '심리학부',
    engName: 'School of Psychology',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 27,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 경제학과',
    engName: 'Department of Economics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 29,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 통계학과',
    engName: 'Department of Statistics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 29,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '미디어학부',
    engName: 'School of Media & Communication',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 21,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정보대학 컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 20,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '생명과학대학 식품자원경제학과',
    engName: 'Department of Food & Resources',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 21,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '이과대학 수학과',
    engName: 'Department of Mathematics',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 7,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '이과대학 화학과',
    engName: 'Department of Chemistry',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 10,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },

  ////// 학과 추가 (3/20) //////
  ///////////////////////////

  {
    korName: '생명과학대학 생명공학부',
    engName: 'Biological Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 11,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '생명과학대학 생명과학부',
    engName: 'School of Life Sciences',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 3,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 정치외교학과',
    engName: 'Department of Political Science & International Relations',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 27,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 행정학과',
    engName: 'Department of Public Administration',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 7,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 신소재공학부',
    engName: 'School of Materials Science & Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 5,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 기계공학부',
    engName: 'School of Mechanical Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 6,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 산업경영공학부',
    engName: 'School of Industrial & Management Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 7,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 전기전자공학부',
    engName: 'School of Electrical Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 14,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 화공생명공학부',
    engName: 'Department of Chemical & Biological Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 7,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정보대학 데이터과학과',
    engName: 'Department of Data Science',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 9,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '스마트보안학부 스마트보안학부',
    engName: 'Division of Smart Security',
    filter: ['학부 전체보기', '독립학부'],
    TO: 3,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
];

export default Banner;
