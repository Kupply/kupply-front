import styled from 'styled-components';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  hopeMajor: string;
}

const majorParamMappingImage: { [key: string]: string } = {
  경영학과: 'business',
  경제학과: 'political',
  심리학부: 'psycho',
  통계학과: 'political',
  수학과: 'science',
  화학과: 'science',
  미디어학부: 'media',
  식품자원경제학과: 'bio',
  컴퓨터학과: 'info',
  생명공학부: 'bio',
  생명과학부: 'bio',
  정치외교학과: 'political',
  행정학과: 'political',
  신소재공학부: 'engineering',
  기계공학부: 'engineering',
  산업경영공학부: 'engineering',
  전기전자공학부: 'engineering',
  화공생명공학부: 'engineering',
  데이터과학부: 'info',
  스마트보안학부: 'smartsecurity',
};

export default function Card02({ korName, hopeMajor }: CardProps) {
  const depName = majorParamMappingImage[korName];

  // svg가 자꾸 달아나서...
  return (
    <Container>
      <img
        style={{
          fill: 'radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0.00) 100%)',
          position: 'absolute',
          top: '0.417vw',
          left: '0.156vw',
          width: '5.83vw',
          height: '5.83vw',
        }}
        src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_ellipse.svg`}
        alt="major ellipse svg"
      />

      <MajorImage>
        <img
          src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_trans_small.png`}
          alt="major image"
        />
      </MajorImage>

      <Typography
        style={{
          lineHeight: '1.042vw',
          top: '1.354vw',
          left: '6.77vw',
          fontSize: '1.041vw',
          fontWeight: '400',
          color: 'rgba(67, 67, 67, 0.60)',
        }}
      >
        {hopeMajor}
      </Typography>
      <Typography
        style={{
          lineHeight: '1.042vw',
          top: '2.812vw',
          left: '6.77vw',
          fontSize: '1.041vw',
          fontWeight: '700',
          color: '#141414',
          flexShrink: '0px',
        }}
      >
        {korName}
      </Typography>
    </Container>
  );
}

const Container = styled.div`
  width: 14.6875vw;
  height: 5.21vw;
  flex-shrink: 0;
  border-radius: 0.26vw;
  border: 1px solid #eee;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(0.47vw);
  box-sizing: border-box;
  position: relative;
`;

// const MajorImage = styled.div<{image: string}>`
// width: 2.518vw;
// height: 3.306vw;
// flex-shrink: 0;
// background: url(${props => props.image}) no-repeat;
// top: 1.18vw;
// left: 2.25vw;
// bottom: 0.88vw;
// position: absolute;
// `
const MajorImage = styled.div`
  width: 2.518vw;
  height: 3.306vw;
  flex-shrink: 0;
  overflow: hidden; /* Ensure the image is clipped to the container's dimensions */
  position: absolute;
  top: 1.07vw;
  left: 2.25vw;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio while covering the container */
  }
`;

const Typography = styled.div`
  font-family: Pretendard;
  font-style: normal;
  white-space: nowrap;
  position: absolute;
`;
