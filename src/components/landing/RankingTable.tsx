import { useEffect, useState, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CTA02 from '../../assets/CTAs/CTA02';
import ToolTip06 from '../../assets/toolTips/ToolTip06';
import Typography from '../../assets/Typography';
import TableData from '../../assets/landingpage/TableData';
import { ITableData } from '../../pages/landing/LandingPage';
import { isDateInRange, isPeriodPassed, currentMonth } from '../../common/ApplicationPeriod';

type orderOptions = 'descending' | 'ascending';
type tableProps = {
  tableData: ITableData[];
};

const RankingTable = forwardRef<HTMLDivElement, tableProps>((props, ref) => {
  const [svgHover, setSvgHover] = useState(false);

  const onSvgHover = () => {
    setSvgHover(true);
  };

  const onSvgHoverOut = () => {
    setSvgHover(false);
  };

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

  // 회원의 모의지원 여부에 따라 테이블 블러 여부를 결정한다.
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    const appliedValue = localStorage.getItem('isApplied');
    if (appliedValue !== null) {
      setIsApplied(appliedValue === 'false');
    }
  }, []);

  const navigate = useNavigate();

  const [mouseOn, setMouseOn] = useState(false);

  const [buttonState, setButtonState] = useState<'disabled' | 'default' | 'hover'>('default');

  const handleButtonClick = () => {
    isDateInRange ? navigate('/myboard') : navigate('/archive');
  };
  const handleButtonEnter = () => {
    setButtonState('hover');
  };
  const handleButtonLeave = () => {
    setButtonState('default');
  };

  return (
    <Wrapper ref={ref}>
      <Typography
        size="2.08vw"
        bold="700"
        style={{ lineHeight: '120%', textShadow: '0px 4px 16px rgba(255, 255, 255, 0.33)' }}
      >
        {isDateInRange ? '쿠플라이 실시간 이중전공 모의지원 현황' : '지난 학기 이중전공 모의지원 현황'}
      </Typography>
      <Typography
        size="1.04vw"
        bold="500"
        color="rgba(20,20,20,0.6)"
        style={{ opacity: 0.8, lineHeight: '120%', margin: '0.63vw 0 1.72vw 0' }}
      >
        {isDateInRange
          ? '쿠플라이 실시간 모의지원 경쟁률을 참고하여 실지원 경쟁률을 예측해보세요.'
          : isPeriodPassed
          ? '이번 학기 모의지원 기간이 종료되었어요.'
          : currentMonth < 5
          ? '1학기 모의지원 서비스는 5월에 오픈해요.'
          : '2학기 모의지원 서비스는 11월에 오픈해요'}
      </Typography>
      <CTA02
        state={buttonState}
        onClick={handleButtonClick}
        onMouseEnter={handleButtonEnter}
        onMouseLeave={handleButtonLeave}
        style={{ marginBottom: '3.8vw' }}
      >
        {isDateInRange ? '나도 모의지원 하러가기' : '기다리는 동안 과거 합격자료 보러가기'}
      </CTA02>
      <TextWrapper>
        <div
          onClick={toggleOrder}
          onMouseEnter={() => setMouseOn(true)}
          onMouseLeave={() => setMouseOn(false)}
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '0.42vw' }}
        >
          <img width="10vw" height="10vw" src="../../designImage/landing/rankTable1.png" />
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
          <img width="10vw" height="10vw" src="../../designImage/landing/rankTable2.png" />
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
        <HeaderData>
          관심
          <ToolTip06
            onMouseEnter={onSvgHover}
            onMouseLeave={onSvgHoverOut}
            hoverState={svgHover}
            style={{ marginLeft: '0.18vw' }}
          >
            사용자들의 희망 이중전공을 기준으로 집계된 것으로, <br /> 실제 지원과 차이가 있을 수 있습니다.
          </ToolTip06>
        </HeaderData>
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
            onClick={() => {
              setisShowAll(false);
              window.scrollTo(0, 0);
            }}
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
      {!isDateInRange && !isPeriodPassed && <Blur />}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
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

const TextWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 0.73vw;
  display: flex;
  justify-content: space-between;
`;

const Blur = styled.div`
  width: 67.34vw;
  height: 46vw;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px); // blur(7.5px);
  position: absolute;
  top: 19vw; // 33.5%; // 30.82%;
  left: 0;
  -webkit-backdrop-filter: blur(10px); // blur(10px);
`;

export default RankingTable;
