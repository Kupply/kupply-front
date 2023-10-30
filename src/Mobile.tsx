import React from 'react';
import styled from 'styled-components';
import Typography from './assets/Typography';

const MobilePageWrapper = styled.div`
  text-align: center;
  padding: 20px;
  background: var(--White, #fff);
  display: flex;
  margin-top: 25%;
`;

const CharacterImage = styled.img`
  width: 180px;
  height: 180px;
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
  font-family: Gmarket Sans;
  font-size: 33.621px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 1.177px;
  margin-bottom: 29.42px;
`;

const MobilePage = () => {
  return (
    <MobilePageWrapper
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <LogoImage src={`design_image/logo.png`} alt="logo icon" />
      <TitleStyle>쿠플라이</TitleStyle>
      <CharacterImage src={`design_image/character/Iam쏘리에요.png`} alt="Sorry icon" />
      <Typography
        size="bodyText"
        style={{ color: 'var(--Main-Black, #141414)', lineHeight: '120%', textAlign: 'center', marginTop: '19px' }}
      >
        PC로 접속해주세요!
      </Typography>
      <Typography
        size="details"
        style={{ color: 'rgba(20, 20, 20, 0.80)', lineHeight: '125%', textAlign: 'center', marginTop: '12px' }}
      >
        더 안정적인 서비스를 위해서
        <br />
        쿠플라이 모바일 버전은 개발 중에 있습니다.
        <br />
        빠른 시일 내 모바일 버전으로 찾아올게요!
      </Typography>
    </MobilePageWrapper>
  );
};

export default MobilePage;
