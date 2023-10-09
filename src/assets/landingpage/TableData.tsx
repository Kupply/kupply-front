import React from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';

export interface TableDataProps {
  rank: number;
  secondMajor: string;
  recruitNumber: number;
  applyNumber: number;
  competition: number;
  pastCompetition: number;
  pastmean: number;
  interest: number;
  interestedNum: number; //지망 아니면 0, n지망일경우 n이다.
}

type MajorOptions =
  | '경영대학'
  | '경제학과'
  | '심리학부'
  | '통계학과'
  | '수학과'
  | '화학과'
  | '미디어학부'
  | '식품자원경제학과'
  | '컴퓨터학과';

const majorParamMapping = {
  경영대학: 'Business School',
  경제학과: 'Department of Economics',
  심리학부: 'School of Psychology',
  통계학과: 'Department of Statistics',
  수학과: 'Department of Mathematics',
  화학과: 'Department of Chemistry',
  미디어학부: 'School of Media & Communication',
  식품자원경제학과: 'Department of Food & Resources',
  컴퓨터학과: 'Department of Computer Science & Engineering',
};

export default function TableData(props: TableDataProps) {
  const {
    rank,
    secondMajor,
    recruitNumber,
    applyNumber,
    competition,
    pastCompetition,
    pastmean,
    interest,
    interestedNum,
  } = props;
  return (
    <Wrapper>
      <RankCell>{rank > 10 ? rank : '0' + rank}</RankCell>
      <DoubleMajorCell>
        {interestedNum > 0 ? (
          <Typography size="smallText" color="#E57C90" style={{ marginBottom: '6px' }}>
            {interestedNum}지망
          </Typography>
        ) : (
          <></>
        )}
        <Typography size="title1" style={{ fontSize: '32px', marginBottom: '6px' }}>
          {secondMajor}
        </Typography>
        <Typography size="mediumText" style={{ fontWeight: '300' }}>
          {majorParamMapping[secondMajor as MajorOptions] || ''}
        </Typography>
      </DoubleMajorCell>
      <RecruitNumberCell>{recruitNumber}</RecruitNumberCell>
      <AppliedNumberCell>{applyNumber}</AppliedNumberCell>
      <CompetitionCell>
        <Typography size="heading2" color="#D85888">
          {competition}&nbsp;
        </Typography>
        <Typography style={{ fontSize: '32px', fontWeight: '300' }} color="#D85888">
          : 1
        </Typography>
      </CompetitionCell>
      <PastCompetitionCell>{pastCompetition} / 1</PastCompetitionCell>
      <PastMeanCell>{pastmean}</PastMeanCell>
      <InterestCell>
        <SvgCircle xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none">
          <circle cx="13" cy="13.0137" r="13" fill="#FDF2F2" />
        </SvgCircle>
        <SvgHeart xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
          <path
            d="M13.8941 3.08725C13.5536 2.74658 13.1493 2.47634 12.7043 2.29197C12.2593 2.10759 11.7824 2.0127 11.3007 2.0127C10.8191 2.0127 10.3421 2.10759 9.89716 2.29197C9.45219 2.47634 9.0479 2.74658 8.7074 3.08725L8.00073 3.79391L7.29406 3.08725C6.60627 2.39945 5.67342 2.01305 4.70073 2.01305C3.72804 2.01305 2.79519 2.39945 2.1074 3.08725C1.4196 3.77504 1.0332 4.70789 1.0332 5.68058C1.0332 6.65327 1.4196 7.58612 2.1074 8.27391L2.81406 8.98058L8.00073 14.1672L13.1874 8.98058L13.8941 8.27391C14.2347 7.93341 14.505 7.52912 14.6893 7.08415C14.8737 6.63918 14.9686 6.16224 14.9686 5.68058C14.9686 5.19892 14.8737 4.72198 14.6893 4.27701C14.505 3.83204 14.2347 3.42775 13.8941 3.08725Z"
            fill="#F5BDBD"
            stroke="#F5BDBD"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </SvgHeart>
        {interest}
      </InterestCell>
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
  margin-bottom: 20px;
`;

const RankCell = styled.div`
  width: 110px;
  color: var(--A8_Grey-4, #a8a8a8);
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
  width: 210px;
  padding-right: 100px;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 100% */
`;

const InterestCell = styled.div`
  position: relative;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 100% */
`;

const SvgCircle = styled.svg`
  fill: var(--SECONDARY, #fdf2f2);
`;

const SvgHeart = styled.svg`
  position: absolute;
  right: 52px;
  top: 8px;
`;
