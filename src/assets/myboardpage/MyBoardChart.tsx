import React, { useState, useEffect, Fragment } from 'react';
import { Cell, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, DotProps } from 'recharts';
import styled from 'styled-components';
import Typography from '../OldTypography';
import { TableUnique } from 'typeorm';

//////////////////////////////////////////////////////////////////////

/* 
데이터 처리 과정

해당 학과별 value(지원자 수) 정렬 => 상위 4개 학과 추출 /
나머지 학과 value 합 = 기타 데이터 만들기
상위 4개 학과 + 기타 데이터 = 새로운 데이터 만들기 
(정렬된 데이터에 새롭게 데이터를 넣어야 파이차트 순서가 원하는대로 기타가 마지막에 위치하게 됩니다다)
총 5개 학과만 파이차트에 지원자 수 비율대로 분포 보여줌 (탑 4 + 기타)

가상 데이터는 가장 아래 있습니다. 
지원자 수, 평균 데이터 값만 넣어주면 밑에 가상 데이터와 같은 데이터 셋 

*/

/**********PieChart**********/
/* 쉐도우 넣는거 포기... 시험끝나고 라이브러리를 바꾸던지 일단 나중에 해보겠습니다 */

type MajorData = {
  college: string;
  curAccumGPA: number;
  curApplyNum: number;
};

type StudentYearData = {
  stdIdYear: string;
  curApplyNum: number;
};

interface MajorDataProps extends React.ComponentPropsWithoutRef<'div'> {
  MajorDatas: MajorData[];
}

interface StudentYearDataProps extends React.ComponentPropsWithoutRef<'div'> {
  StudentYearDatas: StudentYearData[];
}

const PieChartComponent = (prop: MajorDataProps) => {
  const { MajorDatas } = prop;

  const { totalMajor, TopFiveData } = getMajorData(MajorDatas);

  return (
    <PieChartContainer>
      <PieChart width={350} height={350}>
        <Pie
          data={TopFiveData}
          cx={169}
          cy={169}
          outerRadius={149}
          innerRadius={134.1}
          cornerRadius={99}
          startAngle={180}
          endAngle={-180}
          dataKey="value"
          paddingAngle={1.5}
        />
      </PieChart>
      <ChartTitleBox>
        <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', fontWeight: '700' }}>
          지원자 별 단과대 분포
        </Typography>
      </ChartTitleBox>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="616"
        height="616"
        viewBox="0 0 616 616"
        fill="none"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <g filter="url(#filter0_d_3559_10276)">
          <circle cx="308" cy="304" r="108" fill="white" fill-opacity="0.2" shape-rendering="crispEdges" />
        </g>
        <defs>
          <filter
            id="filter0_d_3559_10276"
            x="0"
            y="0"
            width="616"
            height="616"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="100" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0.05 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3559_10276" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3559_10276" result="shape" />
          </filter>
        </defs>
      </svg>
      <LabelBox>
        <div>
          {TopFiveData.map((item, index) =>
            index < 5 ? (
              <Fragment key={item.name}>
                <div
                  style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <LabelColor color={item.fill} style={{ marginRight: '15px' }} />
                    <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', fontWeight: '700' }}>
                      {item.name}
                    </Typography>
                  </div>
                  <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', fontWeight: '700' }}>
                    {((item.value / totalMajor) * 100).toFixed(0)}%
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '3px' }}>
                  <Typography size="normalText" style={{ color: '#A8A8A8', fontWeight: '400', marginTop: '6px' }}>
                    {item.value}명
                  </Typography>
                </div>
                {index < 5 - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="250"
                    height="2"
                    viewBox="0 0 250 2"
                    fill="none"
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  >
                    <path d="M1 1H249" stroke="#DFDFDF" stroke-linecap="round" />
                  </svg>
                )}
              </Fragment>
            ) : null,
          )}
        </div>
      </LabelBox>
    </PieChartContainer>
  );
};

