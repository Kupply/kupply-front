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
      <CardImageBlurred>
        <img src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_blurred.png`} alt="blurred major image" />
      </CardImageBlurred>
      <CardImageSmall>
        <img src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_trans_small.png`} alt="major image small" />
      </CardImageSmall>
      <NameWrapper hover={true}>
        <MajorNameKor hover={true}>{majorKorName}</MajorNameKor>
        <DepNameEng hover={true}>{engName}</DepNameEng>
      </NameWrapper> 
      <ContentInner 
      style={{top: '6.93vw', left: '1.98vw'}}>
        20{semester}R 모집정보
      </ContentInner>

      <ContentTitle style={{top: '9.28vw', left: '1.98vw'}}>{semester} 선발 인원</ContentTitle>
      <ContentInner style={{top: '10.52vw', left: '1.98vw'}}>{TO}명</ContentInner>

      <ContentTitle style={{top: '9.28vw', left: '8.80vw'}}>경쟁률</ContentTitle>
      <Svg onMouseEnter={onSvgHover} onMouseLeave={onSvgHoverOut}>
      <svg style={{top: '9.28vw', left: '11.10vw', position: 'absolute', width: '0.94vw', height: '0.94vw'}} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
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
      
      <ContentInner style={{top: '10.52vw', left: '8.80vw'}}>{compRate}</ContentInner>

      <ContentTitle style={{top: '12.71vw', left: '1.98vw'}}>합격자 평균 학점</ContentTitle>
      <ContentInner style={{top: '13.96vw', left: '1.98vw'}}>{avgPass}</ContentInner>

      <ContentTitle style={{top: '12.71vw', left: '8.80vw'}}>합격자 최저 학점</ContentTitle>
      <ContentInner style={{top: '13.96vw', left: '8.80vw'}}>{minPass}</ContentInner>

      <Button onClick={handleClickDetail}>
        <svg style={{
          width: '1.04vw',
          height: '1.04vw'
        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
          <path d="M6.33301 14.1663L14.6663 5.83301" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6.33301 5.83301H14.6663V14.1663" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          자세히 보기
      </Button>
    </Container>
    ) : (
      
    <Container hover={hover} onMouseEnter={onHover} onMouseLeave={onHoverOut}>
      <CardImageDefault>
        <img src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}.png`} alt="major image default" />
      </CardImageDefault>
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
  width: 16.25vw;
  height: 21.88vw;
  flex-shrink: 0;
  border-radius: ${(props) => 
    props.hover ? '0.26vw' : '0px'};
  box-shadow: ${(props) => 
    props.hover  ? '0px 0px 1.04vw 0px rgba(20, 20, 20, 0.25)' :
    undefined};
  position: relative;
`;

const CardImageDefault = styled.div`
position: absolute;
width: 16.25vw;
height: 21.88vw;
border-radius: 0.52vw;
overflow: hidden; /* Ensure the image is clipped to the container's dimensions */

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Maintain aspect ratio while fitting the container */
  }
`;

// const CardImageBlurred = styled.div<{image: string}>`
// position: absolute;
// margin-top: 0.052vw;
// width: 16.25vw;
// height: 21.88vw;
// background: url(${(props) => props.image}), lightgray 50% / cover no-repeat;
// `;

const CardImageBlurred = styled.div`
  position: absolute;
  margin-top: 0.052vw;
  width: 16.25vw;
  height: 21.88vw;
  overflow: hidden; /* Ensure the image is clipped to the container's dimensions */

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio while covering the container */
    //filter: blur(5px); /* Apply a blur effect to the image */
  }
`;

// const CardImageSmall = styled.div<{image: string}>`
// position: absolute;
// margin: 2.34vw 12.14vw 16.771vw 1.98vw;
// width: 2.14vw; 
// height: 2.812vw; 
// background: url(${(props) => props.image}) no-repeat;
// `;

const CardImageSmall = styled.div`
  position: absolute;
  margin: 2.34vw 12.14vw 16.771vw 1.98vw;
  width: 2.14vw;
  height: 2.812vw;
  overflow: hidden; /* Ensure the image is clipped to the container's dimensions */

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio while covering the container */
  }
`;

const MajorNameKor = styled.div<ContainerProps>`
  color: #141414;
  text-align: ${(props) => props.hover ? undefined : 'center'};
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw; 
  margin-bottom: ${(props) => props.hover ? '0.52vw' : '0.625vw'};
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
    font-size: 0.833vw;
    font-style: normal;
    font-weight: 400;
    line-height: 0.94vw; 
    opacity: 0.8;
    text-wrap: balance;
    width: 13.23vw;
    `
    :
    `
    color: #141414;
    font-family: Pretendard;
    font-size: 0.833vw;
    font-style: normal;
    font-weight: 400;
    line-height: 0.94vw; /* 112.5% */
    opacity: 0.8;
    text-wrap: balance;
    width: 10.57vw;
    `
  )}
`;

const NameWrapper = styled.span<ContainerProps>`
  ${(props) => (
    !props.hover ?
    `
    position: absolute;
    //margin: 317px 29px 50px 29px;
    top: 16.51vw;
    flex-shrink: 0;
    left: 50%;
    transform: translateX(-50%);
    `:
    `
    position: absolute;
    margin: 2.395vw 5vw 16.823vw 5.16vw;
    flex-shrink: 0;
    `
  )}
`

const ContentTitle = styled.div`
  position: absolute;
  color: rgba(20, 20, 20, 0.60);
  font-family: Pretendard;
  font-size: 0.833vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
`;

const ContentInner = styled.div`
color: #141414;
font-family: Pretendard;
font-size: 1.04vw;
font-style: normal;
font-weight: 700;
line-height: 120%; /* 1.25vw */
position: absolute;
`;

const Button = styled.button`
  top: 17.66vw;
  left: 1.98vw;
  display: flex;
  width: 12.29vw;
  height: 2.40vw;
  padding: 1.25vw 1.77vw;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  flex-shrink: 0;
  position: absolute;
  border-radius: 52.03vw;
  background: var(--Primary-color, #D85888);
  color: var(--White, #FFF);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.833vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 19.2px */
`;

const Svg = styled.div`
width: 0.94vw;
height: 0.94vw;
flex-shrink: 0;
position: absolute;
top: '9.28vw';
left: '11.10vw';
`;

// 아직 정확한 포지셔닝과 문구가 나오지 않아서 놨둠
const HoverInfo = styled.div`
  display: flex;
  padding: 0.52vw 0.42vw;
  justify-content: center;
  align-items: center;

  background: rgba(20, 20, 20, 0.6);
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.73vw;
  font-style: normal;
  font-weight: 500;
  line-height: 0.833vw;
  align-self: stretch;
  position: absolute;
`;

