import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';

import Banner from '../../components/landing/Banner';
import RankingTable from '../../components/landing/RankingTable';
import FAQ from '../../components/landing/FAQ';

export interface ITableData {
  rank: number;
  secondMajor: string;
  engName: string;
  pastRecruitNumber: number;
  recruitNumber: number;
  applyNumber: number;
  competition: number;
  pastCompetition: number;
  pastPassedNum: number;
  pastmin: number;
  pastmean: number;
  interest: number;
  interestedNum: number; //지망 아니면 0, n지망일경우 n이다.
  imagesrc: string;
}

function LandingPage() {
  const [tableData, setTableData] = useState<ITableData[]>([
    {
      rank: 1,
      secondMajor: '경영대학',
      engName: 'Business School',
      pastRecruitNumber: 12,
      recruitNumber: 12,
      applyNumber: 32,
      competition: 2.7,
      pastCompetition: 3.59,
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
      pastCompetition: 3.59,
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
      pastCompetition: 3.59,
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
      pastCompetition: 3.59,
      pastPassedNum: 4.46,
      pastmean: 4.46,
      pastmin: 4.46,
      interest: 56,
      interestedNum: 0,
      imagesrc: '../../designImage/landing/interest.svg',
    },
  ]);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       // const response = await axios.get('http://localhost:8080/landing');
  //       const response = await client.get('/landing');
  //       setTableData(response.data.data);
  //     } catch (e) {
  //       alert(e);
  //     }
  //   };
  //   loadData();
  // }, []);

  // const cardData = tableData.map((data) => ({
  //   name: data.secondMajor,
  //   eng: data.engName,
  //   합격자수: data.pastPassedNum,
  //   선발인원: data.pastRecruitNumber,
  //   min: data.pastmin,
  //   mean: data.pastmean,
  //   semester: '23-1',
  //   imagesrc: data.imagesrc,
  // }));

  // const tableContent = useRef<HTMLDivElement>(null);

  // const onClickDownArrow = () => {
  //   tableContent.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  // const [scrollY, setScrollY] = useState(0);

  return (
    <MainWrapper>
      <Side></Side>
      <Content>
        <Banner />
        <RankingTable tableData={tableData} />
        <FAQ />
      </Content>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  background: #fefafb;
`;

const Side = styled.div`
  width: 27.29vw;
  height: auto;
`;

const Content = styled.div`
  width: 72.71vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default LandingPage;
