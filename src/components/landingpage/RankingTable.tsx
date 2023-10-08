import React, { useMemo } from 'react';
import styled from 'styled-components';
import Typography from '../../assets/Typography';
import TableData from '../../assets/landingpage/TableData';

export default function RankingTable() {
  //표의 데이터는 최초 한 번만 렌더링하도록 한다.
  const data = useMemo(
    () => [
      {
        rank: 1,
        secondMajor: '경영대학',
        recruitNumber: 12,
        applyNumber: 32,
        competition: 3.2,
        pastCompetition: 3.59,
        pastmean: 4.46,
        interest: 56,
        interestedNum: 1,
      },
      {
        rank: 2,
        secondMajor: '컴퓨터학과',
        recruitNumber: 12,
        applyNumber: 32,
        competition: 3.2,
        pastCompetition: 3.59,
        pastmean: 4.46,
        interest: 56,
        interestedNum: 0,
      },
      {
        rank: 3,
        secondMajor: '심리학부',
        recruitNumber: 12,
        applyNumber: 32,
        competition: 3.2,
        pastCompetition: 3.59,
        pastmean: 4.46,
        interest: 56,
        interestedNum: 2,
      },
      {
        rank: 4,
        secondMajor: '미디어학부',
        recruitNumber: 12,
        applyNumber: 32,
        competition: 3.2,
        pastCompetition: 3.59,
        pastmean: 4.46,
        interest: 56,
        interestedNum: 3,
      },
      {
        rank: 5,
        secondMajor: '식품자원경제학과',
        recruitNumber: 12,
        applyNumber: 32,
        competition: 3.2,
        pastCompetition: 3.59,
        pastmean: 4.46,
        interest: 56,
        interestedNum: 0,
      },
      {
        rank: 6,
        secondMajor: '경제학과',
        recruitNumber: 12,
        applyNumber: 32,
        competition: 3.2,
        pastCompetition: 3.59,
        pastmean: 4.46,
        interest: 56,
        interestedNum: 0,
      },
      {
        rank: 7,
        secondMajor: '수학과',
        recruitNumber: 12,
        applyNumber: 32,
        competition: 3.2,
        pastCompetition: 3.59,
        pastmean: 4.46,
        interest: 56,
        interestedNum: 0,
      },
    ],
    [],
  );

  return (
    <Wrapper>
      <TextWrapper>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M9.80719 14.4737L12.4739 11.8071C12.536 11.7449 12.5853 11.6711 12.619 11.5899C12.6526 11.5087 12.6699 11.4217 12.6699 11.3338C12.6699 11.1562 12.5994 10.986 12.4739 10.8604C12.3483 10.7349 12.1781 10.6644 12.0005 10.6644C11.823 10.6644 11.6527 10.7349 11.5272 10.8604L10.0005 12.3938L10.0005 4.66709C10.0005 4.49027 9.93029 4.3207 9.80526 4.19568C9.68024 4.07066 9.51067 4.00042 9.33386 4.00042C9.15705 4.00042 8.98748 4.07066 8.86246 4.19568C8.73743 4.3207 8.66719 4.49027 8.66719 4.66708L8.66719 14.0004C8.66785 14.132 8.70745 14.2605 8.78101 14.3697C8.85456 14.4788 8.95878 14.5637 9.08053 14.6138C9.20193 14.6648 9.33574 14.6788 9.46507 14.6538C9.5944 14.6289 9.71344 14.5663 9.80719 14.4737ZM7.33386 11.3338L7.33386 2.00042C7.3332 1.8688 7.2936 1.74032 7.22005 1.63118C7.14649 1.52203 7.04227 1.4371 6.92053 1.38708C6.79912 1.33603 6.66531 1.32208 6.53598 1.347C6.40666 1.37192 6.28761 1.43458 6.19386 1.52708L3.52719 4.19375C3.46471 4.25573 3.41511 4.32946 3.38127 4.4107C3.34742 4.49194 3.33 4.57908 3.33 4.66708C3.33 4.75509 3.34742 4.84223 3.38127 4.92347C3.41511 5.00471 3.46471 5.07844 3.52719 5.14042C3.58917 5.2029 3.6629 5.2525 3.74414 5.28635C3.82538 5.32019 3.91252 5.33762 4.00053 5.33762C4.08854 5.33762 4.17567 5.32019 4.25691 5.28635C4.33815 5.2525 4.41189 5.2029 4.47386 5.14042L6.00053 3.60708L6.00053 11.3338C6.00053 11.5106 6.07076 11.6801 6.19579 11.8052C6.32081 11.9302 6.49038 12.0004 6.66719 12.0004C6.844 12.0004 7.01357 11.9302 7.1386 11.8052C7.26362 11.6801 7.33386 11.5106 7.33386 11.3338Z"
              fill="#A8A8A8"
            />
          </svg>
          <Typography size="normalText" color="#A8A8A8">
            높은 경쟁률 순
          </Typography>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <g clip-path="url(#clip0_4010_12381)">
              <path
                d="M8.00065 14.68C11.6825 14.68 14.6673 11.6952 14.6673 8.01335C14.6673 4.33145 11.6825 1.34668 8.00065 1.34668C4.31875 1.34668 1.33398 4.33145 1.33398 8.01335C1.33398 11.6952 4.31875 14.68 8.00065 14.68Z"
                stroke="#A8A8A8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M8 10.6807H8.00667" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8 5.34668V8.01335" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round" />
            </g>
            <defs>
              <clipPath id="clip0_4010_12381">
                <rect width="16" height="16" fill="white" transform="translate(0 0.0136719)" />
              </clipPath>
            </defs>
          </svg>
          <Typography size="normalText" color="#A8A8A8">
            본 통계는 서비스 이용자의 수집된 정보를 기반으로 한 것으로, 실제 통계와 상이할 수 있습니다.
          </Typography>
        </div>
      </TextWrapper>
      <TableHeader>
        <HeaderData>순위</HeaderData>
        <HeaderData>이중전공</HeaderData>
        <HeaderData>최종정원</HeaderData>
        <HeaderData>지원 현황</HeaderData>
        <HeaderData>실시간 경쟁률</HeaderData>
        <HeaderData>지난 경쟁률</HeaderData>
        <HeaderData>지난 합격자 평균</HeaderData>
        <HeaderData>
          <div style={{ display: 'flex', gap: '4px' }}>
            관심
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
              <g clip-path="url(#clip0_4167_16404)">
                <path
                  d="M9.99935 18.3473C14.6017 18.3473 18.3327 14.6164 18.3327 10.014C18.3327 5.41162 14.6017 1.68066 9.99935 1.68066C5.39698 1.68066 1.66602 5.41162 1.66602 10.014C1.66602 14.6164 5.39698 18.3473 9.99935 18.3473Z"
                  stroke="#A8A8A8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0078 6.68066L9.99948 6.68066"
                  stroke="#A8A8A8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.0078 13.3467L10.0078 10.0133"
                  stroke="#A8A8A8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4167_16404">
                  <rect width="20" height="20" fill="white" transform="translate(0 0.0136719)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </HeaderData>
      </TableHeader>
      {data.map((row) => (
        <TableData {...row}></TableData>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 86%;
  height: 1200px;
  background: rgba(255, 255, 255, 0.6);
`;

const TextWrapper = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TableHeader = styled.div`
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
  height: 58px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 30px;
`;

const HeaderData = styled.div`
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 500;
  line-height: 20px; /* 100% */
  opacity: 0.8;
  padding: 18px 0px;
  text-align: center;

  &:nth-child(1) {
    width: 110px;
  }

  &:nth-child(2) {
    text-align: start;
    padding-left: 60px;
    width: 340px;
  }

  &:nth-child(3) {
    width: 125px;
  }

  &:nth-child(4) {
    width: 132px;
  }

  &:nth-child(5) {
    width: 165px;
    padding-right: 94px;
  }

  &:nth-child(6) {
    width: 130px;
  }

  &:nth-child(7) {
    width: 220px;
    padding-right: 100px;
  }
`;
