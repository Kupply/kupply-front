import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Typography from '../../assets/Typography';
import TableData from '../../assets/landingpage/TableData';
import { ITableData } from '../../pages/landing/LandingPage';
import { TextButton01 } from '../../assets/buttons/TextButton';
import CTA01 from '../../assets/CTAs/CTA01';
import CTA02 from '../../assets/CTAs/CTA02';

type orderOptions = 'descending' | 'ascending';
type tableProps = {
  tableData: ITableData[];
};

export default function RankingTable(props: tableProps) {
  //표의 데이터는 최초 한 번만 렌더링하도록 한다.
  const data = props.tableData;
  const ascendingData = data.map((item) => ({ ...item, rank: data.length + 1 - item.rank })).reverse();

  //아래 toggle을 설정한다.
  const [isShowAll, setisShowAll] = useState<boolean>(false);

  //정렬 여부와 정렬 버튼의 색상을 설정한다.
  const [order, setOrder] = useState<orderOptions>('descending');

  const toggleOrder = () => {
    if (order === 'descending') setOrder('ascending');
    else setOrder('descending');
  };

  const navigate = useNavigate();

  const [isInfoVisible, setInfoVisible] = useState(false);

  const [mouseOn, setMouseOn] = useState(false);

  return (
    <Wrapper>
      <Typography
        size="2.08vw"
        bold="700"
        style={{ lineHeight: '120%', textShadow: '0px 4px 16px rgba(255, 255, 255, 0.33)' }}
      >
        쿠플라이 실시간 이중전공 모의지원 현황
      </Typography>
      <Typography
        size="1.04vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ opacity: 0.8, lineHeight: '120%', margin: '0.63vw 0 1.72vw 0' }}
      >
        이번 학기 나의 희망 학과의 실시간 지원자 수와 경쟁률을 제공해 드릴게요.
      </Typography>
      <CTA02 onClick={() => navigate('/myboard')} style={{ marginBottom: '3.8vw' }} />
      <TextWrapper>
        <div
          onClick={toggleOrder}
          onMouseEnter={() => setMouseOn(true)}
          onMouseLeave={() => setMouseOn(false)}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.42vw' }}
        >
          <img width="auto" height="auto" src="../../designImage/landing/rankTable1.png" />
          {order === 'descending' ? (
            <Typography
              size="0.83vw"
              bold="500"
              color={mouseOn === false ? '#a8a8a8' : '#d85888'}
              style={{ cursor: 'pointer' }}
            >
              높은 경쟁률 순
            </Typography>
          ) : (
            <Typography
              size="0.83vw"
              bold="500"
              color={mouseOn === false ? '#a8a8a8' : '#d85888'}
              style={{ cursor: 'pointer' }}
            >
              낮은 경쟁률 순
            </Typography>
          )}
        </div>
        <div style={{ display: 'flex', gap: '0.42vw', alignItems: 'center' }}>
          <img width="auto" height="auto" src="../../designImage/landing/rankTable2.png" />
          <Typography size="0.83vw" bold="400" color="#A8A8A8" style={{ lineHeight: '120%' }}>
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
        <HeaderData>관심</HeaderData>
      </TableHeader>
      {isShowAll && order === 'descending'
        ? data && data.map((row) => <TableData {...row}></TableData>)
        : !isShowAll && order === 'descending'
        ? data && data.slice(0, 5).map((row) => <TableData {...row}></TableData>)
        : isShowAll && order === 'ascending'
        ? ascendingData && ascendingData.map((row) => <TableData {...row}></TableData>)
        : ascendingData && ascendingData.slice(0, 5).map((row) => <TableData {...row}></TableData>)}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isShowAll ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="51"
            viewBox="0 0 50 51"
            fill="none"
            onClick={() => setisShowAll(false)}
            cursor="pointer"
          >
            <path
              d="M37.5 31.2637L25 18.7637L12.5 31.2637"
              stroke="#B9B9B9"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '1.04vw',
            }}
          >
            <Typography size="0.94vw" bold="500" color="#b9b9b9">
              더 많은 학과 보기
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="51"
              viewBox="0 0 50 51"
              fill="none"
              onClick={() => setisShowAll(true)}
              cursor="pointer"
            >
              <path
                d="M12.5 18.7637L25 31.2637L37.5 18.7637"
                stroke="#B9B9B9"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 57.09vw;
  background: #fefafb;
  margin-bottom: 12.29vw;
`;

const TableHeader = styled.div`
  width: 100%;
  height: 2.92vw;
  box-sizing: border-box;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  margin-bottom: 1.93vw;
  display: flex;
`;

const HeaderData = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 0.83vw;
  font-weight: 500;
  line-height: 120px; /* 100% */
  opacity: 0.8;

  &:nth-child(1) {
    width: 6%;
  }

  &:nth-child(2) {
    width: 18%;
  }

  &:nth-child(3) {
    width: 10%;
  }

  &:nth-child(4) {
    width: 10%;
  }

  &:nth-child(5) {
    width: 16%;
  }

  &:nth-child(6) {
    width: 14%;
  }

  &:nth-child(7) {
    width: 18%;
  }

  &:nth-child(8) {
    width: 6%;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 0.73vw;
  display: flex;
  justify-content: space-between;
`;

