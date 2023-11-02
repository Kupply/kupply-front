import { styled } from 'styled-components';
import { mockHashes } from './Header';
import Card from '../../assets/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import client from '../../utils/httpClient';
import { useNavigate } from 'react-router-dom';

export interface CardsProps {
  clicked: number;
  searchWord: string;
}

const mockCards = [
  {
    name: '경영대학 경영학과',
    eng: 'Business School',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 42,
    pass: 7,
    avg: 4.23,
    min: 4.12,
    semester: '2023-1R',
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/previous_detail/business.png',
  },
  {
    name: '심리학부',
    eng: 'School of Psychology',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 44,
    pass: 7,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/psycho.png',
    titleSrc: '/design_image/previous_detail/psycho.png',
  },
  {
    name: '정경대학 경제학과',
    eng: 'Department of Economics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 13,
    pass: 7,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/political.png',
    titleSrc: '/design_image/previous_detail/political.png',
  },
  {
    name: '정경대학 통계학과',
    eng: 'Department of Statistics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 28,
    pass: 7,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/political.png',
    titleSrc: '/design_image/previous_detail/political.png',
  },
  {
    name: '미디어학부',
    eng: 'School of Media & Communication',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 25,
    pass: 7,
    semester: '2023-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/media.png',
    titleSrc: '/design_image/previous_detail/media.png',
  },
  {
    name: '정보대학 컴퓨터학과',
    eng: 'Department of Computer Science & Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 19,
    pass: 7,
    avg: 4.23,
    min: 4.12,
    semester: '2023-1R',
    src: '/design_image/previous/info.png',
    titleSrc: '/design_image/previous_detail/info.png',
  },
  {
    name: '생명과학대학 식품자원경제학과',
    eng: 'Department of Food & Resources',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 30,
    pass: 7,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/bio.png',
    titleSrc: '/design_image/previous_detail/bio.png',
  },
  {
    name: '이과대학 수학과',
    eng: 'Department of Mathematics',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 17,
    pass: 7,
    semester: '2023-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/science.png',
    titleSrc: '/design_image/previous_detail/science.png',
  },
  {
    name: '이과대학 화학과',
    eng: 'Department of Chemistry',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 11,
    pass: 7,
    semester: '2023-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/science.png',
    titleSrc: '/design_image/previous_detail/science.png',
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

  const fetch = async () => {
    try {
      const isLogined = window.localStorage.getItem('isLogin');
      if (isLogined !== 'true') {
        alert('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
        navigate('/login');
      }
      else{
        // const data = await axios.get('http://localhost:8080/dashboard/cards', config);
      const data = await client.get('/dashboard/cards');
      setCards(
        cards.map((c) => {
          const res = data.data.find((ca: any) => ca.name === c.name);
          return {
            name: c.name,
            eng: c.eng,
            filter: c.filter,
            TO: c.TO,
            semester: c.semester,
            src: c.src,
            titleSrc: c.titleSrc,
            avg: +(res.avg / res.passNum).toFixed(2),
            min: res.min,
            pass: res.passNum,
          };
        }),
      );
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch();
  });

  const filteredCards = cards
    .filter((card) => {
      if (clicked !== 4 && !card.filter.includes(mockHashes[clicked])) return false; // filter based on clicked hashtag
      if (searchWord && !card.name.toLowerCase().includes(searchWord.toLowerCase())) return false; // filter based on search word
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // always sort alphabetically

  const filteredSet = new Set(filteredCards.map((card) => card.name));

  const opaCards = cards.filter((card) => !filteredSet.has(card.name));

  return (
    <Container>
      <Sort>
        {mockHashes[clicked]}
        {clicked > 0 && clicked < 4 && ' 정렬'}
      </Sort>
      <FlexContainer>
        {filteredCards.map((card) => (
          <Card {...card} />
        ))}
      </FlexContainer>
      <FlexContainer style={{ marginTop: opaCards.length == 0 ? '0px' : '50px' }}>
        {opaCards.map((card) => (
          <div style={{ opacity: 0.5 }}>
            <Card {...card} />
          </div>
        ))}
      </FlexContainer>
    </Container>
  );
};
const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 50px;
  column-gap: 25px;
  width: 100%;
  max-width: 1382px;
  margin-top: 25px;
  flex-wrap: wrap;
`;
const Container = styled.div`
  position: relative;
  z-index: 0;
  //height: 2500px;
  padding-bottom: 230px;
  width: 100%;
  max-width: 1920px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Sort = styled.div`
  width: 100%;
  max-width: 1382px;
  margin-top: 130px;
  height: 24px;
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 100% */
`;

export default Cards;
