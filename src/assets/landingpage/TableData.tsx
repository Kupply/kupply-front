import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Typography from '../Typography';
import client from '../../utils/HttpClient';

export interface TableDataProps {
  rank: number;
  secondMajor: string;
  engName: string;
  pastRecruitNumber: number;
  recruitNumber: number;
  applyNumber: number;
  competition: number;
  pastPassedRate: number;
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
    pastPassedRate,
    pastmean,
    interest,
    interestedNum,
  } = props;

  const longNameThreshold = 5;

  const [isApplied, setIsApplied] = useState(false); // 디자인 수정사항을 위해 잠시 수정 원래는 false

  useEffect(() => {
    const appliedValue = localStorage.getItem('isApplied');
    if (appliedValue !== null) {
      setIsApplied(appliedValue === 'false'); // 디자인 수정사항을 위해 잠시 수정 원래는 false
    }
  }, []);

  return (
    <>
      {isApplied ? (
        <Wrapper>
          <RankCell>{rank > 9 ? rank : '0' + rank}</RankCell>
          {secondMajor.length > longNameThreshold ? (
            <DoubleMajorCell>
              {interestedNum > 0 ? <InterestNumCell>{interestedNum}지망</InterestNumCell> : <></>}
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
                {interestedNum > 0 ? <InterestNumCell>{interestedNum}지망</InterestNumCell> : <></>}
              </div>
              <Typography size="0.63vw" style={{ lineHeight: '120%' }}>
                {engName}
              </Typography>
            </DoubleMajorCell>
          )}
          <RecruitNumberCell>{recruitNumber}</RecruitNumberCell>
          <AppliedCompeteBlur>모의지원 완료 후 공개!</AppliedCompeteBlur>

          <PastPassedRateCell>{pastPassedRate < 0 ? '집계불가' : pastPassedRate + ' %'} </PastPassedRateCell>
          <PastMeanCell>{pastmean === 0 ? '집계불가' : pastmean}</PastMeanCell>
          <InterestCell><HeartIcon/>{interest}</InterestCell>
        </Wrapper>
      ) : (
        <Wrapper>
          <RankCell>{rank > 9 ? rank : '0' + rank}</RankCell>
          {secondMajor.length > longNameThreshold ? (
            <DoubleMajorCell>
              {interestedNum > 0 ? <InterestNumCell>{interestedNum}지망</InterestNumCell> : <></>}
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
                {interestedNum > 0 ? <InterestNumCell>{interestedNum}지망</InterestNumCell> : <></>}
              </div>
              <Typography size="0.63vw" style={{ lineHeight: '120%' }}>
                {engName}
              </Typography>
            </DoubleMajorCell>
          )}
          <RecruitNumberCell>{recruitNumber}</RecruitNumberCell>
          <AppliedNumberCell>{applyNumber}</AppliedNumberCell>
          <CompetitionCell>{competition} : 1</CompetitionCell>
          <PastPassedRateCell>{pastPassedRate < 0 ? '집계불가' : pastPassedRate + ' %'} </PastPassedRateCell>
          <PastMeanCell>{pastmean === 0 ? '집계불가' : pastmean}</PastMeanCell>
          <InterestCell><HeartIcon/>{interest}</InterestCell>
        </Wrapper>
      )}
    </>
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
  user-select: none;
  -webkit-user-select: none;
  flex-wrap: nowrap; /* Prevent cells from wrapping or shifting */
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
  cursor: default;
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
  width: 16%;
  padding-left: 2%;
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

const AppliedCompeteBlur = styled.text`
  width: 26.5%;
  margin-left: -0.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Main-Black, #141414);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 21.6px */
`;

const PastPassedRateCell = styled.div`
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

const OuterEllipse = styled.svg`
  width: 1.385vw; //26.6px;
  height: 1.354vw; //26px;
`;

const HeartShape = styled.svg`
  width: 0.885vw; //17px;
  height: 0.833vw; //16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HeartIconContainer = styled.div`
  position: relative;
  width: 1.485vw; //28px;
  height: 1.354vw; //26px;
  margin-right: 3px;
`;

const HeartIcon = () => (
  <HeartIconContainer >
    <OuterEllipse xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 26" fill="none">
      <ellipse cx="13.7557" cy="13" rx="13.2806" ry="13" fill="#FDF2F2"/>
    </OuterEllipse>
    <HeartShape xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 16" fill="none">
      <g clipPath="url(#clip0_338_1223)">
        <path d="M14.7759 3.07357C14.428 2.73291 14.015 2.46267 13.5604 2.2783C13.1059 2.09392 12.6186 1.99902 12.1266 1.99902C11.6345 1.99902 11.1473 2.09392 10.6927 2.2783C10.2381 2.46267 9.82512 2.73291 9.47727 3.07357L8.75535 3.78024L8.03343 3.07357C7.33079 2.38578 6.37781 1.99938 5.38413 1.99938C4.39045 1.99938 3.43747 2.38578 2.73483 3.07357C2.03219 3.76137 1.63745 4.69422 1.63745 5.66691C1.63745 6.6396 2.03219 7.57245 2.73483 8.26024L3.45675 8.96691L8.75535 14.1536L14.054 8.96691L14.7759 8.26024C15.1239 7.91974 15.4 7.51545 15.5883 7.07048C15.7767 6.6255 15.8736 6.14857 15.8736 5.66691C15.8736 5.18525 15.7767 4.70831 15.5883 4.26334C15.4 3.81836 15.1239 3.41408 14.7759 3.07357V3.07357Z" fill="#F5BDBD" stroke="#F5BDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_338_1223">
          <rect width="16.3453" height="16" fill="white" transform="translate(0.582703)"/>
        </clipPath>
      </defs>
    </HeartShape>
  </HeartIconContainer>
);