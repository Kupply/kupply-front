import styled from 'styled-components';
import { collegeNameMappingByKR } from '../../mappings/Mappings';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: keyof typeof collegeNameMappingByKR;
  hopeMajor: string;
}

const getDepartmentName = (korName: keyof typeof collegeNameMappingByKR): string => {
  return collegeNameMappingByKR[korName];
}

export const Card02: React.FC<CardProps> = ({ korName, hopeMajor, ...props }) => {
  const depName: string = getDepartmentName(korName);

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
