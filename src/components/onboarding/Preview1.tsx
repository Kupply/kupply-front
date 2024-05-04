import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '../../assets/Typography';
import RankingTable from './RankingTable';
import CTA02 from '../../assets/CTAs/CTA02';

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

function Preview1() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<ITableData[]>([]);

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
      <Blur />
      <ButtonWrapper>
        <Typography size="1.57vw" bold="700" color="#2C323A" style={{ textAlign: 'center', lineHeight: '131.58%' }}>
          지금은 모의지원 기간이 아닙니다. <br /> 모의지원 기능은 5월 달에 오픈해요!
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

export default Preview1;