const HalfPieChartComponent = (props: StudentYearDataProps) => {
  const { StudentYearDatas } = props;
  const { curGradeDatas, totalGrade } = getGradeData(StudentYearDatas);
  return (
    <HalfPieChartContainer>
      <PieChart width={350} height={350}>
        <Pie
          data={curGradeDatas}
          cx={169}
          cy={169}
          outerRadius={149}
          innerRadius={134.1}
          cornerRadius={99}
          startAngle={180}
          endAngle={0}
          dataKey="value"
          paddingAngle={1.5}
        />
      </PieChart>
      <ChartTitleBox>
        <Typography
          size="normalText"
          style={{ color: 'var(--Main-Black, #141414)', fontWeight: '700', marginTop: '-39px' }}
        >
          지원자 별 학번 분포
        </Typography>
      </ChartTitleBox>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="616"
        height="508"
        viewBox="0 0 616 508"
        fill="none"
        style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <g filter="url(#filter0_d_3646_36677)">
          <path
            d="M416 304C416 289.817 413.206 275.773 407.779 262.67C402.351 249.567 394.396 237.661 384.368 227.632C374.339 217.604 362.433 209.649 349.33 204.221C336.227 198.794 322.183 196 308 196C293.817 196 279.773 198.794 266.67 204.221C253.567 209.649 241.661 217.604 231.632 227.632C221.604 237.661 213.649 249.567 208.221 262.67C202.794 275.773 200 289.817 200 304L308 304H416Z"
            fill="white"
            fill-opacity="0.2"
            shape-rendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_3646_36677"
            x="0"
            y="0"
            width="616"
            height="508"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="100" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0.05 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3646_36677" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3646_36677" result="shape" />
          </filter>
        </defs>
      </svg>
      <HalfLabelBox>
        <div>
          {curGradeDatas.map((item, index) =>
            index < 4 ? (
              <Fragment key={item.name}>
                <div
                  style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <LabelColor color={item.fill} style={{ marginRight: '15px' }} />
                    <Typography size="normalText" style={{ color: 'var(--Main-Black, #141414)', fontWeight: '700' }}>
                      {item.name}
                    </Typography>
                  </div>
                  <Typography
                    size="normalText"
                    style={{ color: 'var(--Main-Black, #141414)', fontWeight: '700', lineHeight: '125%' }}
                  >
                    {((item.value / totalGrade) * 100).toFixed(0)}%
                  </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '3px' }}>
                  <Typography size="normalText" style={{ color: '#A8A8A8', fontWeight: '400' }}>
                    {item.value}명
                  </Typography>
                </div>
                {index < 4 - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="250"
                    height="2"
                    viewBox="0 0 250 2"
                    fill="none"
                    style={{ marginTop: '12px', marginBottom: '12px' }}
                  >
                    <path d="M1 1H249" stroke="#DFDFDF" stroke-linecap="round" />
                  </svg>
                )}
              </Fragment>
            ) : null,
          )}
        </div>
      </HalfLabelBox>
    </HalfPieChartContainer>
  );
};

/**********PlotChart**********/
const TooltipStyle = styled.div`
  width: 120px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 8px;
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
`;

interface HoverData {
  name: string;
  value: number;
  avgGpa: number;
}

interface DotData {
  cx: number;
  cy: number;
  name: string;
  color: string;
}

interface CustomDatatipProps {
  payload?: HoverData[] | undefined;
  activeData?: (typeof tmpDataMajor)[0] | null;
  dotProps?: DotProps | null;
}

// 호버 내용
const CustomTooltip: React.FC<CustomDatatipProps> = ({ activeData }) => {
  if (activeData) {
    const { name, value, avgGpa } = activeData;
    return (
      <TooltipStyle>
        <Typography
          size="smallText"
          style={{ color: 'var(--Main-Black, #141414)', fontWeight: '700', lineHeight: '157.143%' }}
        >
          {name}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography size="smallText" style={{ color: 'var(--Main-Black, #A8A8A8)', lineHeight: '22px' }}>
            학점 평균
          </Typography>
          <Typography
            size="smallText"
            style={{
              color: 'var(--Main-Black, #141414)',
              fontWeight: '700',
              lineHeight: '157.143%',
              marginLeft: '5px',
            }}
          >
            {avgGpa}
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography size="smallText" style={{ color: 'var(--Main-Black, #A8A8A8)', lineHeight: '22px' }}>
            지원자
          </Typography>
          <Typography
            size="smallText"
            style={{
              color: 'var(--Main-Black, #141414)',
              fontWeight: '700',
              lineHeight: '157.143%',
              marginLeft: '5px',
            }}
          >
            {value}
          </Typography>
        </div>
      </TooltipStyle>
    );
  }
  return null;
};

// 산점도 큰 점으로 늘리기
const CustomDot: React.FC<{ dotProps: DotData }> = ({ dotProps }) => {
  const { cx, cy, name, color } = dotProps;
  return (
    <>
      <circle cx={cx} cy={cy} r={9} fill={color} stroke={color} strokeWidth={1} />
      <Typography size="smallText" style={{ color: color, textAlign: 'center' }}>
        {name}
      </Typography>
    </>
  );
};

