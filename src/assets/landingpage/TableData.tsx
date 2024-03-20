import React from 'react';
import styled from 'styled-components';

import Typography from '../Typography';

export interface TableDataProps {
  rank: number;
  secondMajor: string;
  engName: string;
  pastRecruitNumber: number;
  recruitNumber: number;
  applyNumber: number;
  competition: number;
  pastCompetition: number;
  pastmin: number;
  pastmean: number;
  interest: number;
  interestedNum: number; //지망 아니면 0, n지망일경우 n이다.
  imagesrc: string;
}

export default function TableData(props: TableDataProps) {
  const {
    rank,
    secondMajor,
    engName,
    recruitNumber,
    applyNumber,
    competition,
    pastCompetition,
    pastmean,
    interest,
    interestedNum,
  } = props;

  const longNameThreshold = 5;

  return (
    <Wrapper>
      <RankCell>{rank > 10 ? rank : '0' + rank}</RankCell>
      {secondMajor.length > longNameThreshold ? (
        <DoubleMajorCell>
          {interestedNum > 0 ? <InterestNumCell> 나의 {interestedNum}지망</InterestNumCell> : <></>}
          <Typography size="1.25vw" bold="700" style={{ lineHeight: '120%', marginBottom: '0.21vw' }}>
            {secondMajor}
          </Typography>
          <Typography size="0.63vw" style={{ lineHeight: '120%' }}>
            {engName}
          </Typography>
        </DoubleMajorCell>
      ) : (
        <DoubleMajorCell>
          <div style={{ display: 'flex', gap: '0.73vw', flexWrap: 'wrap' }}>
            <Typography size="1.25vw" bold="700" style={{ lineHeight: '120%', marginBottom: '0.21vw' }}>
              {secondMajor}
            </Typography>
            {interestedNum > 0 ? <InterestNumCell> 나의 {interestedNum}지망</InterestNumCell> : <></>}
          </div>
          <Typography size="0.63vw" style={{ lineHeight: '120%' }}>
            {engName}
          </Typography>
        </DoubleMajorCell>
      )}
      <RecruitNumberCell>{recruitNumber}</RecruitNumberCell>
      <AppliedNumberCell>{applyNumber}</AppliedNumberCell>
      <CompetitionCell>{competition} : 1</CompetitionCell>
      <PastCompetitionCell>{pastCompetition} : 1</PastCompetitionCell>
      <PastMeanCell>{pastmean}</PastMeanCell>
      <InterestCell>{interest}</InterestCell>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  border: 1px solid rgba(223, 223, 223, 0.4);
  border-radius: 0.52vw;
  padding: 1.51vw 0 1.56vw 0;
  display: flex;
  align-items: center;
  margin-bottom: 0.63vw;
`;

const RankCell = styled.div`
  width: 6%;
  justify-content: center;
  align-items: center;
  color: var(--A8_Grey-4, #a8a8a8);
  display: flex;
  font-family: Pretendard;
  font-size: 1.67vw;
  font-weight: 400;
  line-height: 120%;
`;

const InterestNumCell = styled.div`
  width: fit-content;
  height: auto;
  padding: 0.42vw 0.63vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 52.03vw;
  background: rgba(216, 88, 136, 0.1);
  color: #d85888;
  font-family: Pretendard;
  font-size: 0.63vw;
  font-weight: 500;
`;

const DoubleMajorCell = styled.div`
  display: flex;
  flex-direction: column;
  width: 18%;
`;

const RecruitNumberCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 100% */
`;

const AppliedNumberCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 100% */
`;

const CompetitionCell = styled.div`
  width: 16%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  font-family: Pretendard;
  color: #d85888;
`;

const PastCompetitionCell = styled.div`
  width: 14%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
  font-family: Pretendard;
  color: #141414;
`;

const PastMeanCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18%;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 100% */
`;

const InterestCell = styled.div`
  position: relative;
  display: flex;
  width: 6%;
  gap: 0.16vw;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 100% */
`;
