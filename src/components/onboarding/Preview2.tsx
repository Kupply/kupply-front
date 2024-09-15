import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import Typography from '../../assets/Typography';

interface ImageProps {
  initialMargin: string;
}

function Preview2() {
  const [imageMargin, setImageMargin] = useState('10.31vw 0 0 41.67vw'); // State to control image margin
  const [transitionState, setTransitionState] = useState('textBox1Visible');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTransitionState('textBox1Visible');
            setTimeout(() => {
              setImageMargin('20.21vw 0 0 23.33vw');
              setTransitionState('transitioning');
            }, 2000);
            setTimeout(() => {
              setTransitionState('allVisible');
            }, 5000);
          } else {
            setImageMargin('10.31vw 0 0 41.67vw');
            setTransitionState('textBox1Visible');
          }
        });
      },
      { threshold: 0.1 },
    );

    const imageElement = document.querySelector('#imageElement');
    if (imageElement) {
      observer.observe(imageElement);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <MainWrapper>
      <Image1
        id="imageElement"
        src="../../designImage/onboarding/Preview_02_01.svg"
        style={{ margin: imageMargin }} // Apply dynamic margin
      />
      <Image2 src="../../designImage/onboarding/Preview_02_03.svg" isVisible={transitionState === 'allVisible'} />
      <Image3 src="../../designImage/onboarding/Preview_02_02.svg" isVisible={transitionState === 'allVisible'} />
      <TextBox1 isVisible={transitionState === 'textBox1Visible'}>
        <Typography size="0.94vw" bold="700" color="#D85888">
          합격자료
        </Typography>
        <Typography size="2.5vw" bold="700" style={{ lineHeight: '145.83%', margin: '0.42vw 0 1.46vw 0' }}>
          지난 학기 합격자들은 <br /> 어떤 스펙을 <br /> 가지고 있었을까?
        </Typography>
        <Typography size="1.04vw" bold="500" color="rgba(20,20,20,0.6)" style={{ lineHeight: '120%', opacity: 0.8 }}>
          지난 학기 합격자들의 학점 분석 그래프와 <br /> 학업계획서 키워드를 참고하여 <br /> 이중전공 지원을 준비 할 수
          있어요.
        </Typography>
      </TextBox1>
      <TextBox2 isVisible={transitionState === 'transitioning' || transitionState === 'allVisible'}>
        <Typography size="0.94vw" bold="700" color="#D85888" style={{ textAlign: 'center' }}>
          합격자료
        </Typography>
        <Typography
          size="2.5vw"
          bold="700"
          style={{ lineHeight: '145.83%', margin: '0.42vw 0 0.42vw 0', textAlign: 'center' }}
        >
          지난 학기 합격자들은 <br /> 어떤 스펙을 가지고 있었을까?
        </Typography>
        <Typography
          size="1.04vw"
          bold="500"
          color="rgba(20,20,20,0.6)"
          style={{ lineHeight: '120%', opacity: 0.8, textAlign: 'center' }}
        >
          지난 학기 합격자들의 학점 분석 그래프와 학업계획서 키워드를 참고하여 <br /> 이중전공 지원을 준비 할 수 있어요.
        </Typography>
      </TextBox2>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100%;
  height: 66.61vw;
  display: flex;
  position: relative;
`;

const Image1 = styled.img`
  width: 53.28vw;
  height: 40.73vw;
  transition: margin 2s ease-in-out; // Ensure margin change is animated
`;

const Image2 = styled.img<{ isVisible: boolean }>`
  width: 2.48vw;
  height: 2.48vw;
  z-index: 10;
  position: absolute;
  left: 50.7%;
  top: 51.9%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 2s ease-in-out;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const Image3 = styled.img<{ isVisible: boolean }>`
  width: 10vw;
  height: 5.84vw;
  z-index: 10;
  position: absolute;
  left: 46.98%;
  top: 45.98%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 2s ease-in-out;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const TextBox = styled.div<{ isVisible: boolean }>`
  transition: opacity 1s ease-in-out;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextBox1 = styled(TextBox)`
  top: 37.92%;
  left: 15.89%;
`;

const TextBox2 = styled(TextBox)<{ isVisible: boolean }>`
  top: 8.44%;
  left: 0;
  width: 100%;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(20px)')};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: opacity 1s ease-in-out, transform 1s ease-in-out, visibility 1s ease-in-out;
  transition-delay: ${({ isVisible }) => (isVisible ? '0s' : '1s')}; // Delay the 'visibility' transition when hiding
`;

export default Preview2;