const PlotChartComponent = (props: MajorDataProps) => {
  const { MajorDatas } = props;

  const { curMajorDatas, totalMajor, TopFiveData } = getMajorData(MajorDatas);

  const filteredMajorDatas = curMajorDatas.filter((d) => d.value !== 0);

  const maxValue = Math.max(...curMajorDatas.map((item) => item.value));
  const maxLength = maxValue <= 10 ? 10 : maxValue / 10 + 1;
  const [hoveredData, setHoveredData] = useState<(typeof curMajorDatas)[0] | null>(null);

  return (
    <PlotChartContainer>
      <ScatterChart width={470} height={540}>
        <CartesianGrid horizontal={true} vertical={true} strokeDasharray="6 6" />
        <XAxis
          type="number"
          dataKey="x"
          name="지원자 평균 학점"
          unit=""
          domain={[2.5, 5.0]}
          ticks={[2.5, 3.0, 3.5, 4.0, 4.5]}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="지원자"
          unit=""
          domain={[0, maxLength]}
          ticks={Array.from({ length: maxLength + 1 }, (_, i) => i * 1)} // 임시로 바꿈 (일반화 적용 X)
        />
        <Tooltip content={<CustomTooltip activeData={hoveredData} />} />
        {filteredMajorDatas.map((data, index) => (
          <Scatter
            data={[{ x: data.avgGpa, y: data.value }]}
            fill={data.fill}
            key={index}
            shape={(props) => (
              <CustomDot dotProps={{ cx: props.cx, cy: props.cy, name: data.name, color: data.fill }} />
            )}
            onMouseOver={() => setHoveredData(data)}
            onMouseOut={() => setHoveredData(null)}
          />
        ))}
      </ScatterChart>
      <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: '56px', marginTop: '40px' }}>
        <Typography
          size="bodyText"
          style={{ color: 'var(--Black2, rgba(67, 67, 67, 0.80))', fontWeight: '400', lineHeight: '120%' }}
        >
          x축
        </Typography>
        <Typography
          size="bodyText"
          style={{ color: 'var(--Black2, #434343)', opacity: 0.8, fontWeight: '500', lineHeight: '24px' }}
        >
          {`\u00A0`} 지원자 학점 평균
        </Typography>
        <Typography
          size="bodyText"
          style={{
            color: 'var(--Black2, rgba(67, 67, 67, 0.80))',
            fontWeight: '400',
            lineHeight: '120%',
            marginLeft: '30px',
          }}
        >
          y축
        </Typography>
        <Typography
          size="bodyText"
          style={{ color: 'var(--Black2, #434343)', opacity: 0.8, fontWeight: '500', lineHeight: '24px' }}
        >
          {`\u00A0`} 지원자
        </Typography>
      </div>
    </PlotChartContainer>
  );
};

export { PieChartComponent, HalfPieChartComponent, PlotChartComponent };

const PieChartContainer = styled.div`
  width: 298px;
  height: 298px;
  position: relative;
  margin-top: 73px;
  margin-left: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 298px;
  //background: #E9808C;
  //box-shadow: 0px 16px 18px 0px rgba(233, 128, 140, 0.25);
  //border: 1px solid gray;
`;

const HalfPieChartContainer = styled.div`
  width: 298px;
  height: 298px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 298px;

  margin-top: 44px;
  margin-left: 30px;
  //box-shadow: 0px 16px 18px 0px rgba(216, 88, 136, 0.24);
`;

const PlotChartContainer = styled.div`
  margin-top: 73px;
`;

const LabelBox = styled.div`
  position: absolute;
  left: 357px;
  top: -26px;
  //border: 1px solid gray
`;

const HalfLabelBox = styled.div`
  position: absolute;
  left: 357px;
  top: -9px;
  //border: 1px solid gray
`;

