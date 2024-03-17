import { styled } from 'styled-components';
import { mockHashes } from './Header';
import Card from '../../assets/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import client from '../../utils/HttpClient';
import { useNavigate } from 'react-router-dom';
import Card01 from '../../assets/cards/Card01';
import DropDown02 from '../../assets/dropdown/DropDown02';

// 정렬 임의로 넣어 둠 (에셋 완성되면 적용할 예정)

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

// const sortOptions = ['가나다순', '선발인원순', '경쟁률순', '평균학점순', '최저학점순'];

const Cards = ({ clicked, searchWord }: CardsProps) => {
  const [cards, setCards] = useState(mockCards);
  const [sortCriterion, setSortCriterion] = useState('가나다순');
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

  const handleSortChange = (criterion: string) => {
    setSortCriterion(criterion);
  };

  const filteredCards = cards
    .filter((card) => {
      if (clicked !== 4 && !card.filter.includes(mockHashes[clicked])) return false; // filter based on clicked hashtag
      if (searchWord && !card.korName.toLowerCase().includes(searchWord.toLowerCase())) return false; // filter based on search word
      return true;
    })
    .sort((a, b) => {
      switch (sortCriterion) {
        case '가나다순':
          return a.korName.localeCompare(b.korName);
        case '선발인원순':
          return a.TO - b.TO;
        case '경쟁률순':
          return a.compRate - b.compRate;
        case '평균학점순':
          return a.avgPass - b.avgPass;
        case '최저학점순':
          return a.minPass - b.minPass;
        default:
          return a.korName.localeCompare(b.korName);
      }
    });

  const filteredSet = new Set(filteredCards.map((card) => card.korName));

  const opaCards = cards.filter((card) => !filteredSet.has(card.korName));

  return (
    <Container>
      <FlexContainer>
        <Sort>
          {/*{mockHashes[clicked]}*/}
          {/*{clicked > 0 && clicked < 4 && ' 정렬'}*/}
          <DropDown02
            optionList={['가나다순', '선발인원순', '경쟁률순', '평균학점순', '최저학점순']}
            value={sortCriterion}
            setValue={setSortCriterion}
          />
        </Sort>
        {filteredCards.map((card) => (
          <Card01 {...card} />
        ))}
      </FlexContainer>
      <FlexContainer style={{ marginTop: opaCards.length == 0 ? '0px' : '1.66vw' }}>
        {opaCards.map((card) => (
          <div style={{ opacity: 0.5 }}>
            <Card01 {...card} />
          </div>
        ))}
      </FlexContainer>
    </Container>
  );
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 1.66vw;
  column-gap: 1.31vw;
  width: 100%;
  max-width: 69vw; // 68.75vw;
  //margin-top: 0.83vw;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  max-width: 1920px;
  background-color: #fff;
  padding-bottom: 7.64vw;

  z-index: 0;
`;

const Sort = styled.div`
  width: 100%;
  // margin-top: 4.32vw;
  // margin-bottom: 4.6875vw;
  height: auto;
`;

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

export default Cards;
