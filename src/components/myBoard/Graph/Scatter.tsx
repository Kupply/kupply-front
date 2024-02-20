import React from 'react';
import styled from 'styled-components';

import { VictoryTheme, VictoryScatter, VictoryChart, VictoryTooltip, VictoryAxis, VictoryLabel } from 'victory';
import { majorColorMapping } from '../../../utils/Mappings';

// 하드코딩
// translate(0, -150) 적용 x
// 호버 tooltip 커스텀해야 됨 + 폰트 스타일 적용 X
// plot 아래 학과 나타내기 X

const Scatter = () => {
  const maxValue = Math.max(...tmpData.map((item) => item.value));
  const maxYValue = Math.ceil(maxValue / 10) * 10 + 10;

  const color = tmpData.map((item) => majorColorMapping[item.name as keyof typeof majorColorMapping].fill);

  return (
    <Wrapper>
      <TitleBox>
        <TitleText>이중전공 지원자 학과 분포</TitleText>
        <Information src="designImage/myBoard/InformationCircle.svg" alt="information" />
      </TitleBox>
      <StyleSvg xmlns="http://www.w3.org/2000/svg" width="27.81vw" height="0.1vw" viewBox="0 0 534 2" fill="none">
        <path d="M-0.00195312 1H534.002" stroke="#DFDFDF" />
      </StyleSvg>

      <ScatterBox>
        <VictoryChart theme={VictoryTheme.material} domain={{ x: [0, 4.5], y: [0, maxYValue] }} origin={{ x: 0, y: 0 }}>
          <VictoryAxis
            label="지원자 평균 학점"
            axisComponent={<CustomAxis />}
            tickValues={[0.5, 1.5, 2.5, 3.5, 4.5]}
            style={{
              grid: { stroke: 'rgba(185, 185, 185, 0.80)' },
              axisLabel: { padding: 33, transform: 'translate (90,0)' },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="지원자"
            axisComponent={<CustomAxis />}
            style={{
              grid: { stroke: 'rgba(185, 185, 185, 0.80)' },
              axisLabel: { padding: -12, transform: 'rotate(-90deg) ' }, // padding: -12, transform: 'rotate(-90deg) translate(0, -150)'
            }}
          />

          <VictoryScatter
            data={tmpData}
            x="avgGpa"
            y="value"
            size={6}
            labels={({ datum }) => `${datum.name}\n 학점: ${datum.avgGpa}\n지원자: ${datum.value}명`} // 각 데이터 포인트에 대한 라벨 설정
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{
                  fontFamily: 'Pretendard',
                  background: 'background: rgba(255, 255, 255, 0.80)',
                  padding: '0.49vw 0.42vw',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '10px',
                  alignSelf: 'stretch',
                  lineHeight: '22px',
                  maxWidth: '200px',
                  height: '4.92vw',
                  border: 'none',
                }}
                flyoutPadding={10}
                dy={-10}
              />
            } // 폰트 스타일 적용 X
            style={{
              data: { fill: (args) => color[tmpData.findIndex((item) => item.name === args.datum.name)] }, // 각 데이터 포인트에 대한 fill 색상을 설정
            }}
          />
        </VictoryChart>
      </ScatterBox>
    </Wrapper>
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

const tmpData = [
  {
    name: '경영대학',
    value: 5,
    avgGpa: 4.4,
  },
  {
    name: '정경대학',
    value: 10,
    avgGpa: 3.5,
  },
  {
    name: '의과대학',
    value: 30,
    avgGpa: 3.0,
  },
  {
    name: '정보대학',
    value: 14,
    avgGpa: 4.2,
  },
  {
    name: '미디어학부',
    value: 24,
    avgGpa: 4.0,
  },
  {
    name: '스마트보안학부',
    value: 45,
    avgGpa: 3.8,
  },
];

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 27.92vw;
  height: 40.75vw;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  fill: var(--, radial-gradient(230.3% 140.56% at 0% 1.23%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%));
  stroke-width: 1px;
  stroke: #dfdfdf;
  backdrop-filter: blur(12px);
`;

const TitleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.08vw;
  top: 1.28vw;
  gap: 0.47vw;
`;

const ScatterBox = styled.div`
  position: relative;
`;

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
`;

const PlotText = styled.div`
  color: rgba(67, 67, 67, 0.8);
  text-align: center;

  /* Details */
  font-family: Pretendard;
  font-size: 0.625vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

///////////////// image /////////////////

const Information = styled.img`
  display: flex;
  width: 1.042vw;
  height: 0.98vw;

  flex-shrink: 0;
`;

const StyleSvg = styled.svg`
  position: absolute;
  top: 3.54vw;
`;

export default Scatter;
