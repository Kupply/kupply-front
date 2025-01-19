import React, { useMemo, useState, forwardRef } from 'react';
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

const RankingTable = forwardRef<HTMLDivElement, tableProps>((props, ref) => {
  //표의 데이터는 최초 한 번만 렌더링하도록 한다.
  const data = props.tableData;
  const ascendingData = data.map((item) => ({ ...item, rank: data.length + 1 - item.rank })).reverse();

  //아래 toggle을 설정한다.
  const [isShowAll, setisShowAll] = useState<boolean>(false);

  //정렬 여부와 정렬 버튼의 색상을 설정한다.
  const [order, setOrder] = useState<orderOptions>('descending');

  // const toggleOrder = () => {
  //   if (order === 'descending') setOrder('ascending');
  //   else setOrder('descending');
  // };

  // const navigate = useNavigate();

  // const [isInfoVisible, setInfoVisible] = useState(false);

  // const [mouseOn, setMouseOn] = useState(false);

  return (
    <Wrapper ref={ref}>
      <TextWrapper>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.42vw' }}>
          <img width="auto" height="auto" src="../../designImage/landing/rankTable1.png" />
          <Typography size="0.83vw" bold="500" color="#a8a8a8">
            높은 경쟁률 순
          </Typography>
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
        <HeaderData>예상 모집정원</HeaderData>
        <HeaderData>지원 현황</HeaderData>
        <HeaderData>실시간 경쟁률</HeaderData>
        <HeaderData>지난 합격률</HeaderData>
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
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 68.56vw;
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

const TextWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 0.73vw;
  display: flex;
  justify-content: space-between;
`;

export default RankingTable;
