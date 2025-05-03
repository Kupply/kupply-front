import React, { useState } from 'react';
import styled from 'styled-components';
import { VictoryTheme, VictoryScatter, VictoryChart, VictoryTooltip, VictoryAxis } from 'victory';
import { majorColorMapping } from '../../../mappings/Mappings';
import Typography from '../../../assets/Typography';

interface Datum {
  college: string;
  curApplyNum: number;
  curAccumGPA: number;
}

interface Datum2 {
  college: string;
  curApplyNum: number;
  avgGpa: number;
}

const MobileScatter = ({ onViewMajor, curData, isApplied }: { onViewMajor: any; curData: any; isApplied: boolean }) => {
  const scatterData: Datum[] = curData[onViewMajor - 1].scatterChartData;
  const filteredData: Datum2[] = scatterData
    .filter((item) => item.curApplyNum !== 0)
    .map(({ college, curAccumGPA, curApplyNum }) => ({
      college,
      avgGpa: Number((curAccumGPA / curApplyNum).toFixed(2)),
      curApplyNum,
    }));

  const maxApplyValue = Math.max(...filteredData.map((item) => item.curApplyNum));
  const maxYValue = Math.ceil(maxApplyValue / 10) * 10;
  const minGpaValue = Math.min(...filteredData.map((item) => item.avgGpa));
  const minXValue = Math.floor(minGpaValue * 2) / 2;
  const TicGap = (4.5 - minXValue) / 4;
  const color = filteredData.map((item) => majorColorMapping[item.college as keyof typeof majorColorMapping].fill);

  return (
    <>
      {isApplied && (
        <Wrapper>
          <TitleBox>
            <Icon src="designImage/mobile/myboard/Chart.svg" alt="Icon" />
            <TitleText>이중전공 지원자 학과 분포</TitleText>
          </TitleBox>

          <BodyBox>
            <VictoryChart theme={VictoryTheme.material} domain={{ x: [minXValue, 4.5], y: [0, maxYValue] }}>
              <VictoryAxis
                label="지원자 평균 학점"
                tickValues={[minXValue, minXValue + TicGap, minXValue + TicGap * 2, minXValue + TicGap * 3, 4.5]}
                style={{
                  grid: { stroke: 'rgba(185, 185, 185, 0.8)' },
                  axisLabel: { padding: 33, color: '#434343', fontFamily: 'Pretendard', fontSize: '3.5vw' },
                  ticks: { size: 5 },
                  tickLabels: { fontSize: '2.5vw', fontFamily: 'Pretendard' },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  grid: { stroke: 'rgba(185, 185, 185, 0.8)' },
                  tickLabels: { fontSize: '2.5vw', fontFamily: 'Pretendard' },
                }}
              />
              <VictoryScatter
                data={filteredData}
                x="avgGpa"
                y="curApplyNum"
                size={8}
                labels={({ datum }) => `${datum.college}\n평균 GPA: ${datum.avgGpa}\n지원자 수: ${datum.curApplyNum}명`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{ fill: 'rgba(255, 255, 255, 0.80)', stroke: 'none' }}
                    style={{ fontSize: 12, textAnchor: 'start' }}
                    dy={-9} // 라벨 점 위로 이동
                    flyoutPadding={{ top: -15, bottom: -15, left: 8, right: 8 }} // 라벨 크기 수정
                    orientation="top"
                    constrainToVisibleArea
                  />
                }
                style={{
                  data: {
                    fill: (args) => color[filteredData.findIndex((item) => item.college === args.datum.college)],
                  },
                }}
              />
            </VictoryChart>
          </BodyBox>
        </Wrapper>
      )}
    </>
  );
};

// 커스텀 툴팁 컴포넌트 (이게 문제인듯.... )
const CustomTooltipLabel = (props: any) => {
  return (
    <foreignObject x={props.x - 40} y={props.y - 70} width="80" height="75">
      <TooltipContainer>
        <p>
          <ToolTipBordText>{props.datum.college}</ToolTipBordText>
          <br />
          <ToolTipNormalText>학점 </ToolTipNormalText>
          <ToolTipBordText>{props.datum.avgGpa}</ToolTipBordText>
          <br />
          <ToolTipNormalText>지원자 </ToolTipNormalText>
          <ToolTipBordText>{props.datum.curApplyNum}명</ToolTipBordText>
        </p>
      </TooltipContainer>
    </foreignObject>
  );
};

// 스타일 정의
const Wrapper = styled.div`
  position: relative;
  width: 91.11vw;
  margin-top: 16.67vw;

  padding-bottom: 20.83vw;
`;

const BodyBox = styled.div`
  position: relative;
  width: 100%;
  border-radius: 2.78vw;
  border: 1px solid var(--box_stroke, #a8a8a8);
  background: rgba(255, 255, 255, 0.6);
  margin-top: 4.72vw;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  gap: 1.67vw;
  margin-bottom: 1.94vw;
  z-index: 2;
`;

const TitleText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 5vw;
  font-weight: 700;
  line-height: 120%;
`;

const TooltipContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.8);

  & > p {
    margin-top: -1px;
    margin-bottom: 1px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(255, 255, 255, 0.8);
    transform: translateX(-50%);
  }
`;

const ToolTipNormalText = styled.text`
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: 157.143%;
`;

const ToolTipBordText = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 700;
  line-height: 157.143%;
`;

const Icon = styled.img`
  position: relative;
  display: flex;
  width: 4.44vw;
  height: 4.44vw;
`;

export default MobileScatter;
