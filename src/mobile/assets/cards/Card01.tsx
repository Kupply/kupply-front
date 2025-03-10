import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MajorOptionsLongEng as MajorOptions } from '../../../mappings/MajorTypes';
import ToolTip02 from '../../../assets/toolTips/Tooltip02';
import { engMajorParamMappingImage, engMajorParamMappingPath } from '../../../mappings/Mappings';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  engName: string;
}

export default function Card01({ korName, engName }: CardProps) {
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
        <CardImageDefault onClick={handleClickDetail}>
          <img
            src={process.env.PUBLIC_URL + `/designImage/majorSymbol/newMajorImage/${depName}.png`}
            alt="major image default"
          />
        </CardImageDefault>
        <NameWrapper>
          <MajorNameKor>{majorKorName}</MajorNameKor>
          <DepNameEng>{engName}</DepNameEng>
        </NameWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  //width: 160px;
  width: 44.444vw;
  //height: 215px;
  height: 59.722vw;
  flex-shrink: 0;
  border-radius: 0px;
  position: relative;
  //align-items: center;
`;

const CardImageDefault = styled.div`
  position: absolute;
  //width: 160px;
  width: 44.444vw;
  //height: 215px;
  height: 59.722vw;
  border-radius: 1.389vw;
  overflow: hidden; /* Ensure the image is clipped to the container's dimensions */

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio while fitting the container */
  }
`;

const MajorNameKor = styled.div`
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  //font-size: 13px;
  font-size: 3.611vw;
  font-style: normal;
  font-weight: 700;
  //line-height: 12px;
  line-height: 3.333vw;
  //margin-bottom: 6px;
  margin-bottom: 1.667vw;
  white-space: nowrap;
`;

const DepNameEng = styled.div`
  flex-shrink: 0;
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  //font-size: 10px;
  font-size: 2.778vw;
  font-style: normal;
  font-weight: 400;
  //line-height: 9px;
  line-height: 2.5vw;
  opacity: 0.8;
  text-wrap: balance;
`;

const NameWrapper = styled.div`
  position: absolute;
  //top: 162px;
  top: 45vw;
  flex-shrink: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%; // 임의로 조정 (수정 필요?)
`;
