import React from 'react';
import styled from 'styled-components';
import Typography from './assets/Typography';
import { GlobalStyle } from './globalStyle';

const MobilePageWrapper = styled.div`
  text-align: center;
  padding: 20px;
  background: var(--White, #fff);
  display: flex;
  flex-direction: column;
  margin-top: 25%;
  align-items: center;
  justify-content: center;
`;

const CharacterImage = styled.img`
  width: 308px;
  height: 368px;
  flex-shrink: 0;
  //background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`;

const LogoImage = styled.img`
  width: 46.575px;
  height: 46px;
  flex-shrink: 0;
  //background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`;

const TitleStyle = styled.text`
  color: #000;
  font-family: 'GmarketSans';
  font-size: 33.621px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1.177px;
  margin-bottom: 29.42px;
`;

const MobilePage = () => {
  return (
    <MobilePageWrapper>
      <CharacterImage src={`design_image/character/Iam쏘리에요.png`} alt="Sorry icon" />
      <Typography
        size="heading2"
        style={{ color: 'var(--Main-Black, #141414)', lineHeight: '120%', textAlign: 'center', marginTop: '19px' }}
      >
        PC로 접속해주세요!
      </Typography>
      <Typography
        size="largeText"
        style={{ color: 'rgba(20, 20, 20, 0.80)', lineHeight: '125%', textAlign: 'center', marginTop: '12px' }}
      >
        쿠플라이 모바일 버전은 현재 개발중에 있습니다. <br />
        빠른 시일 내에 찾아올게요!
      </Typography>
    </MobilePageWrapper>
  );
};

export default MobilePage;

/*
const MobilePage = () => {
  return (
    <MobilePageWrapper>
      <LogoImage src={`design_image/logo.png`} alt="logo icon" />
      <TitleStyle>쿠플라이</TitleStyle>
      <CharacterImage src={`design_image/character/Iam쏘리에요.png`} alt="Sorry icon" />
      <Typography
        size="bodyText"
        style={{ color: 'var(--Main-Black, #141414)', lineHeight: '120%', textAlign: 'center', marginTop: '19px' }}
      >
        PC로 접속해주세요
      </Typography>
      <Typography
        size="details"
        style={{ color: 'rgba(20, 20, 20, 0.80)', lineHeight: '125%', textAlign: 'center', marginTop: '12px' }}
      >
        쿠플라이는 아직 모바일 환경을 지원하지 않습니다.
      </Typography>
    </MobilePageWrapper>
  );
};
export default MobilePage;
*/
