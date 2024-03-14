import React, { useState } from 'react';
import styled from 'styled-components';

import MyStageChart from '../../assets/tabMenu/TabMenu05';
import ToolTip05 from '../../assets/toolTips/ToolTip05';

const QuartileIndicator = ({ onViewMajor, myStageData }: { onViewMajor: any; myStageData: any }) => {
  return (
    <Wrapper>
      <TitleBox>
        <TitleText>내 학점 위치 파악하기</TitleText>
        <ToolTip05>
          본 통계는 서비스 이용자의 수집된 정보를 기반으로 한 것으로, 실제 통계와 상이할 수 있습니다.
        </ToolTip05>
        {/*<Information src="designImage/myBoard/InformationCircle.svg" alt="information" />*/}
      </TitleBox>
      <StyleSvg xmlns="http://www.w3.org/2000/svg" width="57.08vw" height="2" viewBox="0 0 1096 2" fill="none">
        <path d="M0 1L1096 1" stroke="#DFDFDF" />
      </StyleSvg>
      <ChartBox>
        <MyStageChart {...myStageData[onViewMajor - 1]} />
      </ChartBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;

  width: 57.08vw;
  height: 12.4vw;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #dfdfdf;
  // background: radial-gradient(230.3% 140.56% at 1.23% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(12px);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url('data:image/svg+xml,%0A%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%221096%22%20height%3D%22252%22%20viewBox%3D%220%200%201096%20252%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url%28%23filter0_b_337_2311%29%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0.116699%2010C0.116699%204.47716%204.59385%200%2010.1167%200L1085.88%200C1091.41%200%201095.88%204.47715%201095.88%2010L1095.88%20242C1095.88%20247.523%201091.41%20252%201085.88%20252L10.1167%20252C4.59387%20252%200.116687%20247.523%200.116687%20242L0.116699%2010Z%22%20fill%3D%22url%28%23paint0_radial_337_2311%29%22%20fill-opacity%3D%220.9%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0.616699%2010C0.616699%204.7533%204.86999%200.5%2010.1167%200.5L1085.88%200.5C1091.13%200.5%201095.38%204.7533%201095.38%2010L1095.38%20242C1095.38%20247.247%201091.13%20251.5%201085.88%20251.5L10.1167%20251.5C4.87001%20251.5%200.616687%20247.247%200.616687%20242L0.616699%2010Z%22%20stroke%3D%22%23DFDFDF%22/%3E%0A%20%20%3C/g%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_337_2311%22%20x%3D%22-23.8833%22%20y%3D%22-24%22%20width%3D%221143.77%22%20height%3D%22300%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22/%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%2212%22/%3E%0A%20%20%20%20%20%20%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_337_2311%22/%3E%0A%20%20%20%20%20%20%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_337_2311%22%20result%3D%22shape%22/%3E%0A%20%20%20%20%3C/filter%3E%0A%20%20%20%20%3CradialGradient%20id%3D%22paint0_radial_337_2311%22%20cx%3D%220%22%20cy%3D%220%22%20r%3D%221%22%20gradientUnits%3D%22userSpaceOnUse%22%20gradientTransform%3D%22translate%280.116613%203.08929%29%20rotate%2812.7979%29%20scale%281123.68%20749.288%29%22%3E%0A%20%20%20%20%20%20%3Cstop%20stop-color%3D%22white%22/%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%221%22%20stop-color%3D%22white%22%20stop-opacity%3D%220%22/%3E%0A%20%20%20%20%3C/radialGradient%3E%0A%20%20%3C/defs%3E%0A%3C/svg%3E%0A');
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
`;

const ChartBox = styled.div`
  position: absolute;
  display: flex;
  top: 5.46vw;
  left: 2.08vw;
`;

///////////////// text /////////////////

const TitleText = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 1.042vw;
  font-style: normal;
  font-weight: 700;
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

export default QuartileIndicator;
