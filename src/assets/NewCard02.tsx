import styled from "styled-components";

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  majorImage: string;
  hopeMajor: string;
}

export default function Card02({korName, majorImage, hopeMajor}: CardProps){

  return <Container>
    <ImageContainer>
      <svg style={{
        fill: 'radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0.00) 100%)',
        position: 'absolute'
      }} xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112" fill="none">
        <circle cx="56" cy="56" r="56" fill="url(#paint0_radial_6110_17739)" fill-opacity="0.7"/>
        <defs>
          <radialGradient id="paint0_radial_6110_17739" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(56 58.5751) rotate(90) scale(53.4249)">
          <stop stop-color="#926853" stop-opacity="0.58"/>
          <stop offset="1" stop-color="white" stop-opacity="0"/>
          </radialGradient>
        </defs>
      </svg>
      {/* process.env.PUBLIC_URL + '/designImage/majorSymbol/newMajorSymbol/bussiness_trans.png' */ }
      <MajorImage image={majorImage}/>
    </ImageContainer>
    <Typography 
      style={{
      lineHeight: '20px',
      margin: '26px 108px 54px 130px',
      fontSize:"20px", 
      fontWeight:"400", 
      color: 'rgba(67, 67, 67, 0.60)',
      width: '44px'
    }}>{hopeMajor}</Typography>
    <Typography
      style={{
        lineHeight: '20px',
        margin: '54px 82px 26px 130px',
        fontSize:"20px", 
        fontWeight:"700", 
        color: '#141414',
        width: '70px',
        height: '20px',
        flexShrink: '0px'
      }}>
      {korName}
    </Typography>
  </Container>
}

const Container = styled.div`
width: 282px;
height: 100px;
flex-shrink: 0;
border-radius: 5px;
border: 1px solid #EEE;
background: rgba(255, 255, 255, 0.30);
backdrop-filter: blur(9px);
box-sizing: border-box;

`;

const ImageContainer = styled.div`
width: 112px;
height: 112px;
flex-shrink: 0;
margin: 8px 167px -20px 3px;
position: absolute;
`;

const MajorImage = styled.div<{image: string}>`
width: 48.345px;
height: 63.473px;
flex-shrink: 0;
background: url(${props => props.image}) no-repeat;
margin: 11.6px 23.4px 36.9px 40.3px;
position: absolute;
`

const Typography = styled.div`
font-family: Pretendard;
font-style: normal;
position: absolute;
`;
