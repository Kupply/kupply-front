import { useState } from 'react';
import { styled } from 'styled-components';
import LabelButton from './buttons/LabelButton';
import { useNavigate } from 'react-router-dom';

export interface CardsProps extends React.ComponentPropsWithRef<'div'> {
  name: string;
  eng: string;
  filter: string[];
  TO: number;
  경쟁률: number;
  avg: number;
  min: number;
  semester: string;
  src: string;
  titleSrc: string;
}

type MajorOptions =
  | 'Business School'
  | 'Department of Economics'
  | 'School of Psychology'
  | 'Department of Statistics'
  | 'Department of Mathematics'
  | 'Department of Chemistry'
  | 'School of Media & Communication'
  | 'Department of Food & Resources'
  | 'Department of Computer Science & Engineering';

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

const Card = ({ name, eng, filter, TO, 경쟁률, avg, min, src, semester, titleSrc }: CardsProps) => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  const [svgHover, setSvgHover] = useState(false);
  const onSvgHover = () => {
    setSvgHover(!svgHover);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/archive/' + majorParamMapping[eng as MajorOptions]);
  };
  return (
    <Container onMouseEnter={onHover} onMouseLeave={onHover}>
      <CardImage src={src} alt="card" hover={hover} />
      {hover ? (
        <>
          <LogoImage src={titleSrc} alt="card" />
          <HoverName>{name}</HoverName>
          <HoverEng>{eng}</HoverEng>
          <Hover모집정보>{semester} 모집정보</Hover모집정보>
          <HoverTOTitle>{semester.substring(2, 6)} 선발 인원</HoverTOTitle>
          <HoverTO>{TO}명</HoverTO>
          <Hover경쟁률Title>경쟁률</Hover경쟁률Title>
          <Hover경쟁률>{경쟁률} : 1</Hover경쟁률>
          <HoverMinTitle>합격자 최저 학점</HoverMinTitle>
          <HoverMin>{min}</HoverMin>
          <HoverAvgTitle>합격자 평균 학점</HoverAvgTitle>
          <HoverAvg>{avg}</HoverAvg>
          <Svg onMouseEnter={onSvgHover} onMouseLeave={onSvgHover}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <g clip-path="url(#clip0_3298_1700)">
                <path
                  d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
                  stroke="#141414"
                  stroke-opacity="0.6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.00781 6L9.00031 6"
                  stroke="#141414"
                  stroke-opacity="0.6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.00781 12L9.00781 9"
                  stroke="#141414"
                  stroke-opacity="0.6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3298_1700">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Svg>{' '}
          {svgHover && (
            <>
              <HoverInfo>
                쿠플라이에서 수집된 데이터 값으로,
                <br />
                실제 경쟁률과 차이가 있을 수 있습니다.
              </HoverInfo>
              <SvgNotch>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <g filter="url(#filter0_b_3298_4378)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.060303 0L0 0.079604L6 8L12 0.079604L11.9397 0H0.060303Z"
                      fill="#141414"
                      fill-opacity="0.6"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_b_3298_4378"
                      x="-54.3656"
                      y="-54.3656"
                      width="120.731"
                      height="116.731"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feGaussianBlur in="BackgroundImageFix" stdDeviation="27.1828" />
                      <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3298_4378" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_3298_4378" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </SvgNotch>
            </>
          )}
          <Button onClick={handleClick}>
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5.83203 14.1673L14.1654 5.83398"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.83203 5.83398H14.1654V14.1673"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </>
            자세히 보기
          </Button>
        </>
      ) : (
        <>
          <Name>{name}</Name>
          <EngName>{eng}</EngName>
        </>
      )}
    </Container>
  );
};
const Button = styled.button`
  margin-top: 452px;
  margin-left: 66px;
  position: absolute;
  display: flex;
  width: 312px;
  height: 60px;
  padding: 24px 34px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  border-radius: 999px;
  background: var(--Primary-color, #d85888);
`;

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
  margin-top: 184px;
  margin-left: 204px;
`;

const SvgNotch = styled.div`
  width: 12px;
  height: 8px;
  flex-shrink: 0;
  fill: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(27.182817459106445px);
  margin-top: 229px;
  margin-left: 314px;
`;

const Svg = styled.div`
  display: flex;
  width: 18px;
  height: 18px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: absolute;
  margin-top: 249px;
  margin-left: 311px;
`;
const CardImage = styled.img<{ hover?: boolean }>`
  position: absolute;
  ${(props) => (props.hover ? 'filter:  blur(10px) opacity(50%);  background: lightgray;' : '')}
`;

const HoverTOTitle = styled.div`
  margin-left: 66px;
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  margin-top: 250px;
  position: absolute;
`;
const HoverMin = styled.div`
  margin-left: 260px;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-top: 350px;
  position: absolute;
`;
const HoverMinTitle = styled.div`
  margin-left: 260px;
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  margin-top: 323px;
  position: absolute;
`;
const HoverTO = styled.div`
  margin-left: 66px;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-top: 277px;
  position: absolute;
`;
const HoverAvgTitle = styled.div`
  margin-left: 66px;
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  margin-top: 323px;
  position: absolute;
`;
const HoverAvg = styled.div`
  margin-left: 66px;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-top: 350px;
  position: absolute;
`;
const Hover경쟁률Title = styled.div`
  margin-left: 260px;
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  margin-top: 250px;
  position: absolute;
`;
const Hover경쟁률 = styled.div`
  margin-left: 260px;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  margin-top: 277px;
  position: absolute;
`;

const Hover모집정보 = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  position: absolute;
  margin-top: 198px;
  margin-left: 66px;
`;

const HoverName = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  position: absolute;
  margin-top: 79px;
  margin-left: 120px;
`;

const HoverEng = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  opacity: 0.8;
  position: absolute;
  margin-top: 115px;
  margin-left: 120px;
`;

const Container = styled.div`
  width: 444px;
  height: 572px;
  border-radius: 10px;
`;

const LogoImage = styled.img`
  width: 41px;
  height: 54px;
  position: absolute;
  margin-top: 82px;
  margin-left: 66px;
`;

const EngName = styled.div`
  text-align: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  width: 254px;

  opacity: 0.8;
  position: absolute;
  margin-left: 95px;
  margin-top: 487px;
`;
const Name = styled.div`
  position: absolute;
  margin-left: 180px;
  margin-top: 451px;
  color: #141414;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
`;

export default Card;
