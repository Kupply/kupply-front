import React from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';


export default function TableData() {
  return (
    <Wrapper>
      <RankCell>01</RankCell>
      <DoubleMajorCell>
        <Typography size='smallText' color='#E57C90' style={{ marginBottom: '6px' }}>1지망</Typography>
        <Typography size='title1' style={{ fontSize: '32px', marginBottom: '6px' }}>경영대학</Typography>
        <Typography size='mediumText' style={{ fontWeight: '300' }}>Business School</Typography>
      </DoubleMajorCell>
      <RecruitNumberCell>12</RecruitNumberCell>
      <AppliedNumberCell>32</AppliedNumberCell>
      <CompetitionCell>
        <Typography size='heading2' color='#D85888'>2.7&nbsp;</Typography>
        <Typography style={{ fontSize: '32px', fontWeight: '300'}} color='#D85888'>: 1</Typography>
      </CompetitionCell>
      <PastCompetitionCell>3.59 / 1</PastCompetitionCell>
      <PastMeanCell>4.47</PastMeanCell>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 132px;
  border: 1px solid rgba(223, 223, 223, 0.4);
  border-radius: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const RankCell = styled.div`
  width: 110px;
  color: var(--A8_Grey-4, #A8A8A8);
  text-align: center;
  font-family: Pretendard;
  font-size: 48px;
  font-weight: 300;
  line-height: 50px;
`;

const DoubleMajorCell = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px;
  width: 340px;
`;

const RecruitNumberCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 125px;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 100% */
`;

const AppliedNumberCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 132px;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 100% */
`;

const CompetitionCell = styled.div`
  width: 165px;
  padding-right: 94px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PastCompetitionCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 100% */
`;

const PastMeanCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  padding-right: 100px;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 100% */
`;
