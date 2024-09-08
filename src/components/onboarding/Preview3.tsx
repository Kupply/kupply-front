import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Typography from '../../assets/Typography';

function Preview3() {
  const images = [
    '../../designImage/onboarding/Preview_03_01.webp',
    '../../designImage/onboarding/Preview_03_02.webp',
    '../../designImage/onboarding/Preview_03_03.webp',
    '../../designImage/onboarding/Preview_03_04.webp',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainWrapper>
      <TextWrapper>
        <Typography size="0.94vw" bold="700" color="#D85888">
          마이보드
        </Typography>
        <Typography size="2.5vw" bold="700" style={{ lineHeight: '121.88%', margin: '0.42vw 0 1.46vw 0' }}>
          '내 학점으로 <br /> 이 학과 붙을 수 있을까?' <br /> 쿠플라이에게 물어보세요
        </Typography>
        <Typography size="1.04vw" bold="500" color="rgba(20,20,20,0.6)" style={{ lineHeight: '120%', opacity: 0.8 }}>
          쿠플라이 모의지원을 통해 <br /> 나와 같은 학과를 희망하는 지원자들 사이에서 학점 백분위를 파악할 수 있어요.
        </Typography>
      </TextWrapper>
      <Image src={images[currentImageIndex]} />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: 44.19vw;
  position: relative;
`;

const TextWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 5.13vw 0 0 61.04vw;
`;

const Image = styled.img`
  width: 47.26vw;
  height: 12.6vw;
  position: absolute;
  top: 0;
  left: 9.22%;
`;

export default Preview3;
