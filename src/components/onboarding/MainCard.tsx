import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { MajorOptionsLongEng as MajorOptions } from '../../types/MajorTypes';
import ToolTip02 from '../../assets/toolTips/Tooltip02';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  engName: string;
  filter: string[];
  TO: number; // 자리 TO
  avgPass: number;
  minPass: number;
  compRate: number; // competition ratio
  semester: string;
  isDetailed: boolean;
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
  'Biological Engineering': 'bio',
  'School of Life Sciences': 'bio',
  'Department of Political Science & International Relations': 'political',
  'Department of Public Administration': 'political',
  'School of Materials Science & Engineering': 'engineering',
  'School of Mechanical Engineering': 'engineering',
  'School of Industrial Management Engineering': 'engineering',
  'School of Electrical Engineering': 'engineering',
  'Department of Chemical & Biological Engineering': 'engineering',
  'Department of Data Science': 'info',
  'Division of Smart Security': 'smartsecurity'
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
  'Biological Engineering': 'bioeng',
  'School of Life Sciences': 'lifesci',
  'Department of Political Science & International Relations': 'political',
  'Department of Public Administration': 'pubadmin',
  'School of Materials Science & Engineering': 'materials',
  'School of Mechanical Engineering': 'mechanical',
  'School of Industrial Management Engineering': 'industrial',
  'School of Electrical Engineering': 'electrical',
  'Department of Chemical & Biological Engineering': 'chembio',
  'Department of Data Science': 'datasci',
  'Division of Smart Security': 'smartsec'
};

export default function MainCard({
  korName,
  engName,
  TO,
  avgPass,
  minPass,
  compRate,
  semester,
  isDetailed,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
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

  // useEffect(() => {
  //   let timer: number | null = null;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           timer = window.setTimeout(() => {
  //             setIsDetailed(true);
  //           }, 3000);
  //         } else {
  //           if (timer) {
  //             clearTimeout(timer);
  //             timer = null;
  //           }
  //           setIsDetailed(false);
  //         }
  //       });
  //     },
  //     {
  //       root: null,
  //       rootMargin: '0px',
  //       threshold: 0.1,
  //     },
  //   );

  //   if (cardRef.current) {
  //     observer.observe(cardRef.current);
  //   }

  //   return () => {
  //     if (timer !== null) {
  //       clearTimeout(timer);
  //     }
  //     observer.disconnect();
  //   };
  // }, []);

  const majorKorName = korName.split(' ').at(-1);
  const majorName = majorParamMappingPath[engName as MajorOptions];
  const depName = majorParamMappingImage[engName as MajorOptions];

  const handleClickDetail = () => {
    navigate('/archive/' + majorName);
  };

  return (
    <div ref={cardRef}>
      {isDetailed ? (
        <Container>
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
          <ContentInner style={{ top: '6.24vw', left: '1.78vw' }}>20{semester}R 모집정보</ContentInner>

          <ContentTitle style={{ top: '8.35vw', left: '1.78vw' }}>{semester} 선발 인원</ContentTitle>
          <ContentInner style={{ top: '9.47vw', left: '1.78vw' }}>{TO}명</ContentInner>

          <ContentTitle style={{ top: '8.35vw', left: '7.92vw' }}>경쟁률</ContentTitle>
          <ToolTip02 style={{ position: 'absolute', top: '8.15vw', left: '9.72vw', cursor: 'default' }}>
            쿠플라이에서 수집된 데이터 값으로, 실제 경쟁률과 차이가 있을 수 있습니다.
          </ToolTip02>

          <ContentInner style={{ top: '9.47vw', left: '7.92vw' }}>{compRate}</ContentInner>

          <ContentTitle style={{ top: '11.44vw', left: '1.78vw' }}>합격자 평균 학점</ContentTitle>
          <ContentInner style={{ top: '12.56vw', left: '1.78vw' }}>{avgPass}</ContentInner>

          <ContentTitle style={{ top: '11.44vw', left: '7.92vw' }}>합격자 최저 학점</ContentTitle>
          <ContentInner style={{ top: '12.56vw', left: '7.92vw' }}>{minPass}</ContentInner>

          <Button style={{ cursor: 'auto' }}>
            <svg
              style={{
                width: '0.94vw',
                height: '0.94vw',
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
            자세히 보기
          </Button>
        </Container>
      ) : (
        <Container>
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
    </div>
  );
}

interface ContainerProps {
  hover?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 14.63vw;
  height: 20.59vw;
  flex-shrink: 0;
  position: relative;
`;

const CardImageDefault = styled.div`
  position: absolute;
  width: 14.63vw;
  height: 19.69vw;
  border-radius: 0.47vw;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CardImageBlurred = styled.div`
  position: absolute;
  margin-top: 0.05vw;
  width: 14.63vw;
  height: 19.69vw;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardImageSmall = styled.div`
  position: absolute;
  margin: 2.11vw 10.93vw 15.09vw 1.78vw;
  width: 1.93;
  height: 2.53vw;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio while covering the container */
  }
`;

const MajorNameKor = styled.div<ContainerProps>`
  color: #141414;
  text-align: ${(props) => (props.hover ? undefined : 'center')};
  font-family: Pretendard;
  font-size: 1.13vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.13vw;
  margin-bottom: ${(props) => (props.hover ? '0.47vw' : '0.56vw')};
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
    font-size: 0.75vw;
    font-style: normal;
    font-weight: 400;
    line-height: 0.85vw; 
    opacity: 0.8;
    text-wrap: balance;
    width: 11.91vw;
    `
      : `
    color: #141414;
    font-family: Pretendard;
    font-size: 0.75vw;
    font-style: normal;
    font-weight: 400;
    line-height: 112.5%; /* 112.5% */
    opacity: 0.8;
    text-wrap: balance;
    width: 9.51vw;
    `}
`;

const NameWrapper = styled.span<ContainerProps>`
  ${(props) =>
    !props.hover
      ? `
    position: absolute;
    //margin: 317px 29px 50px 29px;
    top: 14.86vw;
    flex-shrink: 0;
    left: 50%;
    transform: translateX(-50%);
    `
      : `
    position: absolute;
    margin: 2.16vw 4.5vw 15.14vw 4.64vw;
    flex-shrink: 0;
    `}
`;

const ContentTitle = styled.div`
  position: absolute;
  color: rgba(20, 20, 20, 0.6);
  font-family: Pretendard;
  font-size: 0.74vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 19.2px */
`;

const ContentInner = styled.div`
  color: #141414;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 1.25vw */
  position: absolute;
`;

const Button = styled.button`
  top: 15.89vw;
  left: 1.78vw;
  display: flex;
  width: 11.06vw;
  height: 1.84;
  padding: 1.13vw 1.59vw;
  justify-content: center;
  align-items: center;
  gap: 0.38vw;
  flex-shrink: 0;
  position: absolute;
  border-radius: 56.83vw;
  background: var(--Primary-color, #d85888);
  color: var(--White, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75vw;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 19.2px */
`;
