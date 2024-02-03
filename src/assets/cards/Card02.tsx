import styled from "styled-components";

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  hopeMajor: string;
}

const majorParamMappingImage:{[key: string]: string} = {
  '경영학과': 'business',
  '경제학과': 'political',
  '심리학부': 'psycho',
  '통계학과': 'political',
  '수학과': 'science',
  '화학과': 'science',
  '미디어학부': 'media',
  '식품자원경제학과': 'bio',
  '컴퓨터학과': 'info',
};

export default function Card02({korName, hopeMajor}: CardProps){

  const depName = majorParamMappingImage[korName];
  return (
  <Container>
    <img 
      style={{
        fill: 'radial-gradient(47.7% 47.7% at 50% 52.3%, rgba(146, 104, 83, 0.41) 0%, rgba(255, 255, 255, 0.00) 100%)',
        position: 'absolute',
        top: '8px',
        left: '3px'
      }} 
      src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_ellipse.svg`} alt="major ellipse svg" />

    <MajorImage image={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_trans.png`}/>
  
    <Typography 
      style={{
      lineHeight: '20px', 
      top: '26px',
      left: '130px',
      fontSize:"1.041vw",
      fontWeight:"400", 
      color: 'rgba(67, 67, 67, 0.60)',
    }}>{hopeMajor}</Typography>
    <Typography
      style={{
        lineHeight: '20px',
        top: '54px',
        left: '130px',
        fontSize:"1.041vw", 
        fontWeight:"700", 
        color: '#141414',
        flexShrink: '0px'
      }}>
      {korName}
    </Typography>
</Container>)
  
}

const Container = styled.div`
width: 282px; //14.6875vw
height: 100px;
flex-shrink: 0;
border-radius: 5px;
border: 1px solid #EEE;
background: rgba(255, 255, 255, 0.30);
backdrop-filter: blur(9px);
box-sizing: border-box;
position: relative;
`;

const MajorImage = styled.div<{image: string}>`
width: 48.345px;
height: 63.473px;
flex-shrink: 0;
background: url(${props => props.image}) no-repeat;
top: 22.6px;
left: 43.29px;
bottom: 16.92px;
position: absolute;
`

const Typography = styled.div`
font-family: Pretendard;
font-style: normal;
white-space: nowrap;
position: absolute;
`;

