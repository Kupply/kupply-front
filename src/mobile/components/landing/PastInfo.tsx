// dummy data 만들어서 개발중

import styled from 'styled-components';
import Typography from '../../../assets/Typography';
import { ITableData } from '../../../pages/landing/LandingPage';

export interface PastInfoProps {
  isAscending: boolean;
  isShowAll: boolean;
  tableData: ITableData[];
}

function PastInfo(props: PastInfoProps) {
  const { isAscending, isShowAll, tableData } = props;

  const arrangedData = isAscending
    ? tableData.sort((a, b) => a.pastPassedRate - b.pastPassedRate)
    : tableData.sort((a, b) => b.pastPassedRate - a.pastPassedRate);
  const visibleData = isShowAll ? arrangedData : arrangedData.slice(0, 4);

  return (
    <MainWrapper>
      <HeaderWrapper>
        <Header>순위</Header>
        <Header>이중전공</Header>
        <Header>지난 합격률</Header>
        <Header>지난 합격자 평균</Header>
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
              {dictionary.pastPassedRate < 0 ? '집계불가' : dictionary.pastPassedRate + '%'}
            </Typography>
          </Body>
          <Body>
            <Typography size="3.89vw" bold="500" style={{ lineHeight: '120%' }}>
              {dictionary.pastmean.toFixed(2)}
            </Typography>
          </Body>
        </BodyWrapper>
      ))}
    </MainWrapper>
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
    width: 20%;
  }

  &:nth-child(4) {
    width: 27%;
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
    width: 20%;
  }

  &:nth-child(4) {
    justify-content: center;
    width: 27%;
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

export default PastInfo;
