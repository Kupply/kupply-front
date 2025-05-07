import React, { Fragment } from 'react';
import styled from 'styled-components';

import { CallbackArgs, VictoryPie } from 'victory';
import { majorColorMapping } from '../../mappings/Mappings';

// 하드코딩

interface Datum {
  college: string;
  curApplyNum: number;
}

// const tmpData = [
//   {
//     name: '경영대학',
//     value: 5,
//     avgGpa: 4.4,
//   },
//   {
//     name: '정경대학',
//     value: 10,
//     avgGpa: 3.5,
//   },
//   {
//     name: '의과대학',
//     value: 30,
//     avgGpa: 3.0,
//   },
//   {
//     name: '정보대학',
//     value: 14,
//     avgGpa: 4.2,
//   },
//   {
//     name: '미디어학부',
//     value: 24,
//     avgGpa: 4.0,
//   },
//   {
//     name: '스마트보안학부',
//     value: 15,
//     avgGpa: 3.8,
//   },
// ];

const Pie = ({ onViewMajor, curData }: { onViewMajor: any; curData: any }) => {
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
              {index < 5 - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.61vw"
                  height="2"
                  viewBox="0 0 223 2"
                  fill="none"
                  style={{ marginTop: '0.98vw', marginBottom: '0.98vw' }}
                >
                  <path d="M0.887207 1H222.474" stroke="#DFDFDF" stroke-linecap="round" />
                </svg>
              )}
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
  position: relative;
  display: center;
  justify-content: center;

  width: 10.42vw;
  height: 13vw;
  flex-shrink: 0;
`;

const LabelsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  top: -24.5px;
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

export default Pie;
