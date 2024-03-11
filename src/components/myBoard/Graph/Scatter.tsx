import React from 'react';
import styled from 'styled-components';

import { VictoryTheme, VictoryScatter, VictoryChart, VictoryTooltip, VictoryAxis, VictoryLabel } from 'victory';
import { majorColorMapping } from '../../../utils/Mappings';
import ToolTip05 from '../../../assets/toolTips/ToolTip05';
import Typography from '../../../assets/Typography';

// 하드코딩
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
        <ToolTip05>
          본 통계는 서비스 이용자의 수집된 정보를 기반으로 한 것으로, 실제 통계와 상이할 수 있습니다.
        </ToolTip05>
        {/*<Information src="designImage/myBoard/InformationCircle.svg" alt="information" />*/}
      </TitleBox>
      <StyleSvg xmlns="http://www.w3.org/2000/svg" width="27.8125vw" height="2" viewBox="0 0 534 2" fill="none">
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
            data={tmpData}
            x="avgGpa"
            y="value"
            size={6}
            labels={({ datum }) => `${datum.name}\n학점 ${datum.avgGpa}\n지원자 ${datum.value}명`} // 각 데이터 포인트에 대한 라벨 설정
            labelComponent={
              <VictoryTooltip
                style={{ fontFamily: 'Pretendard', fontSize: 10, textAnchor: 'start' }} // 텍스트 스타일 설정
                flyoutStyle={{
                  fill: 'rgba(255, 255, 255, 0.80)',
                  stroke: 'none',
                  strokeWidth: 0,
                  lineHeight: 22,
                }}
                flyoutPadding={({ text }) => (text.length > 1 ? { top: 10, bottom: 10, left: 8, right: 8 } : 1)}
                dy={-10}
              />
            }
            style={{
              data: { fill: (args) => color[tmpData.findIndex((item) => item.name === args.datum.name)] }, // 각 데이터 포인트에 대한 fill 색상을 설정
            }}
          />
        </VictoryChart>
      </ScatterBox>
      <LabelBox>
        <Typography color="var(--Black2, #434343)" bold="500" style={{ opacity: 0.8 }}>
          지원자
        </Typography>
      </LabelBox>
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

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22536%22%20height%3D%22828%22%20viewBox%3D%220%200%20536%20828%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url%28%23filter0_b_318_1195%29%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M526.019%204.09991e-05C531.531%204.14371e-05%20536%204.47719%20536%2010V818C536%20823.523%20531.531%20828%20526.019%20828L9.98138%20828C4.46884%20828%20-1.32818e-07%20823.523%200%20818L1.94316e-05%209.99998C1.95644e-05%204.47713%204.46886%20-4.37971e-07%209.9814%200L526.019%204.09991e-05Z%22%20fill%3D%22url%28%23paint0_radial_318_1195%29%22%20fill-opacity%3D%220.9%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M526.019%200.500041C531.254%200.500041%20535.5%204.75246%20535.5%2010V818C535.5%20823.248%20531.254%20827.5%20526.019%20827.5L9.98138%20827.5C4.74586%20827.5%200.5%20823.247%200.5%20818L0.500019%209.99998C0.50002%204.7524%204.74587%200.5%209.9814%200.5L526.019%200.500041Z%22%20stroke%3D%22%23DFDFDF%22/%3E%0A%20%20%3C/g%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_318_1195%22%20x%3D%22-24%22%20y%3D%22-24%22%20width%3D%22584%22%20height%3D%22876%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22/%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2212%22/%3E%0A%20%20%20%20%20%20%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_318_1195%22/%3E%0A%20%20%20%20%20%20%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_318_1195%22%20result%3D%22shape%22/%3E%0A%20%20%20%20%3C/filter%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22paint0_radial_318_1195%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%28-4.21937e-05%2010.1505%29%20rotate%2856.7601%29%20scale%28977.841%201383.89%29%22%3E%0A%20%20%20%20%20%20%3Cstop%20stop-color%3D%22white%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%3C/defs%3E%0A%3C/svg%3E');
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
    filter: blur(8px);
  }
`;

const TitleBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.08vw;
  top: 1.28vw;
  gap: 0.47vw;

  z-index: 2;
`;

const ScatterBox = styled.div`
  position: relative;
`;

const LabelBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;

  top: 8.17vw;
  left: 2.5vw;
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
