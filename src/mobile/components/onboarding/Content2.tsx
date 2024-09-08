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
        지난 학기 합격자들의 학점 그래프와 학업계획서 키워드를 참고하여
        <br />
        이중전공 지원을 준비할 수 있어요.
      </Typography>
      <Image1 src="../../../../designImage/mobile/onboarding/graph.png" />
      <Image2 src="../../../../designImage/onboarding/Preview_02_03.svg" />
      <Image3 src="../../designImage/onboarding/Preview_02_02.svg" />
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

const Image1 = styled.img`
  width: 92vw;
  height: 100vw;
  border-radius: 5vw;
  margin-left: -6vw;
  margin-top: 3.61vw;
`;

const Image2 = styled.img`
  width: 5vw;
  height: 5vw;
  z-index: 10;
  position: absolute;
  left: 50.7%;
  top: 70.7%;
  opacity: 0;
  animation: ${Animation} 6s infinite;
`;

const Image3 = styled.img`
  width: 20vw;
  height: 11.68vw;
  z-index: 10;
  position: absolute;
  left: 43.18%;
  top: 64.98%;
  opacity: 0;
  animation: ${Animation} 6s infinite;
`;

export default Content2;