const ToggleOrder = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.31vw;
  cursor: pointer;

  &:hover {
    svg path {
      fill: #d85888; // hover 시 SVG 이미지의 색상 변경
    }
  }
`;

// const TableHeader = styled.div`
//   border-bottom: 1px solid #dfdfdf;
//   border-top: 1px solid #dfdfdf;
//   height: 3.02vw;
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 1.56vw;
// `;

// const HeaderData = styled.div`
//   position: relative;
//   display: inline-flex;
// color: #a8a8a8;
// font-family: Pretendard;
// font-size: 0.83vw;
// font-weight: 500;
// line-height: 120px; /* 100% */
// opacity: 0.8;
//   padding: 18px 0px;
//   text-align: center;

// &:nth-child(1) {
//   width: 5.73vw;
// }

//   &:nth-child(2) {
//     text-align: start;
//     padding-left: 3.13vw;
//     width: 17.71vw;
//   }

//   &:nth-child(3) {
//     width: 6.51vw;
//     padding-right: 0.78vw;
//   }

//   &:nth-child(4) {
//     width: 6.88vw;
//     padding-right: 0.78vw;
//   }

//   &:nth-child(5) {
//     width: 8.59vw;
//     padding-right: 5.47vw;
//   }

//   &:nth-child(6) {
//     width: 8.59vw;
//     padding-right: 5.47vw;
//   }

//   &:nth-child(7) {
//     width: 5.21vw;
//   }

//   &:nth-child(8) {
//     width: 400px;
//     padding-right: 200px;
//     position: relative;
//   }
//   //
// `;

const InfoIcon = styled.div`
  height: auto;
  width: auto;
  position: relative;
  display: inline-block;
`;

const Info = styled.div`
  position: absolute;
  bottom: 54px;
  right: -100px;
`;

const InfoBody = styled.div`
  position: relative;
  width: 294px;
  height: 34px;
  border-radius: 6px;
  display: flex;
  padding: 10px 8px;
  background: rgba(20, 20, 20, 0.6);
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px; /* 114.286% */

  //화살표 만들기
  &::after {
    content: ' ';
    height: 0;
    width: 0;
    position: absolute;
    border: 9px solid transparent;
    border-bottom-width: 0;
    border-top-color: rgba(20, 20, 20, 0.6);
    top: 54px;
    right: 142px;
  }
`;

{
  /* <TextWrapper>
<ToggleOrder onClick={toggleOrder} onMouseEnter={() => setMouseOn(true)} onMouseLeave={() => setMouseOn(false)}>
  <img width="0.83vw" height="0.83vw" src="../../designImage/landing/rankTable1.svg" />
  {order === 'descending' ? (
    <Typography
      size="0.83vw"
      bold="500"
      color={mouseOn === false ? '#a8a8a8' : '#d85888'}
      style={{ cursor: 'pointer' }}
    >
      높은 경쟁률 순
    </Typography>
  ) : (
    <Typography
      size="0.83vw"
      bold="500"
      color={mouseOn === false ? '#a8a8a8' : '#d85888'}
      style={{ cursor: 'pointer' }}
    >
      낮은 경쟁률 순
    </Typography>
  )}
</ToggleOrder>
<div style={{ display: 'flex', flexDirection: 'row', gap: '0.31vw' }}>
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
  <Typography size="0.83vw" color="#A8a8a8" style={{ lineHeight: '120%' }}>
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
  <div style={{ display: 'flex', gap: '0.21vw' }}>
    관심
    <InfoIcon onMouseEnter={() => setInfoVisible(true)} onMouseLeave={() => setInfoVisible(false)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="1.04vw" height="1.04vw" viewBox="0 0 20 21" fill="none">
        <g clip-path="url(#clip0_4239_14474)">
          <path
            d="M9.99935 19.2643C14.6017 19.2643 18.3327 15.5334 18.3327 10.931C18.3327 6.32862 14.6017 2.59766 9.99935 2.59766C5.39698 2.59766 1.66602 6.32862 1.66602 10.931C1.66602 15.5334 5.39698 19.2643 9.99935 19.2643Z"
            stroke="#A8A8A8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0078 7.59766L9.99948 7.59766"
            stroke="#A8A8A8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0078 14.2656L10.0078 10.9323"
            stroke="#A8A8A8"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4239_14474">
            <rect width="20" height="20" fill="white" transform="translate(0 0.931641)" />
          </clipPath>
        </defs>
      </svg>
    </InfoIcon>
  </div>
  {isInfoVisible && (
    <Info>
      <InfoBody>
        사용자들의 희망 이중전공을 기준으로 집계된 것으로, 실제 지원과 차이가 있을 수 있습니다.
      </InfoBody>
    </Info>
  )}
</HeaderData>
</TableHeader> */
}
