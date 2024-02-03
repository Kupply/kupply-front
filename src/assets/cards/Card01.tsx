import styled from "styled-components";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { MajorOptionsLongEng as MajorOptions } from "../../types/MajorTypes";

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  engName: string;
  filter: string[];
  TO: number; // 자리 TO
  avgPass: number;
  minPass: number;
  compRate: number; // competition ratio
  semester: string;
}

const majorParamMappingImage = {
  'Business School': 'business',
  'Department of Economics': 'political',
  'School of Psychology': 'psycho',
  'Department of Statistics': 'political',
  'Department of Mathematics': 'science',
  'Department of Chemistry': 'science',
  'School of Media & Communication': 'media',
  'Department of Food & Resources': 'bio',
  'Department of Computer Science & Engineering': 'info',
};

const majorParamMappingPath = {
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

// Card는 width와 height모두 vw vh로 바꾸는게 맞지 않을까라는 생각이 듬...
// 아직 responsive하게 바꾸지 않음

export default function Card01 ({
  korName, engName, TO, avgPass, minPass, compRate, semester
}: CardProps) {
  const [hover, setHover] = useState(false);
  const [svgHover, setSvgHover] = useState(false);

  const onHover = () => {
    setHover(true);
  };

  const onHoverOut = () => {
    setHover(false);
  };

  const onSvgHover = () => {
    setSvgHover(true);
  }

  const onSvgHoverOut = () => {
    setSvgHover(false);
  }

  const navigate = useNavigate();

  // 백엔드에서 korName이 경영대학 경영학과 이런 형태로 저장되어 있음. 이를 '경영학과'만 되도록 설정
  const majorKorName = (korName.split(' ').at(-1));
  const majorName = majorParamMappingPath[engName as MajorOptions];
  const depName = majorParamMappingImage[engName as MajorOptions];

  console.log([majorKorName, majorName, depName]);

  const handleClickDetail = () => {
    navigate('/archive/' + majorName);
  };
  
  
  
  return (<>
    {hover ? (
    <Container hover={hover} onMouseEnter={onHover} onMouseLeave={onHoverOut}>
      <CardImageBlurred image={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_blurred.png`}/>
      <CardImageSmall image={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_trans.png`}/>
      <NameWrapper hover={true}>
        <MajorNameKor hover={true}>{majorKorName}</MajorNameKor>
        <DepNameEng hover={true}>{engName}</DepNameEng>
      </NameWrapper> 
      <ContentInner 
      style={{top: '133px', left: '38px'}}>
        20{semester}R 모집정보
      </ContentInner>

      <ContentTitle style={{top: '178px', left: '38px'}}>{semester} 선발 인원</ContentTitle>
      <ContentInner style={{top: '202px', left: '38px'}}>{TO}명</ContentInner>

      <ContentTitle style={{top: '178px', left: '169px'}}>경쟁률</ContentTitle>
      <Svg onMouseEnter={onSvgHover} onMouseLeave={onSvgHoverOut}>
      <svg style={{top: '178px', left: '213px', position: 'absolute'}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <g clip-path="url(#clip0_94_861)">
          <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#141414" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.00751 6L9.00001 6" stroke="#141414" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.00751 12L9.00751 9" stroke="#141414" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
          <clipPath id="clip0_94_861">
            <rect width="18" height="18" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      {/* {svgHover && <HoverInfo>'....'</HoverInfo>} */}
      </Svg>
      
      <ContentInner style={{top: '202px', left: '169px'}}>{compRate}</ContentInner>

      <ContentTitle style={{top: '244px', left: '38px'}}>합격자 평균 학점</ContentTitle>
      <ContentInner style={{top: '268px', left: '38px'}}>{avgPass}</ContentInner>

      <ContentTitle style={{top: '244px', left: '169px'}}>합격자 최저 학점</ContentTitle>
      <ContentInner style={{top: '268px', left: '169px'}}>{minPass}</ContentInner>

      <Button onClick={handleClickDetail}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6.33301 14.1663L14.6663 5.83301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.33301 5.83301H14.6663V14.1663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          자세히 보기
      </Button>
    </Container>
    ) : (
      
    <Container hover={hover} onMouseEnter={onHover} onMouseLeave={onHoverOut}>
      <CardImageDefault image={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}.png`}/>
        <NameWrapper hover={false}>
          <MajorNameKor hover={false}>{majorKorName}</MajorNameKor>
          <DepNameEng hover={false}>{engName}</DepNameEng>
        </NameWrapper>
    </Container>
    )}
  </>
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
  position: relative;
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
  white-space: nowrap;
`;

const DepNameEng = styled.div<ContainerProps>`
  ${(props) => (
    !props.hover ?
    `
    flex-shrink: 0;
    color: #141414;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; 
    opacity: 0.8;
    text-wrap: balance;
    width: 254px;
    `
    :
    `
    color: #141414;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 112.5% */
    opacity: 0.8;
    text-wrap: balance;
    width: 203px;
    `
  )}
`;

const NameWrapper = styled.span<ContainerProps>`
  ${(props) => (
    !props.hover ?
    `
    position: absolute;
    //margin: 317px 29px 50px 29px;
    top: 317px;
    flex-shrink: 0;
    left: 50%;
    transform: translateX(-50%);
    `:
    `
    position: absolute;
    margin: 46px 96px 323px 99px;
    flex-shrink: 0;
    `
  )}
`

const ContentTitle = styled.div`
  position: absolute;
  color: rgba(20, 20, 20, 0.60);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
`;

const ContentInner = styled.div`
color: #141414;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 24px */
position: absolute;
`;

const Button = styled.button`
  top: 339px;
  left: 38px;
  display: flex;
  width: 236px;
  height: 46px;
  padding: 24px 34px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  position: absolute;
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

const Svg = styled.div`
width: 18px;
height: 18px;
flex-shrink: 0;
position: absolute;
top: '178px';
left: '213px';
`;

// 아직 정확한 포지셔닝과 문구가 나오지 않아서 놨둠
const HoverInfo = styled.div`
  display: flex;
  padding: 10px 8px;
  justify-content: center;
  align-items: center;

  background: rgba(20, 20, 20, 0.6);
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  align-self: stretch;
  position: absolute;
`;