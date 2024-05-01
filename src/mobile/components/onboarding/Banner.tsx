import styled, { keyframes } from 'styled-components';

import Typography from '../../../assets/Typography';

function Banner() {
  return (
    <MainWrapper>
      <Typography size="3.33vw" bold="700" color="rgba(255,255,255,0.5)" style={{ lineHeight: '120%' }}>
        합격자료
      </Typography>
      <Typography
        size="5vw"
        bold="700"
        color="#FFF"
        style={{
          textAlign: 'center',
          textShadow: '0 0.42vw 1.69vw rgba(255,255,255,0.33)',
          lineHeight: '120%',
          margin: '1.67vw 0 0.83vw 0',
        }}
      >
        쿠플라이가 모아주는 고려대학교 인기 <br /> 이중전공 정보모음.zip
      </Typography>
      <Typography size="3.06vw" bold="500" color="#FFF" style={{ lineHeight: '120%' }}>
        모두의 성공적인 이중전공 진입 메이트 쿠플라이와 함께해요!
      </Typography>
      <Cards>
        {Array.from({ length: 20 }, (_, index) => (
          <Card key={index} />
        ))}
      </Cards>
      <CellPhone />
      <Notch />
      <PowerButton />
      <VolumeButton style={{ top: '58.54vw' }} />
      <VolumeButton style={{ top: '62.04vw' }} />
    </MainWrapper>
  );
}

const Animation1 = keyframes`
  0%, 4%, 100% {left: 79.72vw; opacity: 1;}
  5%, 9% {left: 58.89vw; opacity: 1} 
  10%, 14% {left: 38.06vw; opacity: 1;}
  15%, 19% {left: 13.33vw; opacity:1;}
  20%, 24% {left: -12.78vw; opacity: 1;}
  25%, 50% {left: -32.78vw; opacity: 0} 
  50%, 99% {left: 100vw; opacity: 0}
`;

const Animation2 = keyframes`
  5%, 9% {left: 79.72vw; opacity: 1;}
  10%, 14% {left: 58.89vw; opacity: 1} 
  15%, 19% {left: 38.06vw; opacity: 1;}
  20%, 24% {left: 13.33vw; opacity:1;}
  25%, 29% {left: -12.78vw; opacity: 1;}
  30%, 55% {left: -32.78vw; opacity: 0} 
  55%, 100%, 0%, 4% {left: 100vw; opacity: 0}
`;

const Animation3 = keyframes`
  10%, 14% {left: 79.72vw; opacity: 1;}
  15%, 19% {left: 58.89vw; opacity: 1} 
  20%, 24% {left: 38.06vw; opacity: 1;}
  25%, 29% {left: 13.33vw; opacity:1;}
  30%, 34% {left: -12.78vw; opacity: 1;}
  35%, 60% {left: -32.78vw; opacity: 0} 
  60%, 100%, 0%, 9% {left: 100vw; opacity: 0}
`;

const Animation4 = keyframes`
  15%, 19% {left: 79.72vw; opacity: 1;}
  20%, 24% {left: 58.89vw; opacity: 1} 
  25%, 29% {left: 38.06vw; opacity: 1;}
  30%, 34% {left: 13.33vw; opacity:1;}
  35%, 39% {left: -12.78vw; opacity: 1;}
  40%, 65% {left: -32.78vw; opacity: 0} 
  65%, 100%, 0%, 14% {left: 100vw; opacity: 0}
`;

const Animation5 = keyframes`
  20%, 24% {left: 79.72vw; opacity: 1;}
  25%, 29% {left: 58.89vw; opacity: 1} 
  30%, 34% {left: 38.06vw; opacity: 1;}
  35%, 39% {left: 13.33vw; opacity:1;}
  40%, 44% {left: -12.78vw; opacity: 1;}
  45%, 70% {left: -32.78vw; opacity: 0} 
  70%, 100%, 0%, 19% {left: 100vw; opacity: 0}
`;