const LabelColor = styled.span<{ color: string }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-right: 15px;
`;

const ChartTitleBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

// 임시 데이터
const tmpDataMajor = [
  {
    name: '경영대학',
    value: 2,
    avgGpa: 4.4,
    fill: '#787071',
    boxShadow: ' 0px 16px 18px 0px rgba(120, 112, 113, 0.25)',
  },
  {
    name: '정경대학',
    value: 30,
    avgGpa: 3.5,
    fill: '#CC668C',
    boxShadow: '0px 16px 18px 0px rgba(204, 102, 140, 0.25)',
  },
  {
    name: '의과대학',
    value: 10,
    avgGpa: 3.0,
    fill: '#99D88E',
    boxShadow: '0px 16px 18px 0px rgba(147, 216, 136, 0.25)',
  },
  {
    name: '정보대학',
    value: 14,
    avgGpa: 4.2,
    fill: '#FFD35F',
    boxShadow: '0px 16px 18px 0px rgba(255, 211, 95, 0.25)',
  },
  {
    name: '미디어학부',
    value: 24,
    avgGpa: 4.0,
    fill: '#EEA6BC',
    boxShadow: '0px 16px 18px 0px rgba(238, 166, 188, 0.25)',
  },
  {
    name: '스마트보안학부',
    value: 2,
    avgGpa: 3.8,
    fill: '#F1A351',
    boxShadow: '0px 16px 18px 0px rgba(241, 163, 81, 0.25)',
  },
  {
    name: '문과대학',
    value: 20,
    avgGpa: 4.32,
    fill: '#DFDFDF',
    boxShadow: '0px 18px 16px 0px rgba(223, 223, 223, 0.25)',
  },
  {
    name: '이과대학',
    value: 11,
    avgGpa: 3.78,
    fill: '#7287AB',
    boxShadow: '0px 16px 18px 0px rgba(114, 135, 171, 0.25)',
  },
  {
    name: '사범대학',
    value: 3,
    avgGpa: 4.0,
    fill: '#4C8ECC',
    boxShadow: '0px 16px 18px 0px rgba(233, 77, 94, 0.25)',
  },
  {
    name: '디자인조형학부',
    value: 6,
    avgGpa: 4.0,
    fill: '#A667AE',
    boxShadow: '0px 16px 18px 0px rgba(166, 103, 174, 0.25)',
  },
  {
    name: '보건과학대학',
    value: 8,
    avgGpa: 4.09,
    fill: '#E9808C',
    boxShadow: '0px 16px 18px 0px rgba(233, 128, 140, 0.25)',
  },
  {
    name: '심리학부',
    value: 10,
    avgGpa: 3.54,
    fill: '#89D7E1',
    boxShadow: '0px 16px 18px 0px rgba(137, 215, 225, 0.25)',
  },
  {
    name: '생명과학대학',
    value: 13,
    avgGpa: 3.82,
    fill: '#78BE94',
    boxShadow: '0px 16px 18px 0px rgba(120, 190, 148, 0.25)',
  },
  {
    name: '공과대학',
    value: 4,
    avgGpa: 3.88,
    fill: '#FF8461',
    boxShadow: '0px 16px 18px 0px rgba(255, 132, 97, 0.25)',
  },
  {
    name: '간호대학',
    value: 4,
    avgGpa: 3.67,
    fill: '#F5BDBD',
    boxShadow: '0px 16px 18px 0px rgba(245, 189, 189, 0.25)',
  },
  {
    name: '국제대학',
    value: 6,
    avgGpa: 3.9,
    fill: '#58A2C6',
    boxShadow: '0px 16px 18px 0px rgba(88, 162, 198, 0.25)',
  },
  {
    name: '자유전공학부',
    value: 14,
    avgGpa: 3.7,
    fill: '#7BBEEE',
    boxShadow: '0px 16px 18px 0px rgba(123, 190, 238, 0.25)',
  },
  {
    name: '스마트모빌리티학부',
    value: 8,
    avgGpa: 4.12,
    fill: '#3F87F3',
    boxShadow: '0px 16px 18px 0px rgba(63, 135, 243, 0.25)',
  },
].sort((a, b) => b.value - a.value);

// 임시 데이터
const tmpDataGrade = [
  { name: '23학번', value: 0, fill: '#D85888' },
  { name: '22학번', value: 0, fill: '#E57C90' },
  { name: '21학번', value: 0, fill: '#FFAFBD' },
  { name: '20학번 이상', value: 0, fill: 'var(--SECONDARY, #FDF2F2)' },
].sort((a, b) => b.value - a.value);

const getMajorData = (MajorDatas: MajorData[]) => {
  const curMajorDatas = tmpDataMajor;

  for (const majorData of MajorDatas) {
    for (const curMajorData of curMajorDatas) {
      if (curMajorData.name === majorData.college) {
        curMajorData.value = majorData.curApplyNum;
        if (majorData.curApplyNum > 0) {
          curMajorData.avgGpa = +(majorData.curAccumGPA / majorData.curApplyNum).toFixed(2);
        } else {
          curMajorData.avgGpa = 0;
        }
        break;
      }
    }
  }

  curMajorDatas.sort((a, b) => b.value - a.value);

  const totalMajor = curMajorDatas.reduce((sum, item) => sum + item.value, 0);

  const TopFourData = curMajorDatas.slice(0, 4); // top 4
  const LastValue = curMajorDatas.slice(4).reduce((acc, data) => acc + data.value, 0);
  const OtherData = {
    name: '기타',
    value: LastValue,
    fill: '#A8A8A8',
    avgGpa: 0,
    boxShadow: '0px 18px 16px 0px rgba(223, 223, 223, 0.25)',
  };
  const TopFiveData = TopFourData.concat(OtherData);

  return { curMajorDatas, totalMajor, TopFiveData };
};

const getGradeData = (GradeDatas: StudentYearData[]) => {
  const curGradeDatas = tmpDataGrade;

  for (const gradeData of GradeDatas) {
    for (const curGradeData of curGradeDatas) {
      if (gradeData.stdIdYear === curGradeData.name.substring(0, 2)) {
        curGradeData.value = gradeData.curApplyNum;
        break;
      }
    }
  }

  curGradeDatas.sort((a, b) => b.value - a.value);

  const totalGrade = curGradeDatas.reduce((sum, item) => sum + item.value, 0);

  return { curGradeDatas, totalGrade };
};
