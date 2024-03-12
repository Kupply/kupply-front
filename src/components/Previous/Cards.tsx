import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../assets/Typography';
import { mockHashes } from './Header';
import Card01 from '../../assets/cards/Card01';
import client from '../../utils/HttpClient';

export interface CardsProps {
  clicked: number;
  searchWord: string;
}

// korName: c.korName,
// engName: c.engName,
// filter: c.filter,
// TO: c.TO,
// semester: c.semester,
// avgPass: res.avg,
// minPass: res.min,
// pass: res.passNum,

// Card01의 prop과 맞도록 수정
// 지원자 수에 대한 데이터가 없어서 경쟁률은 계산하지 못함
const mockCards = [
  {
    korName: '경영대학 경영학과',
    engName: 'Business School',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 42,
    compRate: 4.23,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '심리학부',
    engName: 'School of Psychology',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 44,
    compRate: 7,
    avgPass: 4.23,
    semester: '23-2',
    minPass: 4.12,
  },
  {
    korName: '정경대학 경제학과',
    engName: 'Department of Economics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 13,
    compRate: 7,
    avgPass: 4.23,
    semester: '23-2',
    minPass: 4.12,
  },
  {
    korName: '정경대학 통계학과',
    engName: 'Department of Statistics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 28,
    compRate: 7,
    avgPass: 4.23,
    semester: '23-2',
    minPass: 4.12,
  },
  {
    korName: '미디어학부',
    engName: 'School of Media & Communication',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 25,
    compRate: 7,
    semester: '23-2',
    avgPass: 4.23,
    minPass: 4.12,
  },
  {
    korName: '정보대학 컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 19,
    compRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '생명과학대학 식품자원경제학과',
    engName: 'Department of Food & Resources',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 30,
    compRate: 7,
    avgPass: 4.23,
    semester: '23-2',
    minPass: 4.12,
  },
  {
    korName: '이과대학 수학과',
    engName: 'Department of Mathematics',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 17,
    compRate: 7,
    semester: '23-2',
    avgPass: 4.23,
    minPass: 4.12,
  },
  {
    korName: '이과대학 화학과',
    engName: 'Department of Chemistry',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 11,
    compRate: 7,
    semester: '23-2',
    avgPass: 4.23,
    minPass: 4.12,
  },
];

const Cards = ({ clicked, searchWord }: CardsProps) => {
  const [cards, setCards] = useState(mockCards);
  const navigate = useNavigate();
  // const [cookies] = useCookies(['accessToken']);
  // const accessToken = cookies.accessToken;
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   withCredentials: true,
  // };

  // 이게 원래 fetch function 이지만 /archive access를 위해 임시로 fetch function 만듦
  // const fetch = async () => {
  //   try {
  //     const isLogined = window.localStorage.getItem('isLogin');

  //     if (isLogined !== 'true') {
  //       alert('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
  //       navigate('/login');
  //     } else {
  //       // const data = await axios.get('http://localhost:8080/dashboard/cards', config);
  //       const data = await client.get('/dashboard/cards');
  //       setCards(
  //         cards.map((c) => {
  //           const res = data.data.find((ca: any) => ca.name === c.korName);
  //           return {
  //             korName: c.korName,
  //             engName: c.engName,
  //             filter: c.filter,
  //             TO: c.TO,
  //             semester: c.semester,
  //             avgPass: res.avg,
  //             minPass: res.min,
  //             compRate: res.passNum,
  //           };
  //         }),
  //       );
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // 임시적으로 만든 fetch function
  const fetch = async () => {
    const data = await client.get('/dashboard/cards');
    setCards(
      cards.map((c) => {
        const res = data.data.find((ca: any) => ca.name === c.korName);
        return {
          korName: c.korName,
          engName: c.engName,
          filter: c.filter,
          TO: c.TO,
          semester: c.semester,
          avgPass: res.avg,
          minPass: res.min,
          compRate: res.passNum,
        };
      }),
    );
  };
  useEffect(() => {
    fetch();
  });

  const filteredCards = cards
    .filter((card) => {
      if (clicked !== 4 && !card.filter.includes(mockHashes[clicked])) return false; // filter based on clicked hashtag
      if (searchWord && !card.korName.toLowerCase().includes(searchWord.toLowerCase())) return false; // filter based on search word
      return true;
    })
    .sort((a, b) => a.korName.localeCompare(b.korName)); // always sort alphabetically

  const filteredSet = new Set(filteredCards.map((card) => card.korName));

  const opaCards = cards.filter((card) => !filteredSet.has(card.korName));

  return (
    <MainWrapper>
      <Typography size="1.25vw" bold="600" color="#A8A8A8" style={{ margin: '0 0 0.47vw 15.62vw' }}>
        {mockHashes[clicked]}
        {clicked > 0 && clicked < 4 && ' 정렬'}
      </Typography>
      <CardWrapper>
        {filteredCards.map((card) => (
          <Card01 {...card} />
        ))}
      </CardWrapper>
      <CardWrapper style={{ marginTop: opaCards.length == 0 ? '0px' : '50px' }}>
        {opaCards.map((card) => (
          <div style={{ opacity: 0.5 }}>
            <Card01 {...card} />
          </div>
        ))}
      </CardWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 128px 0 15.16vw 0;
  background-color: #fff;
  position: relative;
  z-index: 0;
`;

const CardWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.25vw;
  margin: 1.25vw 15.62vw 0 15.62vw;
`;

export default Cards;
