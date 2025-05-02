import styled, { keyframes } from 'styled-components';
import Typography from '../../assets/Typography';
import { collegeNameMappingByKR } from '../../mappings/Mappings';
import { majorNameMappingByKr } from '../../mappings/Mappings';

function Banner() {
  const cardData = Object.keys(majorNameMappingByKr).map((korName) => ({
    korName,
    engName: (majorNameMappingByKr as Record<string, string>)[korName], // Type assertion
    image: `../../designImage/majorSymbol/newMajorImage/${(collegeNameMappingByKR as Record<string, string>)[korName]}.png`,
  }));  
  
  return (
    <MainWrapper>
      <div style={{ display: 'felx', marginTop: '6.56vw' }}>
        <Typography size="2.5vw" bold="700" color="#FFF" style={{ lineHeight: '121.875%' }}>
          쿠플라이가 모아주는 고려대학교 인기 이중전공 정보모음
        </Typography>
        <Typography size="2.5vw" bold="300" color="#FFF" style={{ lineHeight: '121.875%' }}>
          .zip
        </Typography>
      </div>
      <Typography size="1.04vw" bold="500" color="#FFF" style={{ margin: '0.89vw 0 0.42vw 0' }}>
        당신의 이중전공 메이트,
      </Typography>
      <Typography size="1.04vw" bold="500" color="#FFF">
        쿠플라이가 인기 학과에 성공적으로 진입할 수 있도록 도울게요.
      </Typography>
      <Cards>
        {cardData.map((data, dataIndex) => (
          <Card key={dataIndex} style={{ backgroundImage: `url(${data.image})` }}>
            <Typography size="1.11vw" bold="700" style={{ marginTop: '98.85%', lineHeight: '112.5%' }}>
              {data.korName}
            </Typography>
            <Typography
              size="0.77vw"
              style={{ opacity: '0.8', lineHeight: '112.5%', textAlign: 'center', margin: '0 0.77vw' }}
            >
              {data.engName}
            </Typography>
          </Card>
        ))}
      </Cards>
      <CellPhone />
      <Notch />
      <PowerButton />
      <VolumeButton style={{ top: '29.58vw' }} />
      <VolumeButton style={{ top: '32.33vw' }} />
    </MainWrapper>
  );
}

