import React, { Fragment } from 'react';
import styled from 'styled-components';

import { CallbackArgs, VictoryPie } from 'victory';
import { idColorMapping, idColorMappingShadow } from '../../../mappings/Mappings';

// Vector 수정 필요 !

interface Datum {
  stdIdYear: string;
  curApplyNum: number;
}

const MobileHalfPie = ({ onViewMajor, curData }: { onViewMajor: any; curData: any }) => {
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
            {index < newData.length - 1 && <Vector />}
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
  position: absolute;
  display: center;
  justify-content: center;

  width: 34.13vw;
  height: 34.16vw;
  flex-shrink: 0;

  //top: 8.89vw;
  top: -15vw;
  left: 3.35vw;
`;

const LabelsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 44.44vw;

  top: -8vw;
  left: 40.67vw;
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

  margin-top: 0.83vw;
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

  /* mob_tiny_Bold */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
`;

const PercentText = styled.div`
  color: #141414;

  /* mob_tiny_Bold */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 13.2px */
`;

const NumText = styled.div`
  color: #a8a8a8;

  /* mob_tiny_Regular */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 13.2px */
`;

const CenterText = styled.div`
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 13.2px */
`;

///////////////// image /////////////////

const LabelColor = styled.span<{ color: string }>`
  display: inline-block;
  width: 2.5vw;
  height: 2.5vw;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 1.94vw;
`;

const Vector = styled.div`
  width: 43.61vw;
  height: 0px;
  flex-shrink: 0;
  stroke-width: 1px;
  color: #dfdfdf;
  z-index: 1;

  //margin-top: 3.61vw;
  margin-top: 1.94vw;
  margin-bottom: 2.22vw;
  border: 1px solid #dfdfdf;
`;

export default MobileHalfPie;
