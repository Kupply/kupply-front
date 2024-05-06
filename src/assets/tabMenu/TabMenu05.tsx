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
            <StageBox1 src="../../designImage/tabMenu/tabmenu_type_05_1.webp" />
            <TextBox>
              <TextBoxColor style={{ color: 'rgba(58, 213, 78, 0.80)' }}>
                도전자님의 학점에 맞는 <br />
                적정지원이에요.
              </TextBoxColor>
              <TextBoxNormal style={{ marginLeft: '2.20vw' }}>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxNormal>
              <TextBoxNormal style={{ marginLeft: '1.05vw' }}>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxNormal>
              <TextBoxNormal style={{ marginLeft: '0.53vw' }}>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
          </Wrapper>

          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <DefaultTextBox>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{HopeMajor}</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중전공 지원자들 중&nbsp;</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{MyName}님의 학점</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>은, 상위</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </DefaultTextBox>
          </DefaultWrapper>
        </MainWrapper>
      );

    case '02':
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox2 src="../../designImage/tabMenu/tabmenu_type_05_2.webp" />
            <TextBox>
              <TextBoxNormal>
                도전자님의 학점에 맞는 <br />
                적정지원이에요.
              </TextBoxNormal>
              <TextBoxColor style={{ color: 'rgba(72, 148, 227, 0.80)', marginLeft: '2.20vw' }}>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxColor>
              <TextBoxNormal style={{ marginLeft: '1.05vw' }}>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxNormal>
              <TextBoxNormal style={{ marginLeft: '0.53vw' }}>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
          </Wrapper>
          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <DefaultTextBox>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{HopeMajor}</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중전공 지원자들 중&nbsp;</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{MyName}님의 학점</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>은, 상위</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </DefaultTextBox>
          </DefaultWrapper>
        </MainWrapper>
      );

    case '03':
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox2 src="../../designImage/tabMenu/tabmenu_type_05_3.webp" />
            <TextBox>
              <TextBoxNormal>
                도전자님의 학점에 맞는 <br />
                적정지원이에요.
              </TextBoxNormal>
              <TextBoxNormal style={{ marginLeft: '2.20vw' }}>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxNormal>
              <TextBoxColor style={{ color: 'rgba(216, 88, 136, 0.80)', marginLeft: '1.05vw' }}>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxColor>
              <TextBoxNormal style={{ marginLeft: '0.53vw' }}>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxNormal>
            </TextBox>
          </Wrapper>

          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <DefaultTextBox>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{HopeMajor}</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중전공 지원자들 중&nbsp;</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{MyName}님의 학점</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>은, 상위</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </DefaultTextBox>
          </DefaultWrapper>
        </MainWrapper>
      );

    case '04':
      return (
        <MainWrapper>
          <Wrapper>
            <StageBox2 src="../../designImage/tabMenu/tabmenu_type_05_4.webp" />
            <TextBox>
              <TextBoxNormal>
                도전자님의 학점에 맞는 <br />
                적정지원이에요.
              </TextBoxNormal>
              <TextBoxNormal style={{ marginLeft: '2.20vw' }}>
                도전자님의 학점보다 조금
                <br />
                상향지원이에요.
              </TextBoxNormal>
              <TextBoxNormal style={{ marginLeft: '1.05vw' }}>
                도전자님의 학점보다 상향지원
                <br />
                이에요.
              </TextBoxNormal>
              <TextBoxColor style={{ color: '#E84549', marginLeft: '0.53vw' }}>
                도전자님의 학점보다 매우 높은
                <br />
                상향지원이에요.
              </TextBoxColor>
            </TextBox>
          </Wrapper>
          <DefaultWrapper>
            <Bar src="../../designImage/tabMenu/TabMenu05Bar.svg" alt="Vector" />
            <DefaultTextBox>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{HopeMajor}</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>이중전공 지원자들 중&nbsp;</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <DefaultText style={{ fontWeight: '700' }}>{MyName}님의 학점</DefaultText>
                <DefaultText style={{ fontWeight: '400' }}>은, 상위</DefaultText>
              </span>
              <span style={{ display: 'flex' }}>
                <NumText>{myPercentile.toFixed(2)}&nbsp;</NumText>
                <PercentText>%</PercentText>
              </span>
            </DefaultTextBox>
          </DefaultWrapper>
        </MainWrapper>
      );
  }
};

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 2.92vw; // 56px;
`;

const Wrapper = styled.div`
  width: 37.97vw; //  729px;
  height: 94px;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const StageBox1 = styled.img`
  position: absolute;
  width: 100%;

  top: 0;
  flex-shrink: 0;
`;

const StageBox2 = styled.img`
  position: absolute;
  width: 100%;

  top: -0.64vw;
  flex-shrink: 0;
`;

const TextBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  width: 40vw;

  top: 3.59375vw;
  left: 1.54vw;
`;
const TextBoxNormal = styled.div`
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 0.73vw; // 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 128.571%;
`;

const TextBoxColor = styled.div`
  font-family: Pretendard;
  font-size: 0.73vw; // 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 128.571%;
`;

//////////////// Default ////////////////

const DefaultWrapper = styled.div`
  position: absolute;
  width: 21.51vw; // 413px;
  height: 4.91vw;

  left: 39.08vw;
  //border: 1px solid black;
`;

const DefaultTextBox = styled.div`
  position: absolute;
  top: 0.25vw;
  left: 1.25vw;
`;

const DefaultText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  line-height: 118%;
  margin: 0;
`;

const NumText = styled.div`
  color: #d85888;

  /* Heading 1 */
  font-family: Pretendard;
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 104.167%;
  margin: 0;
`;

const PercentText = styled.div`
  color: rgba(67, 67, 67, 0.8);
  font-family: Pretendard;
  font-size: 2.5vw;
  font-style: normal;
  font-weight: 400;
  line-height: 104.167%;
  margin: 0;
`;

const Bar = styled.img`
  height: 5.3125vw;
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