const Animation6 = keyframes`
  25%, 29% {left: 79.72vw; opacity: 1;}
  30%, 34% {left: 58.89vw; opacity: 1} 
  35%, 39% {left: 38.06vw; opacity: 1;}
  40%, 44% {left: 13.33vw; opacity:1;}
  45%, 49% {left: -12.78vw; opacity: 1;}
  50%, 75% {left: -32.78vw; opacity: 0} 
  75%, 100%, 0%, 24% {left: 100vw; opacity: 0}
`;

const Animation7 = keyframes`
  30%, 34% {left: 79.72vw; opacity: 1;}
  35%, 39% {left: 58.89vw; opacity: 1} 
  40%, 44% {left: 38.06vw; opacity: 1;}
  45%, 49% {left: 13.33vw; opacity:1;}
  50%, 54% {left: -12.78vw; opacity: 1;}
  55%, 80% {left: -32.78vw; opacity: 0} 
  80%, 100%, 0%, 29% {left: 100vw; opacity: 0}
`;

const Animation8 = keyframes`
  35%, 39% {left: 79.72vw; opacity: 1;}
  40%, 44% {left: 58.89vw; opacity: 1} 
  45%, 49% {left: 38.06vw; opacity: 1;}
  50%, 54% {left: 13.33vw; opacity:1;}
  55%, 59% {left: -12.78vw; opacity: 1;}
  60%, 85% {left: -32.78vw; opacity: 0} 
  85%, 100%, 0%, 34% {left: 100vw; opacity: 0}
`;

const Animation9 = keyframes`
  40%, 44% {left: 79.72vw; opacity: 1;}
  45%, 49% {left: 58.89vw; opacity: 1} 
  50%, 54% {left: 38.06vw; opacity: 1;}
  55%, 59% {left: 13.33vw; opacity:1;}
  60%, 64% {left: -12.78vw; opacity: 1;}
  65%, 90% {left: -32.78vw; opacity: 0} 
  90%, 100%, 0%, 39% {left: 100vw; opacity: 0}
`;

const Animation10 = keyframes`
  45%, 49% {left: 79.72vw; opacity: 1;}
  50%, 54% {left: 58.89vw; opacity: 1} 
  55%, 59% {left: 38.06vw; opacity: 1;}
  60%, 64% {left: 13.33vw; opacity:1;}
  65%, 69% {left: -12.78vw; opacity: 1;}
  70%, 95% {left: -32.78vw; opacity: 0} 
  95%, 100%, 0%, 44% {left: 100vw; opacity: 0}
`;

const Animation11 = keyframes`
  50%, 54% {left: 79.72vw; opacity: 1;}
  55%, 59% {left: 58.89vw; opacity: 1} 
  60%, 64% {left: 38.06vw; opacity: 1;}
  65%, 69% {left: 13.33vw; opacity:1;}
  70%, 74% {left: -12.78vw; opacity: 1;}
  75%, 100%, 0% {left: -32.78vw; opacity: 0} 
  0%, 49% {left: 100vw; opacity: 0}
`;

const Animation12 = keyframes`
  55%, 59% {left: 79.72vw; opacity: 1;}
  60%, 64% {left: 58.89vw; opacity: 1} 
  65%, 69% {left: 38.06vw; opacity: 1;}
  70%, 74% {left: 13.33vw; opacity:1;}
  75%, 79% {left: -12.78vw; opacity: 1;}
  80%, 100%, 0%, 5% {left: -32.78vw; opacity: 0} 
  5%, 54% {left: 100vw; opacity: 0}
`;

const Animation13 = keyframes`
  60%, 64% {left: 79.72vw; opacity: 1;}
  65%, 69% {left: 58.89vw; opacity: 1} 
  70%, 74% {left: 38.06vw; opacity: 1;}
  75%, 79% {left: 13.33vw; opacity:1;}
  80%, 84% {left: -12.78vw; opacity: 1;}
  85%, 100%, 0%, 10% {left: -32.78vw; opacity: 0} 
  10%, 59% {left: 100vw; opacity: 0}
`;

