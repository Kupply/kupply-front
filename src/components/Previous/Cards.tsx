import { styled } from 'styled-components';
import { mockHashes } from './Header';
import Card from '../../assets/Card';

export interface CardsProps {
  clicked: number;
}

const mockCards = [
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    avg: 4.23,
    min: 4.12,
    semester: '2024-1R',
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2024-1R',
    min: 4.12,
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2024-1R',
    min: 4.12,
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2024-1R',
    min: 4.12,
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    semester: '2024-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    avg: 4.23,
    min: 4.12,
    semester: '2024-1R',
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    avg: 4.23,
    semester: '2024-1R',
    min: 4.12,
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    semester: '2024-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
  {
    name: '경영대학',
    eng: 'Business School',
    filter: ['학부 전체보기'],
    TO: 25,
    경쟁률: 3.59,
    semester: '2024-1R',
    avg: 4.23,
    min: 4.12,
    src: '/design_image/previous/bussiness.png',
    titleSrc: '/design_image/businessSample.png',
  },
];

const Cards = ({ clicked }: CardsProps) => {
  const filteredCards = mockCards.map((card) => {});
  return (
    <Container>
      <Sort>
        {mockHashes[clicked]}
        {clicked > 0 && clicked < 4 && ' 정렬'}
      </Sort>
      <FlexContainer>
        {mockCards.slice(3).map((card) => (
          <Card {...card} />
        ))}
      </FlexContainer>
      <FlexContainer>
        {mockCards.slice(6).map((card) => (
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
  height: 2545px;
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
