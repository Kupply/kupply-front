import styled, { keyframes } from 'styled-components';

import Typography from '../../../assets/Typography';

function Content2() {
  return (
    <MainWrapper>
      <Typography size="3.33vw" bold="700" color="#D85888" style={{ lineHeight: '120%' }}>
        합격자료
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
        지난 학기 합격자들은
        <br />
        어떤 스펙을 가지고 있었을까?
      </Typography>
      <Typography size="3.06vw" bold="500" color="rgba(20,20,20,0.6)" style={{ lineHeight: '120%', opacity: '0.8' }}>
        내 학점으로 원하는 학과를 지원하는 것이 안정적인지,
        <br />
        객관적인 통계자료를 통해 정확하게 예측하세요.
      </Typography>
      <ImageWrapper>
        <Image1 src="../../../../designImage/mobile/onboarding/graph.png" />
        <Image2 src="../../../../designImage/onboarding/Preview_02_03.svg" />
        <Image3 src="../../designImage/onboarding/Preview_02_02.svg" />
      </ImageWrapper>
    </MainWrapper>
  );
}

const Animation = keyframes`
  0%, 40%, 100% {opacity: 0;}
  50%, 90% {opacity: 1;}
`;

const MainWrapper = styled.div`
  width: 90.56vw;
  height: 96.39vw;
  padding: 40.83vw 0 0 9.44vw;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  width: 86.67vw;
  height: 66.11vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(242, 242, 242, 0.6);
  border-radius: 4vw;
  box-shadow: 0 7.33vw 5.87vw 0 rgba(169, 154, 157, 0.18), 0 3.06vw 2.45vw 0 rgba(169, 154, 157, 0.15),
    0 1.64vw 1.31vw 0 rgba(169, 154, 157, 0.12), 0 0.92vw 0.74vw 0 rgba(227, 211, 214, 0.1),
    0 0.49vw 0.39vw 0 rgba(227, 211, 214, 0.08), 0 0.2vw 0.16vw 0 rgba(227, 211, 214, 0.06);
  position: absolute;
  bottom: 0;
  left: 6.67vw;
`;

const Image1 = styled.img`
  width: 81.23vw;
  height: 63.77vw;
  border-radius: 5vw;
`;

const Image2 = styled.img`
  width: 5vw;
  height: 5vw;
  z-index: 10;
  position: absolute;
  left: 51.7%;
  top: 41.7%;
  opacity: 0;
  animation: ${Animation} 6s infinite;
`;

const Image3 = styled.img`
  width: 20vw;
  height: 11.68vw;
  z-index: 10;
  position: absolute;
  left: 42.98%;
  top: 28.98%;
  opacity: 0;
  animation: ${Animation} 6s infinite;
`;

export default Content2;