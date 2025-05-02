import React, { Fragment } from 'react';
import styled from 'styled-components';

import { CallbackArgs, VictoryPie } from 'victory';
import { idColorMapping, idColorMappingShadow } from '../../mappings/Mappings';

// 하드코딩
// 커스텀하기 너무 귀차나... 일단 파이차트랑 비슷한 형태로

interface Datum {
  stdIdYear: string;
  curApplyNum: number;
}
// 그래프 확인용 임시 데이터
// const tmpData = [
//   {
//     id: 23,
//     value: 60,
//   },
//   {
//     id: 22,
//     value: 30,
//   },
//   {
//     id: 21,
//     value: 10,
//   },
//   {
//     id: 20,
//     value: 14,
//   },
//   {
//     id: 19,
//     value: 24,
//   },
//   {
//     id: 18,
//     value: 2,
//   },
// ];

const HalfPie = ({ onViewMajor, curData }: { onViewMajor: any; curData: any }) => {
  const halfpieData = curData[onViewMajor - 1].halfChartData;
  const totalValue = halfpieData.reduce((acc: number, cur: Datum) => acc + cur.curApplyNum, 0);
  const currentYear = new Date().getFullYear(); // 현재 년도
  const studentId = currentYear - 2000; // 기준 학번 : 24

  const filteredData = halfpieData.filter((item: Datum) => {
    return +item.stdIdYear >= studentId - 10 && +item.stdIdYear <= studentId - 1; // 23 ~ 14학번까지
  });

  let newStudentIdValue = 0;
  let newData = [];
  filteredData.forEach((item: Datum) => {
    if (+item.stdIdYear > studentId - 4) {
      newData.push({
        id: item.stdIdYear,
        value: item.curApplyNum,
      });
    } else {
      newStudentIdValue += item.curApplyNum;
    }
  });

  newData.push({
    id: studentId - 4,
    value: newStudentIdValue,
  });

  const color = newData.map((item) => {
    if (item) {
      return idColorMapping[item.id];
    } else {
      return '';
    }
  });

  return (
    <PieWrapper>
      <VictoryPie
        data={newData}
        x="id"
        y="value"
        radius={190}
        innerRadius={170} // 내부 반지름
        cornerRadius={999} // 모서리 둥굴게
        padAngle={3}
        colorScale={color}
        startAngle={-90}
        endAngle={90}
        style={{
          data: {
            filter: (args: CallbackArgs) => {
              const datum = args.datum as Datum;
              return `drop-shadow(0px 16px 18px ${idColorMappingShadow[+datum.stdIdYear]})`;
            },
          },
          labels: { display: 'none' }, // 파이 안에 라벨 invisible
        }}
      />

      <LabelsWrapper>
        {newData.map((item, index) => (
          <Fragment key={item?.id}>
            <FirstLineBox>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LabelColor color={idColorMapping[item?.id as keyof typeof idColorMapping]} />
                <MaJorText>
                  {item?.id}학번{index === newData.length - 1 ? ' 이상' : ''}
                </MaJorText>
              </div>
              {item && <PercentText>{((item.value / totalValue) * 100).toFixed(0)}%</PercentText>}
            </FirstLineBox>
            <SecondLineBox>
              <NumText>{item?.value}명</NumText>
            </SecondLineBox>
            {index < newData.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11.61vw"
                height="2"
                viewBox="0 0 223 2"
                fill="none"
                style={{ marginTop: '0.98vw', marginBottom: '0.98vw' }}
              >
                <path d="M0.887207 1H222.474" stroke="#DFDFDF" strokeLinecap="round" />
              </svg>
            )}
          </Fragment>
        ))}
      </LabelsWrapper>

      <CircleCenterBox>
        <span>
          <CenterText>지원자 별</CenterText>
          <span style={{ display: 'flex' }}>
            <MaJorText style={{ lineHeight: '120%' }}>학번 &nbsp;</MaJorText> <CenterText>분포</CenterText>
          </span>
        </span>
      </CircleCenterBox>
    </PieWrapper>
  );
};

const PieWrapper = styled.div`
  position: relative;
  display: center;
  justify-content: center;

  width: 10.42vw;
  height: 9.82vw;
  flex-shrink: 0;
`;

const LabelsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  top: -22.91px;
  left: 12.21vw;
`;

const FirstLineBox = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const SecondLineBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 0.16vw;

  margin-top: 0.3vw;
`;

const CircleCenterBox = styled.div`
  position: absolute;
  display: flex;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  top: 0px;
`;

///////////////// text /////////////////

const MaJorText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

const PercentText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

const NumText = styled.div`
  color: var(--A8_Grey-4, #a8a8a8);
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const CenterText = styled.div`
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

///////////////// image /////////////////

const LabelColor = styled.span<{ color: string }>`
  display: inline-block;
  width: 0.52vw;
  height: 0.5vw;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 0.78vw;
`;

export default HalfPie;
