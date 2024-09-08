import React from 'react';
import styled from 'styled-components';

import Pie from '../../../assets/Graph/Pie';
import HalfPie from '../../../assets/Graph/HalfPie';
import ToolTip05 from '../../../assets/toolTips/ToolTip05';

const PieChart = ({ onViewMajor, curData, isApplied }: { onViewMajor: any; curData: any; isApplied: boolean }) => {
  return (
    <>
      {isApplied === false ? (
        <></>
      ) : (
        <Wrapper>
          <TitleBox>
            <TitleText>지원자 정보 살펴보기</TitleText>
            <ToolTip05>
              해당 통계는 쿠플라이 서비스를 통해 모은 정보를 바탕으로 한 것으로 실제 통계와 다를 수 있어요.
            </ToolTip05>
            {/*<Information src="designImage/myBoard/InformationCircle.svg" alt="information" />*/}
          </TitleBox>
          <StyleSvg xmlns="http://www.w3.org/2000/svg" width="27.8125vw" height="2" viewBox="0 0 534 2" fill="none">
            <path d="M-0.00195312 1H534.002" stroke="#DFDFDF" />
          </StyleSvg>
          <PieBox>
            <Pie onViewMajor={onViewMajor} curData={curData} />
          </PieBox>
          <StyleSvg2 xmlns="http://www.w3.org/2000/svg" width="27.81vw" height="0.1vw" viewBox="0 0 534 2" fill="none">
            <path d="M-0.00195312 1H534.002" stroke="#DFDFDF" />
          </StyleSvg2>
          <HalfPieBox>
            <HalfPie onViewMajor={onViewMajor} curData={curData} />
          </HalfPieBox>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 27.92vw;
  height: 40.75vw;
  flex-shrink: 0;
  border-radius: 0.52vw;
  border: 1px solid #dfdfdf;
  fill: var(--, radial-gradient(230.3% 140.56% at 0% 1.23%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%));
  stroke-width: 1px;
  stroke: #dfdfdf;
  backdrop-filter: blur(12px);

  z-index: 2;

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

const Wrapper2 = styled.div`
  width: 27.92vw;
  height: 40.75vw;
  flex-shrink: 0;
  border-radius: 0.52vw;
  border: 1px solid #dfdfdf;
  fill: var(--, radial-gradient(230.3% 140.56% at 0% 1.23%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%));
  stroke-width: 1px;
  stroke: #dfdfdf;
  backdrop-filter: blur(12px);

  z-index: 2;
`;

const BlurWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  border-radius: 10px;
  background: rgba(248, 248, 248, 0.45);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  z-index: 10;
`;

const BlurMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  gap: 24px;
  background: rgba(248, 248, 248, 0.45);
  box-shadow: 0px 0px 28px 0px rgba(20, 20, 20, 0.05);
  backdrop-filter: blur(5px);
  z-index: 20;
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

const PieBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.13vw;
  top: 6.67vw;
`;

const HalfPieBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  left: 2.13vw;
  top: 26.47vw;
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

const StyleSvg2 = styled.svg`
  position: absolute;
  top: 23.57vw;
`;

export default PieChart;
