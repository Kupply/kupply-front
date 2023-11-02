import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '../../assets/Typography';
import TableData from '../../assets/landingpage/TableData';
import { ITableData } from '../../pages/LandingPage';

type orderOptions = 'descending' | 'ascending';
type tableProps = {
  tableData: ITableData[];
};

export default function Table(props: tableProps) {
  //표의 데이터는 최초 한 번만 렌더링하도록 한다.
  const data = props.tableData;
  const ascendingData = data.map((item) => ({ ...item, rank: data.length + 1 - item.rank })).reverse();

  //아래 toggle을 설정한다.
  const [isShowAll, setisShowAll] = useState<boolean>(false);

  //정렬 여부와 정렬 버튼의 색상을 설정한다.
  const [order, setOrder] = useState<orderOptions>('descending');
  const [orderColor, setOrderColor] = useState<string>('#A8A8A8');

  const toggleOrder = () => {
    if (order === 'descending') setOrder('ascending');
    else setOrder('descending');
  };

  const navigate = useNavigate();

  const [isInfoVisible, setInfoVisible] = useState(false);

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography
          color="#D85888"
          size="mediumText"
          style={{ textAlign: 'center', marginBottom: '13.5px', marginTop: '130px' }}
        >
          실시간 지원률
        </Typography>
        <Typography size="heading2" style={{ textAlign: 'center', marginBottom: '15px' }}>
          쿠플라이 실시간 이중전공 모의지원 현황
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <KupplyApplyButton
            onClick={() => {
              navigate('/myboard');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path
                d="M18.8327 1.66699L9.66602 10.8337"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.8327 1.66699L12.9993 18.3337L9.66602 10.8337L2.16602 7.50033L18.8327 1.66699Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <Typography color="white" size="bodyText">
              쿠플라이 모의지원 하러가기
            </Typography>
          </KupplyApplyButton>
        </div>
      </TitleWrapper>
      <TextWrapper>
        <ToggleOrder
          onClick={toggleOrder}
          onMouseEnter={() => setOrderColor('#D85888')}
          onMouseLeave={() => setOrderColor('#A8A8A8')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M9.80719 14.4737L12.4739 11.8071C12.536 11.7449 12.5853 11.6711 12.619 11.5899C12.6526 11.5087 12.6699 11.4217 12.6699 11.3338C12.6699 11.1562 12.5994 10.986 12.4739 10.8604C12.3483 10.7349 12.1781 10.6644 12.0005 10.6644C11.823 10.6644 11.6527 10.7349 11.5272 10.8604L10.0005 12.3938L10.0005 4.66709C10.0005 4.49027 9.93029 4.3207 9.80526 4.19568C9.68024 4.07066 9.51067 4.00042 9.33386 4.00042C9.15705 4.00042 8.98748 4.07066 8.86246 4.19568C8.73743 4.3207 8.66719 4.49027 8.66719 4.66708L8.66719 14.0004C8.66785 14.132 8.70745 14.2605 8.78101 14.3697C8.85456 14.4788 8.95878 14.5637 9.08053 14.6138C9.20193 14.6648 9.33574 14.6788 9.46507 14.6538C9.5944 14.6289 9.71344 14.5663 9.80719 14.4737ZM7.33386 11.3338L7.33386 2.00042C7.3332 1.8688 7.2936 1.74032 7.22005 1.63118C7.14649 1.52203 7.04227 1.4371 6.92053 1.38708C6.79912 1.33603 6.66531 1.32208 6.53598 1.347C6.40666 1.37192 6.28761 1.43458 6.19386 1.52708L3.52719 4.19375C3.46471 4.25573 3.41511 4.32946 3.38127 4.4107C3.34742 4.49194 3.33 4.57908 3.33 4.66708C3.33 4.75509 3.34742 4.84223 3.38127 4.92347C3.41511 5.00471 3.46471 5.07844 3.52719 5.14042C3.58917 5.2029 3.6629 5.2525 3.74414 5.28635C3.82538 5.32019 3.91252 5.33762 4.00053 5.33762C4.08854 5.33762 4.17567 5.32019 4.25691 5.28635C4.33815 5.2525 4.41189 5.2029 4.47386 5.14042L6.00053 3.60708L6.00053 11.3338C6.00053 11.5106 6.07076 11.6801 6.19579 11.8052C6.32081 11.9302 6.49038 12.0004 6.66719 12.0004C6.844 12.0004 7.01357 11.9302 7.1386 11.8052C7.26362 11.6801 7.33386 11.5106 7.33386 11.3338Z"
              fill={orderColor}
            />
          </svg>
          {order === 'descending' ? (
            <Typography size="normalText" color={orderColor}>
              높은 경쟁률 순
            </Typography>
          ) : (
            <Typography size="normalText" color={orderColor}>
              낮은 경쟁률 순
            </Typography>
          )}
        </ToggleOrder>
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
        <HeaderData>지난 합격자 평균</HeaderData>
        <HeaderData>
          <div style={{ display: 'flex', gap: '4px' }}>
            관심
            <InfoIcon onMouseEnter={() => setInfoVisible(true)} onMouseLeave={() => setInfoVisible(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
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
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 86%;
  background: rgba(255, 255, 255, 0.6);
  margin-bottom: 600px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 15%,
    rgba(255, 255, 255, 0) 95%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 990;
`;

const KupplyApplyButton = styled.button`
  display: flex;
  width: 628px;
  padding: 24px 34px;
  border-radius: 10px;
  background: linear-gradient(91deg, #d85888 -19.78%, #f5bdbd 89.21%, rgba(253, 242, 242, 0.3) 126.89%);
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 78px;
`;

const TextWrapper = styled.div`
  margin-bottom: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ToggleOrder = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  cursor: pointer;

  &:hover {
    svg path {
      fill: #d85888; // hover 시 SVG 이미지의 색상 변경
    }
  }
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
  position: relative;
  display: inline-block;
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
    padding-right: 15px;
  }

  &:nth-child(4) {
    width: 132px;
    padding-right: 15px;
  }

  &:nth-child(5) {
    width: 165px;
    padding-right: 105px;
  }

  &:nth-child(6) {
    width: 165px;
    padding-right: 105px;
  }

  &:nth-child(7) {
    width: 100px;
  }

  //&:nth-child(8) {
  // width: 400px;
  //padding-right: 200px;
  //position: relative;
  //}
  //
`;

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