const Animation14 = keyframes`
  65%, 69% {left: 79.72vw; opacity: 1;}
  70%, 74% {left: 58.89vw; opacity: 1} 
  75%, 79% {left: 38.06vw; opacity: 1;}
  80%, 84% {left: 13.33vw; opacity:1;}
  85%, 89% {left: -12.78vw; opacity: 1;}
  90%, 100%, 0%, 15% {left: -32.78vw; opacity: 0} 
  15%, 64% {left: 100vw; opacity: 0}
`;

const Animation15 = keyframes`
  70%, 74% {left: 79.72vw; opacity: 1;}
  75%, 79% {left: 58.89vw; opacity: 1} 
  80%, 84% {left: 38.06vw; opacity: 1;}
  85%, 89% {left: 13.33vw; opacity:1;}
  90%, 94% {left: -12.78vw; opacity: 1;}
  95%, 100%, 0%, 20% {left: -32.78vw; opacity: 0} 
  20%, 69% {left: 100vw; opacity: 0}
`;

const Animation16 = keyframes`
  75%, 79% {left: 79.72vw; opacity: 1;}
  80%, 84% {left: 58.89vw; opacity: 1} 
  85%, 89% {left: 38.06vw; opacity: 1;}
  90%, 94% {left: 13.33vw; opacity:1;}
  95%, 99% {left: -12.78vw; opacity: 1;}
  100%, 0%, 25% {left: -32.78vw; opacity: 0} 
  25%, 74% {left: 100vw; opacity: 0}
`;

const Animation17 = keyframes`
  80%, 84% {left: 79.72vw; opacity: 1;}
  85%, 89% {left: 58.89vw; opacity: 1} 
  90%, 94% {left: 38.06vw; opacity: 1;}
  95%, 99% {left: 13.33vw; opacity:1;}
  100%, 0%, 4% {left: -12.78vw; opacity: 1;}
  5%, 30% {left: -32.78vw; opacity: 0} 
  30%, 79% {left: 100vw; opacity: 0}
`;

const Animation18 = keyframes`
  85%, 89% {left: 79.72vw; opacity: 1;}
  90%, 94% {left: 58.89vw; opacity: 1} 
  95%, 99% {left: 38.06vw; opacity: 1;}
  100%, 0%, 4% {left: 13.33vw; opacity:1;}
  5%, 9% {left: -12.78vw; opacity: 1;}
  10%, 35% {left: -32.78vw; opacity: 0} 
  35%, 84% {left: 100vw; opacity: 0}
`;

const Animation19 = keyframes`
  90%, 94% {left: 79.72vw; opacity: 1;}
  95%, 99% {left: 58.89vw; opacity: 1} 
  100%, 0%, 4% {left: 38.06vw; opacity: 1;}
  5%, 9% {left: 13.33vw; opacity:1;}
  10%, 14% {left: -12.78vw; opacity: 1;}
  15%, 40% {left: -32.78vw; opacity: 0} 
  40%, 89% {left: 100vw; opacity: 0}
`;

const Animation20 = keyframes`
  95%, 99% {left: 79.72vw; opacity: 1;}
  100%, 0%, 4% {left: 58.89vw; opacity: 1} 
  5%, 9% {left: 38.06vw; opacity: 1;}
  10%, 14% {left: 13.33vw; opacity:1;}
  15%, 19% {left: -12.78vw; opacity: 1;}
  20%, 45% {left: -32.78vw; opacity: 0} 
  45%, 94% {left: 100vw; opacity: 0}
`;

