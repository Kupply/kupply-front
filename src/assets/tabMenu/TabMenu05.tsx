import React, { useState, useEffect, Fragment } from 'react';
import { Cell, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, DotProps } from 'recharts';
import styled from 'styled-components';
import Typography from '../OldTypography';
import { TableUnique } from 'typeorm';

// 기존 코드 간소화 vw 변환
// px -> vw 대충 변환해서 아직까지는 잘 작동 X

type Rank = '01' | '02' | '03' | '04';
type StudentData = {
  name: string;
  gpa: string;
  hopemajor: string;
};

interface myStageData {
  majorName: string;
  recruitNum: number;
  applyNum: number;
  rank: number;
}

function calculateRank(applyNum: number, recruitNum: number, rankNum: number, myPercentile: number): Rank {
  //if (recruitNum <= applyNum) {
  if (myPercentile <= 25) {
    return '01';
  } else if (myPercentile <= 50) {
    return '02';
  } else if (myPercentile <= 75) {
    return '03';
  } else {
    return '04';
  }
}

const MyStageChart: React.FC<myStageData> = (data) => {
  let { majorName, recruitNum, applyNum, rank: rankNum } = data;
  const hopeMajor2 = localStorage.getItem('hopeMajor2') || '';
  if (hopeMajor2 === majorName) {
    applyNum++;
  }
  let myPercentile = (rankNum / applyNum) * 100;
  if (rankNum === applyNum && rankNum === 1) {
    myPercentile = 1;
  }
  // FIXME: applyNum 0일때?
  let rank: Rank = calculateRank(applyNum, recruitNum, rankNum, myPercentile); // 4단계 중 현재 위치

  let MyName: string = localStorage.getItem('nickname') || '';
  let HopeMajor: string = majorName;

  switch (rank) {
    case '01':
      return (
        <MainWrapper>
          <Wrapper>
            <NotchSquareColor
              src="../../designImage/tabMenu/TabMenu05NotchSquare01.svg"
              alt="first line first"
              style={{
                fill: '#3ad54e',
                filter: 'drop-shadow(0px 20px 50px rgba(58, 213, 78, 0.4))',
                marginLeft: '-514px',
              }}
            />
            <InnerBox style={{ marginLeft: '-535px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05SunWhite.svg" alt="Sun" />
              <WhiteText>안정지원</WhiteText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-535px' }}>
              <TextBoxColor style={{ color: 'rgba(58, 213, 78, 0.80)' }}>
                도전자님의 학점에 알맞는
                <br />
                적정지원이에요.
              </TextBoxColor>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line second"
              style={{ marginLeft: '-196px' }}
            />
            <InnerBox style={{ marginLeft: '-185px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05PartlyCloudyBlack.svg" alt="Partly Cloudy" />
              <BlackText>무난지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-175px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line third"
              style={{ marginLeft: '150px' }}
            />
            <InnerBox style={{ marginLeft: '170px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05CloudyBlack.svg" alt="Cloudy" />
              <BlackText>소신지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '170px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line third"
              style={{ marginLeft: '500px' }}
            />
            <InnerBox style={{ marginLeft: '510px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05RainyBlack.svg" alt="Rainy" />
              <BlackText>위험지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '520px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
          </Wrapper>

          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <div style={{ marginLeft: '28px', marginTop: '-105px' }}>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>
                  {MyName}님의 {HopeMajor}&nbsp;
                </DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중 지원 시</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>지원안정도 점수</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>는,</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </div>
          </DefaultWrapper>
        </MainWrapper>
      );

    case '02':
      return (
        <MainWrapper>
          <Wrapper>
            <Square
              src="../../designImage/tabMenu/TabMenu05Square.svg"
              alt="first line first"
              style={{ marginLeft: '-505px', marginTop: '-29px' }}
            />
            <InnerBox style={{ marginLeft: '-535px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05SunBlack.svg" alt="Sun" />
              <BlackText>안정지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-535px' }}>
              <TextBoxNormal>
                도전자님의 학점에 알맞는
                <br />
                적정지원이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareColor
              src="../../designImage/tabMenu/TabMenu05NotchSquare02.svg"
              alt="first line second"
              style={{
                fill: '#4894E3',
                filter: 'drop-shadow(0px 20px 50px rgba(72, 148, 227, 0.40))',
                marginLeft: '-196px',
                marginTop: '-29px',
              }}
            />
            <InnerBox style={{ marginLeft: '-185px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05PartlyCloudyWhite.svg" alt="Partly Cloudy" />
              <WhiteText>무난지원</WhiteText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-175px' }}>
              <TextBoxColor style={{ color: 'rgba(72, 148, 227, 0.80)' }}>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxColor>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line third"
              style={{ marginLeft: '150px' }}
            />
            <InnerBox style={{ marginLeft: '170px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05CloudyBlack.svg" alt="Cloudy" />
              <BlackText>소신지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '170px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line third"
              style={{ marginLeft: '500px' }}
            />
            <InnerBox style={{ marginLeft: '510px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05RainyBlack.svg" alt="Rainy" />
              <BlackText>위험지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '520px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
          </Wrapper>
          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <div style={{ marginLeft: '28px', marginTop: '-105px' }}>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>
                  {MyName}님의 {HopeMajor}&nbsp;
                </DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중 지원 시</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>지원안정도 점수</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>는,</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </div>
          </DefaultWrapper>
        </MainWrapper>
      );

    case '03':
      return (
        <MainWrapper>
          <Wrapper>
            <Square
              src="../../designImage/tabMenu/TabMenu05Square.svg"
              alt="first line first"
              style={{ marginLeft: '-505px', marginTop: '-29px' }}
            />
            <InnerBox style={{ marginLeft: '-535px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05SunBlack.svg" alt="Sun" />
              <BlackText>안정지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-535px' }}>
              <TextBoxNormal>
                도전자님의 학점에 알맞는
                <br />
                적정지원이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line second"
              style={{ marginLeft: '-196px' }}
            />
            <InnerBox style={{ marginLeft: '-185px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05PartlyCloudyBlack.svg" alt="Partly Cloudy" />
              <BlackText>무난지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-175px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareColor
              src="../../designImage/tabMenu/TabMenu05NotchSquare03.svg"
              alt="first line third"
              style={{
                fill: '#D85888',
                filter: 'drop-shadow(0px 20px 50px rgba(216, 88, 136, 0.40))',
                marginLeft: '150px',
                marginTop: '-29px',
              }}
            />
            <InnerBox style={{ marginLeft: '170px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05CloudyWhite.svg" alt="Cloudy" />
              <WhiteText>소신지원</WhiteText>
            </InnerBox>
            <TextBox style={{ marginLeft: '170px' }}>
              <TextBoxColor style={{ color: 'rgba(216, 88, 136, 0.80)' }}>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxColor>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line third"
              style={{ marginLeft: '500px' }}
            />
            <InnerBox style={{ marginLeft: '510px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05RainyBlack.svg" alt="Rainy" />
              <BlackText>위험지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '520px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
          </Wrapper>
          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <div style={{ marginLeft: '28px', marginTop: '-105px' }}>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>
                  {MyName}님의 {HopeMajor}&nbsp;
                </DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중 지원 시</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>지원안정도 점수</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>는,</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </div>
          </DefaultWrapper>
        </MainWrapper>
      );

    case '04':
      return (
        <MainWrapper>
          <Wrapper>
            <Square
              src="../../designImage/tabMenu/TabMenu05Square.svg"
              alt="first line first"
              style={{ marginLeft: '-505px', marginTop: '-29px' }}
            />
            <InnerBox style={{ marginLeft: '-535px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05SunBlack.svg" alt="Sun" />
              <BlackText>안정지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-535px' }}>
              <TextBoxNormal>
                도전자님의 학점에 알맞는
                <br />
                적정지원이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line second"
              style={{ marginLeft: '-196px' }}
            />
            <InnerBox style={{ marginLeft: '-185px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05PartlyCloudyBlack.svg" alt="Partly Cloudy" />
              <BlackText>무난지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '-175px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareNormal
              src="../../designImage/tabMenu/TabMenu05NotchSquare.svg"
              alt="first line third"
              style={{ marginLeft: '150px' }}
            />
            <InnerBox style={{ marginLeft: '170px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05CloudyBlack.svg" alt="Cloudy" />
              <BlackText>소신지원</BlackText>
            </InnerBox>
            <TextBox style={{ marginLeft: '170px' }}>
              <TextBoxNormal>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxNormal>
            </TextBox>
            <NotchSquareColor
              src="../../designImage/tabMenu/TabMenu05NotchSquare04.svg"
              alt="first line third"
              style={{
                fill: '#E84549',
                filter: 'drop-shadow(0px 20px 50px rgba(232, 69, 73, 0.40))',
                marginLeft: '460px',
                marginTop: '-29px',
              }}
            />
            <InnerBox style={{ marginLeft: '510px' }}>
              <InnerIcon src="../../designImage/tabMenu/TabMenu05RainyWhite.svg" alt="Rainy" />
              <WhiteText>위험지원</WhiteText>
            </InnerBox>
            <TextBox style={{ marginLeft: '520px' }}>
              <TextBoxColor style={{ color: '#E84549' }}>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxColor>
            </TextBox>
          </Wrapper>
          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <div style={{ marginLeft: '28px', marginTop: '-105px' }}>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>
                  {MyName}님의 {HopeMajor}&nbsp;
                </DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중 지원 시</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>지원안정도 점수</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>는,</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </div>
          </DefaultWrapper>
        </MainWrapper>
      );
  }
};

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 2.92vw; // 56px;
  margin-top: 34px;

  // border: 1px solid black;
`;

const Wrapper = styled.div`
  width: 37.97vw; //  729px;
  height: 94px;
  position: relative;
  display: flex; /* 요소들을 행으로 정렬 */
  align-items: flex-start;
  justify-content: center;

  // margin-left: 42px;

  //border: 1px solid black;
`;

const NotchSquareColor = styled.img`
  //width: 196px;
  //height: 49px;
  position: absolute;
  display: flex;
  flex-shrink: 0;
  margin: -0.78vw; // -15px;
`;

const NotchSquareNormal = styled.img`
  position: absolute;
  display: flex;

  fill: var(--White, #fff);
  stroke-width: 1px;
  stroke: var(--kitsch, #a8a8a8);
  filter: drop-shadow(0px 20px 50px rgba(223, 223, 223, 0.4));
  flex-shrink: 0;
  margin: -0.78vw; // -15px;
`;

const Square = styled.img`
  //width: 187px;
  //height: 49px;
  position: absolute;
  display: flex;
  flex-shrink: 0;

  fill: var(--White, #fff);
  stroke-width: 1px;
  stroke: var(--kitsch, #a8a8a8);
  filter: drop-shadow(0px 20px 50px rgba(223, 223, 223, 0.4));
`;

const InnerBox = styled.div`
  width: 5.22vw; //100px;
  height: 20px;
  position: absolute;
  display: flex;
  gap: 0.52vw; //10px;
  padding: 15px 2.5vw 15px 2.5vw; //  15px 48px 15px 48px;
  z-index: 1;

  //border: 1px solid black;
`;

const InnerIcon = styled.img`
  width: 1.04vw; // 20px;
  height: 20px;
  flex-shrink: 0;
`;

const WhiteText = styled.div`
  color: var(--White, #fff);
  font-family: Pretendard;
  font-size: 1.04vw; // 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
`;

const BlackText = styled.div`
  color: rgba(20, 20, 20, 0.8);
  font-family: Pretendard;
  font-size: 1.04vw; // 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 100% */
`;

const TextBox = styled.div`
  width: 9.17vw; // 176px;
  height: 36px;
  flex-shrink: 0;
  position: absolute;
  display: flex;
  z-index: 1;

  margin-top: 59px;
  //border: 1px solid black;
`;

const TextBoxNormal = styled.div`
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 0.73vw; // 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
`;

const TextBoxColor = styled.div`
  font-family: Pretendard;
  font-size: 0.73vw; // 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`;

//////////////// Default ////////////////

const DefaultWrapper = styled.div`
  width: 21.51vw; // 413px;
  height: 100px;
  position: relative;

  //border: 1px solid black;
`;

const DefaultText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 0.94vw; // 18px;
  font-style: normal;
  line-height: 24px;
  margin: 0;
`;

const NumText = styled.div`
  color: #d85888;

  /* Heading 1 */
  font-family: Pretendard;
  font-size: 2.5vw; // 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 104.167%;
  margin: 0;
`;

const PercentText = styled.div`
  color: rgba(67, 67, 67, 0.8);
  font-family: Pretendard;
  font-size: 2.5vw; // 48px;
  font-style: normal;
  font-weight: 400;
  line-height: 104.167%;
  margin: 0;
`;

const Bar = styled.img`
  flex-shrink: 0;

  align-items: flex-start;
`;

// 가상 데이터
// const RankData: StudentData[] = [
//   { name: 'ggg', gpa: '2.8', hopemajor: '경영학과' },
//   { name: 'hhh', gpa: '3.0', hopemajor: '경영학과' },
//   { name: 'iii', gpa: '3.5', hopemajor: '경영학과' },
//   { name: 'jjj', gpa: '3.5', hopemajor: '경영학과' },
//   { name: 'kkk', gpa: '3.5', hopemajor: '경영학과' },
//   { name: 'lll', gpa: '3.5', hopemajor: '경영학과' },
//   { name: 'mmm', gpa: '4.0', hopemajor: '경영학과' },
//   { name: 'nnn', gpa: '4.0', hopemajor: '경영학과' },
//   { name: 'hhh', gpa: '4.2', hopemajor: '경영학과' },
//   { name: '고대빵', gpa: '4.0', hopemajor: '경영학과' },
// ];

// 모집인원 수
// const Num = 10;

// const MyData: StudentData = { name: '고대빵', gpa: '4.0', hopemajor: '경영학과' };

// 전체 학점만 추출하여 내림차순으로 정렬
// const allGPAs = RankData.map((student) => parseFloat(student.gpa));
// allGPAs.sort((a, b) => b - a);

// const myGPA = parseFloat(MyData.gpa);

// MyData의 GPA를 포함한 전체 GPA 배열 생성
// const allGPAsIncludingMyGPA = [...allGPAs, myGPA];

// MyData의 GPA를 포함한 전체 GPA 배열을 내림차순으로 정렬
// allGPAsIncludingMyGPA.sort((a, b) => b - a);

// MyData의 등수 계산
// const myRank = allGPAsIncludingMyGPA.indexOf(myGPA) + 1;

// 등수를 퍼센트로 나타내기
// let myPercentile = (myRank / Num) * 100;

export default MyStageChart;
