import styled from 'styled-components';
import Typography from '../../../assets/Typography';

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
  화공생명공학과: 'engineering',
  데이터과학과: 'info',
  스마트보안학부: 'smartsecurity',
};

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  hopeMajor: string;
}

export default function Card02({ korName, hopeMajor }: CardProps) {
  const depName = majorParamMappingImage[korName];

  return (
    <Container>
      <MajorImage>
        <img
          src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_shadow.svg`}
          alt="major image"
        />
      </MajorImage>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5vw', // Converted from 9px
          top: '6.11vw', // Converted from 22px
          left: '36.11vw', // Converted from 130px
        }}
      >
        <Typography
          style={{
            color: 'rgba(20, 20, 20, 0.70)',
            fontFamily: 'Pretendard',
            fontSize: '4.44vw', // Converted from 16px
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '120%',
          }}
        >
          {hopeMajor}
        </Typography>
        <Typography
          style={{
            color: '#141414',
            fontFamily: 'Pretendard',
            fontSize: '4.44vw', // Converted from 16px
            fontStyle: 'normal',
            fontWeight: '700',
            lineHeight: '120%',
          }}
        >
          {korName}
        </Typography>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 91.11vw; // Converted from 328px
  height: 25vw; // Converted from 90px
  flex-shrink: 0;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4.13vw 10.32vw rgba(223, 223, 223, 0.4); // Converted x and y of box-shadow
  backdrop-filter: blur(1.86vw); // Converted from 6.68571px
`;

const MajorImage = styled.div`
  width: 31.11vw; // Converted from 112px
  height: 31.11vw; // Same as width to maintain aspect ratio
  flex-shrink: 0;
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 0px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