const MainWrapper = styled.div`
  width: 100vw;
  height: 76.11vw;
  padding-top: 11.11vw;
  background-image: url('../../../../designImage/mobile/onboarding/banner.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CellPhone = styled.div`
  width: 27.5vw;
  height: 42.78vw;
  box-sizing: border-box;
  border-top: 1.2vw solid #f3f4f8;
  border-left: 1.2vw solid #f3f4f8;
  border-right: 1.2vw solid #f3f4f8;
  background-color: #fff;
  border-radius: 3.6vw 3.6vw 0 0;
  box-shadow: -10vw 0 10vw rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 8.89vw;
  bottom: 0;
  z-index: 5;
`;

const Notch = styled.div`
  width: 13.75vw;
  height: 2.4vw;
  border-radius: 0 0 1.2vw 1.2vw;
  background-color: #f3f4f8;
  position: absolute;
  z-index: 10;
  left: 15.8vw;
  top: 45.54vw;
`;

const PowerButton = styled.div`
  width: 0.6vw;
  height: 3.8vw;
  border-radius: 0.4vw 0 0 0.4vw;
  background-color: #c6c8d4;
  position: absolute;
  left: 8.3vw;
  top: 52.54vw;
  z-index: 10;
`;

const VolumeButton = styled.div`
  width: 0.5vw;
  height: 3.3vw;
  border-radius: 0.4vw 0 0 0.4vw;
  background-color: #c6c8d4;
  position: absolute;
  left: 8.4vw;
  z-index: 10;
`;

const Cards = styled.div`
  width: 100vw;
  height: 26.13vw;
  margin-top: 23.06vw;
  position: relative;
  z-index: 15;
`;

const Card = styled.div`
  width: 19.44vw;
  height: 26.13vw;
  border-radius: 0.61vw;
  position: absolute;
  left: -30%;
  z-index: 20;

  &:nth-child(1) {
    background-color: pink;
    animation: ${Animation1} 60s infinite;
  }

  &:nth-child(2) {
    background-color: aliceblue;
    animation: ${Animation2} 60s infinite;
  }

  &:nth-child(3) {
    background-color: antiquewhite;
    animation: ${Animation3} 60s infinite;
  }

  &:nth-child(4) {
    background-color: aqua;
    animation: ${Animation4} 60s infinite;
  }

  &:nth-child(5) {
    background-color: aquamarine;
    animation: ${Animation5} 60s infinite;
  }

  &:nth-child(6) {
    background-color: azure;
    animation: ${Animation6} 60s infinite;
  }

  &:nth-child(7) {
    background-color: beige;
    animation: ${Animation7} 60s infinite;
  }

  &:nth-child(8) {
    background-color: bisque;
    animation: ${Animation8} 60s infinite;
  }

  &:nth-child(9) {
    background-color: black;
    animation: ${Animation9} 60s infinite;
  }

  &:nth-child(10) {
    background-color: blanchedalmond;
    animation: ${Animation10} 60s infinite;
  }

  &:nth-child(11) {
    background-color: blue;
    animation: ${Animation11} 60s infinite;
  }

  &:nth-child(12) {
    background-color: blueviolet;
    animation: ${Animation12} 60s infinite;
  }

  &:nth-child(13) {
    background-color: brown;
    animation: ${Animation13} 60s infinite;
  }

  &:nth-child(14) {
    background-color: burlywood;
    animation: ${Animation14} 60s infinite;
  }

  &:nth-child(15) {
    background-color: red;
    animation: ${Animation15} 60s infinite;
  }

  &:nth-child(16) {
    background-color: yellow;
    animation: ${Animation16} 60s infinite;
  }

  &:nth-child(17) {
    background-color: green;
    animation: ${Animation17} 60s infinite;
  }

  &:nth-child(18) {
    background-color: purple;
    animation: ${Animation18} 60s infinite;
  }

  &:nth-child(19) {
    background-color: chartreuse;
    animation: ${Animation19} 60s infinite;
  }

  &:nth-child(20) {
    background-color: mistyrose;
    animation: ${Animation20} 60s infinite;
  }
`;

export default Banner;
