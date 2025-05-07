import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToolTip02 from '../toolTips/Tooltip02';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  engName: string;
  filter: string[];
  majorEngShort: string;
  collegeEngShort: string;
  TO: number; // 자리 TO
  avgPass: number;
  minPass: number;
  passRate: number; // pass ratio
  semester: string;
}

export default function Card01({ 
  korName, 
  engName, 
  majorEngShort, 
  collegeEngShort, 
  TO, 
  avgPass, 
  minPass, 
  passRate, 
  semester 
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
  };

  const onSvgHoverOut = () => {
    setSvgHover(false);
  };

  const navigate = useNavigate();

  // 백엔드에서 korName이 경영대학 경영학과 이런 형태로 저장되어 있음. 이를 '경영학과'만 되도록 설정
  const majorKorName = korName.split(' ').at(-1);
  const majorName = majorEngShort;
  const depName = collegeEngShort;

  //console.log([majorKorName, majorName, depName]);

  const handleClickDetail = () => {
    navigate('/archive/' + majorName);
  };
  return (
    <>
      {hover ? (
        <Container hover={hover} name={majorKorName} onMouseEnter={onHover} onMouseLeave={onHoverOut}>
          <CardImageBlurred>
            <img
              src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_blurred.png`}
              alt="blurred major image"
            />
          </CardImageBlurred>
          <CardImageSmall>
            <img
              src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}_trans_small.png`}
              alt="major image small"
            />
          </CardImageSmall>
          <NameWrapper hover={true}>
            <MajorNameKor hover={true}>{majorKorName}</MajorNameKor>
            <DepNameEng hover={true}>{engName}</DepNameEng>
          </NameWrapper>
          <ContentInner style={{ top: '6.93vw', left: '1.98vw' }}>{semester}R 선발정보</ContentInner>
          <ContentTitle style={{ top: '9.28vw', left: '1.98vw' }}>선발 인원</ContentTitle>
          <ContentInner style={{ top: '10.52vw', left: '1.98vw' }}>{TO}명</ContentInner>
          <ContentTitle style={{ top: '9.28vw', left: '8.80vw' }}>합격률</ContentTitle>
          <ToolTip02
            onMouseEnter={onSvgHover}
            onMouseLeave={onSvgHoverOut}
            hoverState={svgHover}
            style={{ position: 'absolute', top: '9.05vw', left: '10.80vw' }}
          >
            해당 학기에 쿠플라이에서 <br />
            모의지원한 회원들의 합격률로, <br />
            실제 합격률과는 다를 수 있어요.
          </ToolTip02>
          <ContentInner style={{ top: '10.52vw', left: '8.80vw' }}>
            {passRate < 0 ? '집계불가' : passRate + ' %'}
          </ContentInner>
          <ContentTitle style={{ top: '12.71vw', left: '1.98vw' }}>합격자 학점 평균값</ContentTitle>
          <ContentInner style={{ top: '13.96vw', left: '1.98vw' }}>{passRate <= 0 ? '집계불가' : avgPass}</ContentInner>

          <ContentTitle style={{ top: '12.71vw', left: '8.80vw' }}>합격자 학점 최저값</ContentTitle>
          <ContentInner style={{ top: '13.96vw', left: '8.80vw' }}>{passRate <= 0 ? '집계불가' : minPass}</ContentInner>
          <Button onClick={handleClickDetail}>
            <svg
              style={{
                width: '1.04vw',
                height: '1.04vw',
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M6.33301 14.1663L14.6663 5.83301"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.33301 5.83301H14.6663V14.1663"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            자세한 합격지표 보러가기
          </Button>
        </Container>
      ) : (
        <Container hover={hover} onMouseEnter={onHover} onMouseLeave={onHoverOut}>
          <CardImageDefault>
            <img
              src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}.png`}
              alt="major image default"
            />
          </CardImageDefault>
          <NameWrapper hover={false}>
            <MajorNameKor hover={false}>{majorKorName}</MajorNameKor>
            <DepNameEng hover={false}>{engName}</DepNameEng>
          </NameWrapper>
        </Container>
      )}
    </>
  );
}

interface ContainerProps {
  hover?: boolean;
  name?: string;
}

const Container = styled.div<ContainerProps>`
  width: 16.25vw;
  height: 21.88vw;
  flex-shrink: 0;
  border-radius: ${(props) => (props.hover ? '0.52vw' : '0px')};
  box-shadow: ${(props) => (props.hover ? '0px 0px 1.04vw 0px rgba(20, 20, 20, 0.25)' : undefined)};
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
    object-fit: cover; /* Maintain aspect ratio while fitting the container */
    object-position: center;
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
  width: 16.25vw;
  height: 21.88vw;
  border-radius: 0.52vw;

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
    //object-fit: 100% 100%; /* Maintain aspect ratio while covering the container */
  }
`;

const MajorNameKor = styled.div<ContainerProps>`
  color: #141414;
  text-align: ${(props) => (props.hover ? undefined : 'center')};
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw;
  margin-bottom: ${(props) => (props.hover ? '0.52vw' : '0.625vw')};
  white-space: nowrap;
`;

const DepNameEng = styled.div<ContainerProps>`
  ${(props) =>
    !props.hover
      ? `
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
      : `
    color: #141414;
    font-family: Pretendard;
    font-size: 0.73vw;
    font-style: normal;
    font-weight: 400;
    line-height: 0.94vw; /* 112.5% */
    opacity: 0.8;
    text-wrap: balance;
    width: 10.57vw;
    `}
`;

const NameWrapper = styled.span<ContainerProps>`
  ${(props) =>
    !props.hover
      ? `
    position: absolute;
    //margin: 317px 29px 50px 29px;
    top: 16.51vw;
    flex-shrink: 0;
    left: 50%;
    transform: translateX(-50%);
    `
      : `
    position: absolute;
    margin: 2.395vw 5vw 16.823vw 5.16vw;
    flex-shrink: 0;
    `}
`;

const ContentTitle = styled.div`
  position: absolute;
  color: rgba(20, 20, 20, 0.6);
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
  height: 2.4vw;
  padding: 1.25vw 1.25vw;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  flex-shrink: 0;
  position: absolute;
  border-radius: 52.03vw;
  background: var(--Primary-color, #d85888);
  color: var(--White, #fff);
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
