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

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const appliedValue = localStorage.getItem('isApplied');
    if (appliedValue !== null) {
      setIsApplied(appliedValue === 'false');
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
              <Body>
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
                <Typography size="3.89vw" bold="700" color="#141414" style={{ lineHeight: '120%' }}>
                  {dictionary.interest}
                </Typography>
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
              <Body>
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

export default CurrentInfo;
