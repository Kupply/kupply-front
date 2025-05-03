import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MajorOptionsLongEng as MajorOptions } from '../../mappings/MajorTypes';
import { engMajorParamMappingImage, engMajorParamMappingPath } from '../../mappings/Mappings';

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


export default function SubCard({ korName, engName, TO, avgPass, minPass, compRate, semester }: CardProps) {
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
  const majorName = engMajorParamMappingPath[engName as MajorOptions];
  const depName = engMajorParamMappingImage[engName as MajorOptions];

  //console.log([majorKorName, majorName, depName]);

  const handleClickDetail = () => {
    navigate('/archive/' + majorName);
  };

  return (
    <>
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
    </>
  );
}

interface ContainerProps {
  hover?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 13vw;
  height: 17.5vw;
  flex-shrink: 0;
  position: relative;
  border-radius: 0.42vw;
  box-shadow: 0px 14.857px 37.143px 0px rgba(76, 76, 76, 0.4);
  backdrop-filter: blur(6.685710906982422px);
`;

const CardImageDefault = styled.div`
  position: absolute;
  width: 13vw;
  height: 17.5vw;
  border-radius: 0.42vw;
  overflow: hidden; /* Ensure the image is clipped to the container's dimensions */

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Maintain aspect ratio while fitting the container */
  }
`;

const MajorNameKor = styled.div<ContainerProps>`
  color: #141414;
  text-align: ${(props) => (props.hover ? undefined : 'center')};
  font-family: Pretendard;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1vw;
  margin-bottom: ${(props) => (props.hover ? '0.42vw' : '0.5vw')};
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
    font-size: 0.67vw;
    font-style: normal;
    font-weight: 400;
    line-height: 0.75vw; 
    opacity: 0.8;
    text-wrap: balance;
    width: 10.58vw;
    `
      : `
    color: #141414;
    font-family: Pretendard;
    font-size: 0.66vw;
    font-style: normal;
    font-weight: 400;
    line-height:  112.5% 
    opacity: 0.8;
    text-wrap: balance;
    width: 8.46vw;
    `}
`;

const NameWrapper = styled.span<ContainerProps>`
  ${(props) =>
    !props.hover
      ? `
    position: absolute;
    top: 13.21vw;
    flex-shrink: 0;
    left: 50%;
    transform: translateX(-50%);
    `
      : `
    position: absolute;
    margin: 1.92vw 4vw 13.46vw 4.13vw;
    flex-shrink: 0;
    `}
`;
