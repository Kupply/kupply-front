// dummy data 만들어서 개발중
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../../../assets/Typography';
import { ITableData } from '../../../pages/landing/LandingPage';

export interface CurrentInfoProps {
  isAscending: boolean;
  isShowAll: boolean;
  tableData: ITableData[];
}

export type tableProps = {};

function CurrentInfo(props: CurrentInfoProps) {
  const { isAscending, isShowAll, tableData } = props;

  const arrangedData = isAscending
    ? tableData.sort((a, b) => a.competition - b.competition)
    : tableData.sort((a, b) => b.competition - a.competition);
  const visibleData = isShowAll ? arrangedData : arrangedData.slice(0, 4);

  const [isApplied, setIsApplied] = useState(false); // 디자인 수정을 위해 잠시 수정 원래는 false

  useEffect(() => {
    const appliedValue = localStorage.getItem('isApplied');
    if (appliedValue !== null) {
      setIsApplied(appliedValue === 'false'); // 디자인 수정을 위해 잠시 수정 원래는 false
    }
  }, []);
  console.log(localStorage);
  console.log(isApplied);
  return (
    <>
      {isApplied ? (
        <MainWrapper>
          <HeaderWrapper2>
            <Header2>순위</Header2>
            <Header2>이중전공</Header2>
            <Header2>실시간 경쟁률</Header2>
            <Header2>관심도</Header2>
          </HeaderWrapper2>
          {visibleData.map((dictionary, dictionaryIndex) => (
            <BodyWrapper key={dictionaryIndex}>
              <Body>
                <Typography size="5vw" bold="500" color="#a8a8a8" style={{ lineHeight: '120%' }}>
                  {dictionaryIndex + 1 < 10 ? '0' + (dictionaryIndex + 1) : dictionaryIndex + 1}
                </Typography>
              </Body>
              <Body style={{width:'39%', marginLeft: '5%'}}>
                <Typography size="3.89vw" bold="500" style={{ lineHeight: '120%' }}>
                  {dictionary.secondMajor}
                </Typography>
                {dictionary.interestedNum ? (
                  <ApplyOrderBox>
                    <Typography size="3.06vw" bold="500" color="#d85888" style={{ lineHeight: '120%' }}>
                      {dictionary.interestedNum + '지망'}
                    </Typography>
                  </ApplyOrderBox>
                ) : (
                  <></>
                )}
              </Body>
              <Body2>
                <Typography size="2.78vw" bold="700" color="#141414" style={{ lineHeight: '120%' }}>
                  모의지원 후 공개!
                </Typography>
                <div style={{display: 'flex', flexDirection: 'row', width: '20%', marginLeft: '-7%'}}>
                  <HeartIcon/>
                  <Typography size="3.89vw" bold="700" color="#141414" style={{ lineHeight: '120%' }}>
                  {dictionary.interest}
                </Typography>
                </div>
              </Body2>
            </BodyWrapper>
          ))}
        </MainWrapper>
      ) : (
        <MainWrapper>
          <HeaderWrapper>
            <Header>순위</Header>
            <Header>이중전공</Header>
            <Header>선발인원</Header>
            <Header>지원 현황</Header>
            <Header>실시간 경쟁률</Header>
          </HeaderWrapper>
          {visibleData.map((dictionary, dictionaryIndex) => (
            <BodyWrapper key={dictionaryIndex}>
              <Body>
                <Typography size="5vw" bold="500" color="#a8a8a8" style={{ lineHeight: '120%' }}>
                  {dictionaryIndex + 1 < 10 ? '0' + (dictionaryIndex + 1) : dictionaryIndex + 1}
                </Typography>
              </Body>
              <Body style={{width:'39%', marginLeft: '5%'}}>
                <Typography size="3.89vw" bold="500" style={{ lineHeight: '120%' }}>
                  {dictionary.secondMajor}
                </Typography>
                {dictionary.interestedNum ? (
                  <ApplyOrderBox>
                    <Typography size="3.06vw" bold="500" color="#d85888" style={{ lineHeight: '120%' }}>
                      {dictionary.interestedNum + '지망'}
                    </Typography>
                  </ApplyOrderBox>
                ) : (
                  <></>
                )}
              </Body>
              <Body>
                <Typography size="3.89vw" bold="500" style={{ lineHeight: '120%' }}>
                  {dictionary.recruitNumber}
                </Typography>
              </Body>
              <Body>
                <Typography size="3.89vw" bold="500" style={{ lineHeight: '120%' }}>
                  {dictionary.applyNumber}
                </Typography>
              </Body>
              <Body>
                <Typography size="3.89vw" bold="700" color="#D85888" style={{ lineHeight: '120%' }}>
                  {dictionary.competition + ' : 1'}
                </Typography>
              </Body>
            </BodyWrapper>
          ))}
        </MainWrapper>
      )}
    </>
  );
}

