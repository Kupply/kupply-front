import React from 'react';
import styled from 'styled-components';

import {
  VictoryTheme,
  VictoryScatter,
  VictoryChart,
  VictoryTooltip,
  VictoryAxis,
  VictoryLabel,
  VictoryVoronoiContainer,
} from 'victory';
import { majorColorMapping } from '../../../utils/Mappings';
import Typography from '../../../assets/Typography';

// 하드코딩
// 호버 tooltip 커스텀해야 됨 + 폰트 스타일 적용 X
// plot 아래 학과 나타내기 X

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
  const sccatterData: Datum[] = curData[onViewMajor - 1].scatterChartData;
  const filteredData: Datum2[] = sccatterData
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
      {isApplied === false ? (
        <></>
      ) : (
        <Wrapper>
          <TitleBox>
            <Icon src="designImage/mobile/myboard/Chart.svg" alt="Icon" />
            <TitleText>이중전공 지원자 학과 분포</TitleText>
          </TitleBox>

          <BodyBox>
            <ScatterBox>
              <VictoryChart
                theme={VictoryTheme.material}
                domain={{ x: [minXValue, 4.5], y: [0, maxYValue] }}
                origin={{ x: 0, y: 0 }}
                containerComponent={
                  <VictoryVoronoiContainer
                    labels={({ datum }) => `${datum.college}`}
                    labelComponent={
                      <VictoryTooltip
                        flyoutComponent={<CustomTooltipLabel />}
                        flyoutStyle={{ stroke: 'none', fill: 'white' }}
                        style={{ fontSize: 0 }}
                      />
                    }
                  />
                }
              >
                <VictoryAxis
                  label="지원자 평균 학점"
                  axisComponent={<CustomAxis />}
                  tickValues={[
                    minXValue,
                    minXValue + TicGap,
                    minXValue + TicGap + TicGap,
                    minXValue + TicGap + TicGap + TicGap,
                    4.5,
                  ]}
                  style={{
                    grid: { stroke: 'rgba(185, 185, 185, 0.80)' },
                    axisLabel: {
                      padding: 33,
                      transform: 'translate (90,0)',
                      color: 'var(--Black2, #434343)',
                      fontFamily: 'Pretendard',
                      fontSize: '1.04vw',
                    },
                  }}
                />

                <VictoryAxis
                  dependentAxis
                  // label="지원자"
                  axisComponent={<CustomAxis />}
                  style={{
                    grid: { stroke: 'rgba(185, 185, 185, 0.80)' },
                    axisLabel: {
                      padding: -12,
                      transform: 'rotate(-90deg)',
                      color: 'var(--Black2, #434343)',
                      fontFamily: 'Pretendard',
                    }, // padding: -12, transform: 'rotate(-90deg) translate(0, -150)'
                  }}
                />

                <VictoryScatter
                  data={filteredData}
                  x="avgGpa"
                  y="curApplyNum"
                  size={6}
                  // labels={({ datum }) => `${datum.college}`} // 각 점에 대한 학과 라벨
                  labelComponent={
                    <VictoryLabel
                      dy={20}
                      style={{
                        fontFamily: 'Pretendard',
                        fontSize: 10,
                        fill: 'rgba(67, 67, 67, 0.80)',
                        //  fill: (args: any) => color[tmpData.findIndex((item) => item.name === args.datum.name)], 호버 이벤트 넣기 실패.. ㅠㅠ
                      }}
                    />
                  }
                  style={{
                    data: {
                      fill: (args) => color[filteredData.findIndex((item) => item.college === args.datum.college)],
                    }, // 각 데이터 포인트에 대한 fill 색상을 설정
                  }}
                />
              </VictoryChart>
            </ScatterBox>
            <LabelBox>
              <Typography color="var(--Black2, #434343)" size="20px" bold="500" style={{ opacity: 0.8 }}>
                지원자
              </Typography>
            </LabelBox>
          </BodyBox>
        </Wrapper>
      )}
    </>
  );
};

// 인터넷에서 긁어온 축 커스텀
const CustomAxis = (props: any) => {
  return (
    <svg>
      <defs>
        <marker id="arrowhead" markerWidth="5" markerHeight="4" refX="0" refY="2" orient="auto" fill="#B9B9B9">
          <polygon points="0 0, 5 2, 0 4" />
        </marker>
      </defs>
      <line
        x1={props.x1}
        y1={props.y2}
        x2={props.x2}
        y2={props.dimension === 'x' ? props.y2 : props.y1}
        stroke="#B9B9B9"
        strokeWidth="2"
        opacity={0.8}
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

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

const Wrapper = styled.div`
  position: relative;

  width: 91.11vw;
  height: 126.94vw;
  margin-top: 16.67vw;
`;

const BodyBox = styled.div`
  position: relative;
  width: 91.11vw;
  height: 100vw;
  flex-shrink: 0;

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

const ScatterBox = styled.div`
  position: relative;
`;

const LabelBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  top: 5.83vw;
  left: 7.22vw;
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

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;

  /* mob_body_Bold */
  font-family: Pretendard;
  font-size: 5vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 21.6px */
`;

const PlotTitleText = styled.text`
  color: rgba(67, 67, 67, 0.8);
  text-align: center;

  /* Details */
  font-family: Pretendard;
  font-size: 0.625vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const ToolTipNormalText = styled.text`
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 157.143%;
`;

const ToolTipBordText = styled.text`
  color: #141414;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 157.143%;
`;

const BlurTitle = styled.div`
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

const Blurtext = styled.div`
  color: rgba(20, 20, 20, 0.8);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 500;
  line-height: 136.111%;
`;

///////////////// image /////////////////

const Icon = styled.img`
  position: relative;
  display: flex;

  width: 4.44vw;
  height: 4.44vw;
`;

export default MobileScatter;