const Animation1 = keyframes`
  0%, 4%, 100% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  5%, 9% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  10%, 14% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  15%, 19% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  20%, 24% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  25%, 29% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  30%, 34% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  35%, 50% {left: -32.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  50%, 99% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation2 = keyframes`
  5%, 9% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  10%, 14% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  15%, 19% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  20%, 24% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  25%, 29% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  30%, 34% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  35%, 39% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  40%, 55% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  55%, 100%, 0%, 4% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation3 = keyframes`
  10%, 14% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  15%, 19% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  20%, 24% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  25%, 29% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  30%, 34% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  35%, 39% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  40%, 44% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  45%, 60% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  60%, 100%, 0%, 9% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation4 = keyframes`
  15%, 19% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  20%, 24% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  25%, 29% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  30%, 34% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  35%, 39% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  40%, 44% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  45%, 49% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  50%, 65% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  65%, 100%, 0%, 14% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation5 = keyframes`
  20%, 24% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  25%, 29% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  30%, 34% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  35%, 39% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  40%, 44% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  45%, 49% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  50%, 54% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  55%, 70% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  70%, 100%, 0%, 19% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation6 = keyframes`
  25%, 29% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  30%, 34% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  35%, 39% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  40%, 44% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  45%, 49% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  50%, 54% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  55%, 59% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  60%, 75% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  75%, 100%, 0%, 24% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation7 = keyframes`
  30%, 34% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  35%, 39% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  40%, 44% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  45%, 49% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  50%, 54% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  55%, 59% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  60%, 64% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  65%, 80% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  80%, 100%, 0%, 29% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation8 = keyframes`
  35%, 39% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  40%, 44% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  45%, 49% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  50%, 54% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  55%, 59% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  60%, 64% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  65%, 69% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  70%, 85% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  85%, 100%, 0%, 34% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation9 = keyframes`
  40%, 44% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  45%, 49% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  50%, 54% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  55%, 59% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  60%, 64% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  65%, 69% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  70%, 74% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  75%, 90% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  90%, 100%, 0%, 39% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation10 = keyframes`
  45%, 49% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  50%, 54% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  55%, 59% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  60%, 64% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  65%, 69% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  70%, 74% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  75%, 79% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  80%, 95% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  95%, 100%, 0%, 44% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation11 = keyframes`
  50%, 54% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  55%, 59% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  60%, 64% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  65%, 69% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  70%, 74% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  75%, 79% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  80%, 84% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  85%, 100%, 0% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  0%, 49% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation12 = keyframes`
  55%, 59% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  60%, 64% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  65%, 69% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  70%, 74% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  75%, 79% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  80%, 84% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  85%, 89% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  90%, 100%, 0%, 5% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  5%, 54% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation13 = keyframes`
  60%, 64% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  65%, 69% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  70%, 74% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  75%, 79% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  80%, 84% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  85%, 89% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  90%, 94% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  95%, 100%, 0%, 10% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  10%, 59% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation14 = keyframes`
  65%, 69% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  70%, 74% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  75%, 79% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  80%, 84% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  85%, 89% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  90%, 94% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  95%, 99% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  100%, 0%, 15% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  15%, 64% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation15 = keyframes`
  70%, 74% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  75%, 79% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  80%, 84% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  85%, 89% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  90%, 94% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  95%, 99% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  100%, 0%, 4% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  5%, 20% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  20%, 69% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation16 = keyframes`
  75%, 79% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  80%, 84% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  85%, 89% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  90%, 94% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  95%, 99% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  100%, 0%, 4% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  5%, 9% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  10%, 25% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  25%, 74% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation17 = keyframes`
  80%, 84% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  85%, 89% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  90%, 94% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  95%, 99% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  100%, 0%, 4% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  5%, 9% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  10%, 14% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  15%, 30% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  30%, 79% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation18 = keyframes`
  85%, 89% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  90%, 94% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  95%, 99% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  100%, 0%, 4% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  5%, 9% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  10%, 14% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  15%, 19% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  20%, 35% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  35%, 84% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation19 = keyframes`
  90%, 94% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  95%, 99% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  100%, 0%, 4% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  5%, 9% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  10%, 14% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  15%, 19% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  20%, 24% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  25%, 40% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  40%, 89% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const Animation20 = keyframes`
  95%, 99% {left: 88.23vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  100%, 0%, 4% {left: 73.02vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}  
  5%, 9% {left: 57.79vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  10%, 14% {left: 42.57vw; opacity:1; width: 15.08vw; height: 19.42vw; z-index: 20; top: 0;}
  15%, 19% {left: 29.4vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  20%, 24% {left: 14.17vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  25%, 29% {left: -1.04vw; opacity: 1; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
  30%, 45% {left: -22.78vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;} 
  45%, 94% {left: 100vw; opacity: 0; width: 13.13vw; height: 16.88vw; z-index: 1; top: 1.56vw;}
`;

const MainWrapper = styled.div`
  width: 100vw;
  height: 52.66vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../../designImage/onboarding/Banner.png');
  background-size: cover;
  position: relative;
`;

const CellPhone = styled.div`
  width: 18.75vw;
  height: 34.09vw;
  border-top: 0.83vw solid #f3f4f8;
  border-left: 0.83vw solid #f3f4f8;
  border-right: 0.83vw solid #f3f4f8;
  background-color: #fff;
  border-radius: 2.72vw 2.72vw 0 0;
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 39.93vw;
  box-shadow: -36px 0 36px rgba(0, 0, 0, 0.3);
`;

const Notch = styled.div`
  width: 8.1vw;
  height: 1.58vw;
  border-radius: 0 0 0.9vw 0.9vw;
  background-color: #f3f4f8;
  position: absolute;
  z-index: 10;
  left: 46.14vw;
  top: 18.57vw;
`;

const PowerButton = styled.div`
  width: 0.36vw;
  height: 3vw;
  border-radius: 0.4vw 0 0 0.4vw;
  background-color: #c6c8d4;
  position: absolute;
  left: 39.57vw;
  top: 25.07vw;
  z-index: 5;
`;

const VolumeButton = styled.div`
  width: 0.28vw;
  height: 2.75vw;
  border-radius: 0.4vw 0 0 0.4vw;
  background-color: #c6c8d4;
  position: absolute;
  left: 39.68vw;
  z-index: 5;
`;

const Cards = styled.div`
  width: 100vw;
  height: 19.42vw;
  margin-top: 12.8vw;
  position: relative;
`;

const Card = styled.div`
  width: 13.13vw;
  height: 16.88vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.36vw;
  position: absolute;
  left: -30%;
  top: 0%;
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
