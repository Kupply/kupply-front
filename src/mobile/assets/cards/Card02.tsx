import styled from 'styled-components';
import Typography from '../../../assets/Typography';
import { collegeNameMappingByKR } from '../../../mappings/Mappings';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: keyof typeof collegeNameMappingByKR;
  hopeMajor: string;
}

const getDepartmentName = (korName: keyof typeof collegeNameMappingByKR): string => {
  return collegeNameMappingByKR[korName];
};

export const Card02: React.FC<CardProps> = ({ korName, hopeMajor, ...props }) => {
  const depName: string = getDepartmentName(korName);

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
