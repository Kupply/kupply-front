import styled, { keyframes } from 'styled-components';

import Typography from '../../../assets/Typography';

const cardData = [
  {
    korName: '경영학과',
    engName: 'Business School',
    image: '../../designImage/majorSymbol/newMajorImage/business.png',
  },
  {
    korName: '심리학부',
    engName: 'School of Psychology',
    image: '../../designImage/majorSymbol/newMajorImage/psycho.png',
  },
  {
    korName: '경제학과',
    engName: 'Department of Economics',
    image: '../../designImage/majorSymbol/newMajorImage/political.png',
  },
  {
    korName: '통계학과',
    engName: 'Department of Statistics',
    image: '../../designImage/majorSymbol/newMajorImage/political.png',
  },
  {
    korName: '미디어학부',
    engName: 'School of Media & Communication',
    image: '../../designImage/majorSymbol/newMajorImage/media.png',
  },
  {
    korName: '산업경영공학부',
    engName: 'School of Industrial & Management Engineering',
    image: '../../designImage/majorSymbol/newMajorImage/engineering.png',
  },
  {
    korName: '컴퓨터학과',
    engName: 'Department of Computer Science & Engineering',
    image: '../../designImage/majorSymbol/newMajorImage/info.png',
  },
  {
    korName: '식품자원경제학과',
    engName: 'Department of Food & Resources',
    image: '../../designImage/majorSymbol/newMajorImage/bio.png',
  },
  {
    korName: '전기전자공학부',
    engName: 'School of Electrical Engineering',
    image: '../../designImage/majorSymbol/newMajorImage/engineering.png',
  },
  {
    korName: '화공생명공학과',
    engName: 'Department of Chemical & Biological Engineering',
    image: '../../designImage/majorSymbol/newMajorImage/engineering.png',
  },
  {
    korName: '수학과',
    engName: 'Department of Mathematics',
    image: '../../designImage/majorSymbol/newMajorImage/science.png',
  },
  {
    korName: '화학과',
    engName: 'Department of Chemistry',
    image: '../../designImage/majorSymbol/newMajorImage/science.png',
  },
  {
    korName: '생명공학부',
    engName: 'Biological Engineering',
    image: '../../designImage/majorSymbol/newMajorImage/bio.png',
  },
  {
    korName: '생명과학부',
    engName: 'School of Life Sciences',
    image: '../../designImage/majorSymbol/newMajorImage/bio.png',
  },
  {
    korName: '정치외교학과',
    engName: 'Department of Political Science & International Relations',
    image: '../../designImage/majorSymbol/newMajorImage/political.png',
  },
  {
    korName: '행정학과',
    engName: 'Department of Public Administration',
    image: '../../designImage/majorSymbol/newMajorImage/political.png',
  },
  {
    korName: '신소재공학부',
    engName: 'School of Materials Science & Engineering',
    image: '../../designImage/majorSymbol/newMajorImage/engineering.png',
  },
  {
    korName: '기계공학부',
    engName: 'School of Mechanical Engineering',
    image: '../../designImage/majorSymbol/newMajorImage/engineering.png',
  },
  {
    korName: '데이터과학과',
    engName: 'Department of Data Science',
    image: '../../designImage/majorSymbol/newMajorImage/info.png',
  },
  {
    korName: '스마트보안학부',
    engName: 'Division of Smart Security',
    image: '../../designImage/majorSymbol/newMajorImage/smartsecurity.png',
  },
];

function Banner() {
  return (
    <MainWrapper>
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
      <Typography size="3.06vw" bold="500" color="#FFF" style={{ lineHeight: '120%', textAlign: 'center' }}>
        당신의 이중전공 메이트, <br />
        쿠플라이가 인기 학과에 성공적으로 진입할 수 있도록 도울게요.
      </Typography>
      <Cards>
        {cardData.map((data, dataIndex) => (
          <Card key={dataIndex} style={{ backgroundImage: `url(${data.image})` }}>
            <Typography size="1.58vw" bold="700">
              {data.korName}
            </Typography>
            <Typography
              size="1.22vw"
              style={{ opacity: '0.8', lineHeight: '114.29%', textAlign: 'center', margin: '0 1.22vw' }}
            >
              {data.engName}
            </Typography>
          </Card>
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
  height: 6.44vw;
  padding-top: 19.69vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.61vw;
  position: absolute;
  left: -30%;
  z-index: 20;
  background-size: cover;
  background-position: center;

  &:nth-child(1) {
    animation: ${Animation1} 60s infinite;
  }

  &:nth-child(2) {
    animation: ${Animation2} 60s infinite;
  }

  &:nth-child(3) {
    animation: ${Animation3} 60s infinite;
  }

  &:nth-child(4) {
    animation: ${Animation4} 60s infinite;
  }

  &:nth-child(5) {
    animation: ${Animation5} 60s infinite;
  }

  &:nth-child(6) {
    animation: ${Animation6} 60s infinite;
  }

  &:nth-child(7) {
    animation: ${Animation7} 60s infinite;
  }

  &:nth-child(8) {
    animation: ${Animation8} 60s infinite;
  }

  &:nth-child(9) {
    animation: ${Animation9} 60s infinite;
  }

  &:nth-child(10) {
    animation: ${Animation10} 60s infinite;
  }

  &:nth-child(11) {
    animation: ${Animation11} 60s infinite;
  }

  &:nth-child(12) {
    animation: ${Animation12} 60s infinite;
  }

  &:nth-child(13) {
    animation: ${Animation13} 60s infinite;
  }

  &:nth-child(14) {
    animation: ${Animation14} 60s infinite;
  }

  &:nth-child(15) {
    animation: ${Animation15} 60s infinite;
  }

  &:nth-child(16) {
    animation: ${Animation16} 60s infinite;
  }

  &:nth-child(17) {
    animation: ${Animation17} 60s infinite;
  }

  &:nth-child(18) {
    animation: ${Animation18} 60s infinite;
  }

  &:nth-child(19) {
    animation: ${Animation19} 60s infinite;
  }

  &:nth-child(20) {
    animation: ${Animation20} 60s infinite;
  }
`;

export default Banner;
