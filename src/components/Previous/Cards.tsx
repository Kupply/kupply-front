import { styled } from 'styled-components';
import { mockHashes } from './Header';
import { useEffect, useState } from 'react';
import { client } from '../../utils/HttpClient';
import { useNavigate } from 'react-router-dom';
import Card01 from '../../assets/cards/Card01';
import DropDown02 from '../../assets/dropdown/DropDown02';
import { recruit } from '../../mappings/Recruiting';
import { getPrevSemester } from '../../common/Semester';

// 정렬 임의로 넣어 둠 (에셋 완성되면 적용할 예정)

export interface CardsProps {
  clicked: number;
  searchWord: string;
}

const Cards = ({ clicked, searchWord }: CardsProps) => {
  const [cards, setCards] = useState(mockCards);
  const [sortCriterion, setSortCriterion] = useState('가나다순');
  const navigate = useNavigate();

  const prevSemester = getPrevSemester();

  // 이게 원래 fetch function 이지만 /archive access를 위해 임시로 fetch function 만듦
  const fetch = async () => {
    try {
      const isLogined = window.localStorage.getItem('isLogin');

      if (isLogined !== 'true') {
        // alert('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
        // navigate('/login'); FIXME => 배포 시 수정 필요
      } else {
        const data = await client.get('/dashboard/cards');

        setCards(
          cards.map((c) => {
            const res = data.data.find((ca: any) => ca.name === c.korName);
            const shortKorName = c.korName.split(' ').length === 2 ? c.korName.split(' ')[1] : c.korName;
            return {
              korName: c.korName,
              engName: c.engName,
              majorEngShort: c.majorEngShort,
              collegeEngShort: c.collegeEngShort,
              filter: c.filter,
              TO: res.recruitNum,
              semester: res.semester,
              avgPass: res.passNum === 0 ? 0 : +res.avg.toFixed(2),
              minPass: res.passNum === 0 ? 0 : res.min,
              passRate: res.applyNum === 0 ? -1 : +((res.passNum / res.applyNum) * 100).toFixed(2),
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
          const aName = a.korName.split(' ').length === 2 ? a.korName.split(' ')[1] : a.korName;
          const bName = b.korName.split(' ').length === 2 ? b.korName.split(' ')[1] : b.korName;
          return aName.localeCompare(bName);
        case '선발인원순':
          return b.TO - a.TO;
        case '합격률순':
          return b.passRate - a.passRate;
        case '평균학점순':
          return b.avgPass - a.avgPass;
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
            optionList={['가나다순', '선발인원순', '합격률순', '평균학점순', '최저학점순']}
            value={sortCriterion}
            setValue={setSortCriterion}
          />
        </Sort>
        {filteredCards.map((card) => (
          <Card01 {...card} />
        ))}
      </FlexContainer>
      <FlexContainer style={{ marginTop: opaCards.length === 0 ? '0px' : '1.66vw' }}>
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
  // korName, engName, filter, TO만 실제로 반영되는 값.
  // passRate, avgPass, minPass, semester는 받아노는 값으로 대체됨.
  {
    korName: '경영대학 경영학과',
    engName: 'Business School',
    majorEngShort: 'business',
    collegeEngShort: 'business',
    filter: ['학과 전체보기', '인문계 캠퍼스'],
    TO: 37,
    passRate: 4.23,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '심리학부',
    engName: 'School of Psychology',
    majorEngShort: 'psychology',
    collegeEngShort: 'psycho',
    filter: ['학과 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 27,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 경제학과',
    engName: 'Department of Economics',
    majorEngShort: 'economics',
    collegeEngShort: 'political',
    filter: ['학과 전체보기', '인문계 캠퍼스'],
    TO: 29,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 통계학과',
    engName: 'Department of Statistics',
    majorEngShort: 'statistics',
    collegeEngShort: 'political',
    filter: ['학과 전체보기', '인문계 캠퍼스'],
    TO: 29,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '미디어학부',
    engName: 'School of Media & Communication',
    majorEngShort: 'media',
    collegeEngShort: 'media',
    filter: ['학과 전체보기', '인문계 캠퍼스', '독립 학부'],
    TO: 21,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정보대학 컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    majorEngShort: 'computer',
    collegeEngShort: 'info',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 20,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '생명과학대학 식품자원경제학과',
    engName: 'Department of Food & Resources',
    majorEngShort: 'foodecon',
    collegeEngShort: 'bio',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 21,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '이과대학 수학과',
    engName: 'Department of Mathematics',
    majorEngShort: 'mathematics',
    collegeEngShort: 'science',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 7,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '이과대학 화학과',
    engName: 'Department of Chemistry',
    majorEngShort: 'chemistry',
    collegeEngShort: 'science',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 10,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  ////// 학과 추가 (3/20) //////
  ///////////////////////////
  {
    korName: '생명과학대학 생명공학부',
    engName: 'Biological Engineering',
    majorEngShort: 'bioeng',
    collegeEngShort: 'bio',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 11,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '생명과학대학 생명과학부',
    engName: 'School of Life Sciences',
    majorEngShort: 'lifesci',
    collegeEngShort: 'bio',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 3,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 정치외교학과',
    engName: 'Department of Political Science & International Relations',
    majorEngShort: 'political',
    collegeEngShort: 'political',
    filter: ['학과 전체보기', '인문계 캠퍼스'],
    TO: 27,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정경대학 행정학과',
    engName: 'Department of Public Administration',
    majorEngShort: 'pubadmin',
    collegeEngShort: 'political',
    filter: ['학과 전체보기', '인문계 캠퍼스'],
    TO: 7,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 신소재공학부',
    engName: 'School of Materials Science & Engineering',
    majorEngShort: 'materials',
    collegeEngShort: 'engineering',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 5,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 기계공학부',
    engName: 'School of Mechanical Engineering',
    majorEngShort: 'mechanical',
    collegeEngShort: 'engineering',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 6,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 산업경영공학부',
    engName: 'School of Industrial & Management Engineering',
    majorEngShort: 'industrial',
    collegeEngShort: 'engineering',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 7,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 전기전자공학부',
    engName: 'School of Electrical Engineering',
    majorEngShort: 'electrical',
    collegeEngShort: 'engineering',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 14,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '공과대학 화공생명공학과',
    engName: 'Department of Chemical & Biological Engineering',
    majorEngShort: 'chembio',
    collegeEngShort: 'engineering',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 7,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '정보대학 데이터과학과',
    engName: 'Department of Data Science',
    majorEngShort: 'datasci',
    collegeEngShort: 'info',
    filter: ['학과 전체보기', '자연계 캠퍼스'],
    TO: 9,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
  {
    korName: '스마트보안학부 스마트보안학부',
    engName: 'Division of Smart Security',
    majorEngShort: 'smartsec',
    collegeEngShort: 'smartsecurity',
    filter: ['학과 전체보기', '자연계 캠퍼스', '독립학부'],
    TO: 3,
    passRate: 7,
    avgPass: 4.23,
    minPass: 4.12,
    semester: '23-2',
  },
];
export default Cards;
