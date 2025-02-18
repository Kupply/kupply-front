import React, { Fragment } from 'react';
import styled from 'styled-components';

import { CallbackArgs, VictoryPie } from 'victory';
import { majorColorMapping } from '../../../mappings/Mappings';

// vector 수정 필요

interface Datum {
  college: string;
  curApplyNum: number;
}

const MobilePie = ({ onViewMajor, curData }: { onViewMajor: any; curData: any }) => {
  const pieData: Datum[] = curData[onViewMajor - 1].fullChartData;
  const totalValue = pieData.reduce((acc: number, cur: Datum) => acc + cur.curApplyNum, 0);

  const sortedData = [...pieData].sort((a, b) => b.curApplyNum - a.curApplyNum);
  const topFourData = sortedData.slice(0, 4); // top 4 추출
  const LastValue = sortedData.slice(4).reduce((acc, data) => acc + data.curApplyNum, 0);

  const OtherData = {
    college: '기타',
    curApplyNum: LastValue,
  };

  const TopFiveData = topFourData.concat(OtherData);

  // topFourData 기반으로 color 설정
  const color = TopFiveData.map((item) => majorColorMapping[item.college as keyof typeof majorColorMapping].fill);

  return (
    <PieWrapper>
      <VictoryPie
        data={TopFiveData}
        x="college"
        y="curApplyNum"
        cornerRadius={999} // 모서리 둥굴게
        radius={190}
        innerRadius={170} // 내부 반지름
        padAngle={3} // 간격
        colorScale={color}
        startAngle={-90}
        endAngle={270}
        animate={{ easing: 'exp' }}
        style={{
          data: {
            filter: (args: CallbackArgs) => {
              const datum = args.datum as Datum;
              const name = datum.college as keyof typeof majorColorMapping;
              return `drop-shadow(0px 16px 18px ${majorColorMapping[name].boxShadow})`;
            },
          },
          labels: { display: 'none' }, // 파이 안에 라벨 invisible
        }}
      />

      <LabelsWrapper>
        {TopFiveData.map((item, index) =>
          index < 5 ? (
            <Fragment key={item.college}>
              <FirstLineBox>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <LabelColor color={majorColorMapping[item.college as keyof typeof majorColorMapping].fill} />
                  <MaJorText>{item.college}</MaJorText>
                </div>
                <PercentText>{((item.curApplyNum / totalValue) * 100).toFixed(0)}%</PercentText>
              </FirstLineBox>
              <SecondLineBox>
                <NumText>{item.curApplyNum}명</NumText>
              </SecondLineBox>
              {index < 5 - 1 && <Vector />}
            </Fragment>
          ) : null,
        )}
      </LabelsWrapper>
      <CircleCenterBox>
        <span>
          <CenterText>지원자 별</CenterText>
          <span style={{ display: 'flex' }}>
            <MaJorText style={{ lineHeight: '120%' }}>단과대&nbsp;</MaJorText> <CenterText>분포</CenterText>
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
  top: -20vw;
  left: 3.35vw;
`;

const LabelsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  //top: 9.72vw;
  top: -10vw;
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

export default MobilePie;
