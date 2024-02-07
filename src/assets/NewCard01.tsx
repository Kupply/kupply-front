import styled from "styled-components";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { MajorOptionsLongEng as MajorOptions } from "../types/MajorTypes";


export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  engName: string;
  TO: number; // 자리 TO
  avgPass: number;
  minPass: number;
  compRate: number; // competition ratio
  semester: string;
  mainimage: string;
  blurredimage: string;
}

const majorParamMapping = {
  'Business School': 'business',
  'Department of Economics': 'economics',
  'School of Psychology': 'psychology',
  'Department of Statistics': 'statistics',
  'Department of Mathematics': 'mathematics',
  'Department of Chemistry': 'chemistry',
  'School of Media & Communication': 'media',
  'Department of Food & Resources': 'foodecon',
  'Department of Computer Science & Engineering': 'computer',
};
// TO, avgPass, minPass, compRate, semester,

export default function Card ({
  korName, engName, mainimage, blurredimage, TO, avgPass, minPass, compRate, semester
}: CardProps) {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onHoverOut = () => {
    setHover(false);
  };

  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate('/archive/' + majorParamMapping[engName as MajorOptions]);
  };
  
  // hover를 매번 넘겨주지 않고 뭔가 다른 방법이 있을지도...

  return (
  <Container 
    hover={hover}
    onMouseEnter={onHover}
    onMouseLeave={onHoverOut}>
    {!hover? (
      // Default
      // CardImage큰게 Container size랑 같아서 absolute했을때 제대로 적용
    <>
      <CardImageDefault image={process.env.PUBLIC_URL + '/designImage/majorSymbol/newMajorSymbol/bussiness.png'}>
      <NameWrapper hover={false}>
        <MajorNameKor hover={false}>{korName}</MajorNameKor>
        <DepNameEng hover={false}>{engName}</DepNameEng>
      </NameWrapper>
      </CardImageDefault>
    </>
    ) : (
      // Hover 되었을 때 
    <>
      <CardImageBlurred image={process.env.PUBLIC_URL + '/designImage/majorSymbol/newMajorSymbol/bussiness_blurred.png'}>
        <CardImageSmall image={process.env.PUBLIC_URL + '/designImage/majorSymbol/newMajorSymbol/bussiness_trans.png'}/>
        <NameWrapper hover={true}>
          <MajorNameKor hover={true}>{korName}</MajorNameKor>
          <DepNameEng hover={true}>{engName}</DepNameEng>
        </NameWrapper> 
        

        <Button onClick={handleClickDetail}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.33301 14.1663L14.6663 5.83301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.33301 5.83301H14.6663V14.1663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            자세히 보기
        </Button>
    
      </CardImageBlurred>
      
    </>
    )}
  </Container>
  )
}

interface ContainerProps {
  hover?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 312px;
  height: 420px;
  flex-shrink: 0;
  border-radius: ${(props) => 
    props.hover ? '5px' : '0px'};
  box-shadow: ${(props) => 
    props.hover  ? '0px 0px 20px 0px rgba(20, 20, 20, 0.25)' :
    undefined};
`;

const CardImageDefault = styled.div<{image: string;}>`
position: absolute;
width: 312px;
height: 420px;
border-radius: 10px;
background: url(${(props) => props.image}), lightgray 50% / cover no-repeat;

`;

const CardImageBlurred = styled.div<{image: string}>`
position: absolute;
margin-top: 1px;
width: 312px;
height: 420px;
background: url(${(props) => props.image}), lightgray 50% / cover no-repeat;

`;

const CardImageSmall = styled.div<{image: string}>`
position: absolute;
margin: 45px 233px 322px 38px;
width: 41px; 
height: 54px; 
background: url(${(props) => props.image}) no-repeat;
`;

const MajorNameKor = styled.div<ContainerProps>`
  color: #141414;
  text-align: ${(props) => props.hover ? undefined : 'center'};
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; 
  margin-bottom: ${(props) => props.hover ? '10px' : '12px'};
`;

const DepNameEng = styled.div<ContainerProps>`
  ${(props) => (
    !props.hover ?
    `
    width: 254px;
    height: 17px;
    flex-shrink: 0;
    color: #141414;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; 
    opacity: 0.8;
    `
    :
    `
    width: 117px;
    height: 18px;
    color: #141414;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 112.5% */
    opacity: 0.8;
    `
  )}
`;

const NameWrapper = styled.div<ContainerProps>`
  ${(props) => (
    !props.hover ?
    `
    position: absolute;
    margin: 317px 29px 50px 29px;
    flex-shrink: 0;
    `:
    `
    position: absolute;
    margin: 46px 96px 323px 99px;
    flex-shrink: 0;
    `
  )}
`

const ContentWrapper = styled.div`
  postion: absolute;
  flex-shrink: 0;
  color: #141414;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 24px */
`;

const TOSemester = styled.div`
  position: absolute;
  margin: 177px; 177px; 224px; 38px;
  color: rgba(20, 20, 20, 0.60);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
`;

const TONumber = styled.div`
color: #141414;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 24px */
position: absolute;
margin: 201px 231px 195px 38px;
`;

const Button = styled.button`
  margin: 339px 0x 36px 0px;
  display: flex;
  width: 236px;
  height: 46px;
  padding: 24px 34px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  //position: absolute;
  border-radius: 999px;
  background: var(--Primary-color, #D85888);
  color: var(--White, #FFF);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 19.2px */
`;