const MainWrapper = styled.div`
  width: 91.12vw;
  height: auto;
  display: flex;
  flex-direction: column;
  user-select: none;
  -webkit-user-select: none;
`;

const HeaderWrapper = styled.div`
  width: 91.12vw;
  height: auto;
  padding-bottom: 3.06vw;
  border-bottom: 0.28vw solid rgba(223, 223, 223, 0.4);
  box-sizing: border-box;
  display: flex;
`;

const HeaderWrapper2 = styled.div`
  width: 91.12vw;
  height: auto;
  padding-bottom: 3.06vw;
  border-bottom: 0.28vw solid rgba(223, 223, 223, 0.4);
  box-sizing: border-box;
  display: flex;
`;

const Header = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 3.06vw;
  font-weight: 500;
  line-height: 120%;
  opacity: 0.8;

  &:nth-child(1) {
    justify-content: flex-start;
    width: 9%;
  }

  &:nth-child(2) {
    width: 44%;
  }

  &:nth-child(3) {
    width: 14%;
  }

  &:nth-child(4) {
    width: 14%;
  }

  &:nth-child(5) {
    width: 19%;
  }
`;

const Header2 = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 3.06vw;
  font-weight: 500;
  line-height: 120%;
  opacity: 0.8;

  &:nth-child(1) {
    justify-content: flex-start;
    width: 9%;
  }

  &:nth-child(2) {
    width: 40%;
  }

  &:nth-child(3) {
    width: 34%;
  }

  &:nth-child(4) {
    width: 15%;
  }
`;

const BodyWrapper = styled.div`
  width: 91.12vw;
  height: 15.28vw;
  border-bottom: 0.28vw solid rgba(223, 223, 223, 0.4);
  box-sizing: border-box;
  display: flex;
`;

const Body = styled.div`
  height: 15.28vw;
  display: flex;
  align-items: center;

  &:nth-child(1) {
    justify-content: flex-start;
    width: 9%;
  }

  &:nth-child(2) {
    justify-content: flex-start;
    gap: 1.94vw;
    width: 44%;
  }

  &:nth-child(3) {
    justify-content: center;
    width: 14%;
  }

  &:nth-child(4) {
    justify-content: center;
    width: 14%;
  }

  &:nth-child(5) {
    justify-content: center;
    width: 19%;
  }
`;

const Body2 = styled.div`
  height: 15.28vw;
  display: flex;
  align-items: center;

  &:nth-child(1) {
    justify-content: flex-start;
    width: 9%;
  }

  &:nth-child(2) {
    justify-content: flex-start;
    gap: 5vw;
    width: 35%;
  }

  &:nth-child(3) {
    justify-content: flex-start;
    margin-left: 2.5vw;
    gap: 10vw;
    width: 40%;
  }

  &:nth-child(4) {
    justify-content: center;

    width: 7%;
  }
`;

const ApplyOrderBox = styled.div`
  width: auto;
  height: auto;
  padding: 1.11vw 1.67vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background-color: rgba(216, 88, 136, 0.1);
`;

const OuterEllipse = styled.svg`
  width: 4.43vw; //26.6px;
  height: 4.4vw; //26px;
`;

const HeartShape = styled.svg`
  width: 2.83vw; //17px;
  height: 2.8vw; //16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HeartIconContainer = styled.div`
  position: relative;
  width: 5vw; //28px;
  height: 4.4vw; //26px;
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

export default CurrentInfo;
