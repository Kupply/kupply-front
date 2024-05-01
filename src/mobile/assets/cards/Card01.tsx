import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MajorOptionsLongEng as MajorOptions } from '../../../types/MajorTypes';
import ToolTip02 from '../../../assets/toolTips/Tooltip02';

export interface CardProps extends React.ComponentPropsWithoutRef<'div'> {
  korName: string;
  engName: string;
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
  'School of Industrial & Management Engineering': 'engineering',
  'School of Electrical Engineering': 'engineering',
  'Department of Chemical & Biological Engineering': 'engineering',
  'Department of Data Science': 'info',
  'Division of Smart Security': 'smartsecurity',
};

// 각각의 path 받아서 수정
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
  'School of Industrial & Management Engineering': 'industrial',
  'School of Electrical Engineering': 'electrical',
  'Department of Chemical & Biological Engineering': 'chembio',
  'Department of Data Science': 'datasci',
  'Division of Smart Security': 'smartsec',
};

export default function Card01({ korName, engName }: CardProps) {
  const navigate = useNavigate();

  // 백엔드에서 korName이 경영대학 경영학과 이런 형태로 저장되어 있음. 이를 '경영학과'만 되도록 설정
  const majorKorName = korName.split(' ').at(-1);
  const majorName = majorParamMappingPath[engName as MajorOptions];
  const depName = majorParamMappingImage[engName as MajorOptions];

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
    object-fit: contain; /* Maintain aspect ratio while fitting the container */
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
