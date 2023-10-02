import React , { Fragment } from "react";
import { PieChart, Pie } from "recharts";
import styled from "styled-components";
import Typography from "./Typography";

const ChartContainer = styled.div`
  width: 298px;
  height: 298px;
  position: relative;
  margin-top: 67px;
  margin-left: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column; 
  //border: 1px solid gray;
`;

const LabelBox = styled.div`
  position: absolute;
  left: 357px;
  top: -23px;
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

const data = [
  { name: "정경대학", value: 50, fill: "#E94D5E", boxShadow: "0px 16px 18px 0px rgba(233, 77, 94, 0.25)" },
  { name: "기타", value: 2, fill: "#EEE", boxShadow: "0px 18px 16px 0px rgba(238, 238, 238, 0.25)" },
  { name: "컴퓨터학과", value: 10, fill: "#FFD35F", boxShadow: "0px 16px 18px 0px rgba(255, 211, 95, 0.25)" },
  { name: "심리학부", value: 14, fill: "#7BBEEE", boxShadow: "0px 16px 18px 0px rgba(123, 190, 238, 0.25)" },
  { name: "미디어학부", value: 24, fill: "#EEA6BC" , boxShadow: "0px 16px 18px 0px rgba(238, 166, 188, 0.25)" },
].sort((a,b) => b.value - a.value);

const total = data.reduce((sum, item) => sum + item.value, 0);

const PieChartComponent = () => {
  return (
    <ChartContainer>
      <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx={169}
          cy={169}
          outerRadius={149}
          innerRadius={134.1}
          cornerRadius={99}
          startAngle={0}
          endAngle={360}
          dataKey="value"
          fill="#8884d8"
        />
      </PieChart>
      <ChartTitleBox>
      <Typography size="normalText" style={{ color: "var(--Main-Black, #141414)", fontWeight: "700", }}>
          지원자 별 단과대 분포
        </Typography>
      </ChartTitleBox>
      <svg xmlns="http://www.w3.org/2000/svg" width="616" height="616" viewBox="0 0 616 616" fill="none"
        style={{ position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <g filter="url(#filter0_d_3559_10276)">
          <circle cx="308" cy="304" r="108" fill="white" fill-opacity="0.2" shape-rendering="crispEdges"/>
        </g>
        <defs>
          <filter id="filter0_d_3559_10276" x="0" y="0" width="616" height="616" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="100"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0 0.0784314 0 0 0 0.05 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3559_10276"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3559_10276" result="shape"/>
          </filter>
        </defs>
      </svg>
     
      <LabelBox>
        <div>
          {data.map((item, index) => (
            <Fragment key={item.name}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  <LabelColor color={item.fill} style={{ marginRight: "15px" }} />
                  <Typography style={{ color: "var(--Main-Black, #141414)", fontWeight: "700" }}>
                    {item.name}
                  </Typography>
                </div>
                <Typography style={{ color: "var(--Main-Black, #141414)", fontWeight: "700" }}>
                  {((item.value / total) * 100).toFixed(0)}%
                </Typography>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "3px" }}>
                <Typography style={{ color: "#A8A8A8", fontWeight: "400", }}>
                  {item.value}명
                </Typography>
              </div>
              {index < data.length - 1 && 
                <svg xmlns="http://www.w3.org/2000/svg" width="250" height="2" viewBox="0 0 250 2" fill="none"
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <path d="M1 1H249" stroke="#DFDFDF" stroke-linecap="round"/>
                </svg>
              } 
            </Fragment>
            ))}
        </div>
      </LabelBox>
    </ChartContainer>  
  );
};
  
  export default PieChartComponent;