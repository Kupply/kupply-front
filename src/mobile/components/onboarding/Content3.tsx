import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Typography from '../../../assets/Typography';

function Content3() {
  const images = [
    '../../../../designImage/onboarding/Preview_03_01.webp',
    '../../../../designImage/onboarding/Preview_03_02.webp',
    '../../../../designImage/onboarding/Preview_03_03.webp',
    '../../../../designImage/onboarding/Preview_03_04.webp',
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
      <Typography size="3.33vw" bold="700" color="#D85888" style={{ lineHeight: '120%' }}>
        마이보드
      </Typography>
      <Typography
        size="5vw"
        bold="700"
        style={{
          lineHeight: '133.33%',
          textShadow: '0 0.42vw 1.69vw rgba(255,255,255,0.3',
          margin: '1.67vw 0 0.83vw 0',
        }}
      >
        '내 학점으로 이 학과 붙을 수 있을까?'
        <br />
        쿠플라이에게 물어보세요
      </Typography>
      <Typography size="3.06vw" bold="500" color="rgba(20,20,20,0.6)" style={{ lineHeight: '120%', opacity: '0.8' }}>
        쿠플라이 모의지원을 통해 나와 같은 학과를
        <br />
        희망하는 지원자들 사이에서 학점 백분위를 파악할 수 있어요.
      </Typography>
      <Image src={images[currentImageIndex]} />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 90.56vw;
  height: 99.17vw;
  padding: 53.33vw 0 0 9.44vw;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Image = styled.img`
  width: 97.24vw;
  height: 24.3vw;
  position: absolute;
  top: 82.37vw;
  left: 1.34vw;
`;

export default Content3;
