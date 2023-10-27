import { styled } from 'styled-components';
import { mockHashes } from './Header';
import Card from '../../assets/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface CardsProps {
  clicked: number;
}

const mockCards = [
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 42,
    경쟁률: 3.59,
    avg: 4.23,
    min: 4.12,
    semester: '2023-1R',
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '심리학부',
    eng: 'School of Psychology',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 44,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/psycho.png',
    titleSrc: '/design_image/psychoSample.png',
  },
  {
    name: '정경대학 경제학과',
    eng: 'Department of Economics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 13,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/political.png',
    titleSrc: '/design_image/politicalSample.png',
  },
  {
    name: '정경대학 통계학과',
    eng: 'Department of Statistics',
    filter: ['학부 전체보기', '인문계 캠퍼스'],
    TO: 28,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/political.png',
    titleSrc: '/design_image/politicalSample.png',
  },
  {
    name: '미디어학부',
    eng: 'School of Media and Communication',
    filter: ['학부 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 25,
    경쟁률: 3.59,
    semester: '2023-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/media.png',
    titleSrc: '/design_image/mediaSample.png',
  },
  {
    name: '정보대학 컴퓨터학과',
    eng: 'Department of Computer Science and Engineering',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 19,
    경쟁률: 3.59,
    avg: 4.23,
    min: 4.12,
    semester: '2023-1R',
    src: '/design_image/previous/info.png',
    titleSrc: '/design_image/infoSample.png',
  },
  {
    name: '생명과학대학 식품자원경제학과',
    eng: 'Department of Food and Resources',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 30,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2023-1R',
    min: 4.12,
    src: '/design_image/previous/bio.png',
    titleSrc: '/design_image/bioSample.png',
  },
  {
    name: '이과대학 수학과',
    eng: 'Department of Mathematics',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 17,
    경쟁률: 3.59,
    semester: '2023-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/science.png',
    titleSrc: '/design_image/scienceSample.png',
  },
  {
    name: '이과대학 화학과',
    eng: 'Department of Chemistry',
    filter: ['학부 전체보기', '자연계 캠퍼스'],
    TO: 11,
    경쟁률: 3.59,
    semester: '2023-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/science.png',
    titleSrc: '/design_image/scienceSample.png',
  },
];

const Cards = ({ clicked }: CardsProps) => {
  const [cards, setCards] = useState(mockCards);
  const fetch = async () => {
    try {
      const data = await axios.get('http://localhost:8080/dashboard/cards');

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
            avg: res.avg / res.applyNum,
            min: res.min / res.applyNum,
            경쟁률: res.applyNum / res.TO,
          };
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch();
  });

  const filteredCards =
    clicked === 4
      ? cards.sort((a, b) => a.name.localeCompare(b.name))
      : cards.filter((card) => card.filter.includes(mockHashes[clicked]));
  const opaCards = clicked === 4 ? [] : cards.filter((card) => !card.filter.includes(mockHashes[clicked]));
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
      <FlexContainer>
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
  height: 2745px;
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
  margin-top: 184px;
  height: 24px;
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 100% */
`;

export default Cards;
