import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/Logo';
import Typography, { TypographyProps } from '../../assets/Typography';
import { sizeMapping } from '../../assets/Typography';

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
  max-width: 1920px;
  height: 262px;
  background: #f9f9f9;
  padding: 41.84px 128px 42.78px 128px; // 상우하좌 순서
  box-sizing: border-box;
`;

const ShortcutWrapper = styled.div`
  display: flex;
  width: 151.531px;
  height: 40.844px;
  gap: 8px;
`;

const ShortcutImage1 = styled.div`
  width: 31px;
  height: 40.844px;
  background-image: url('design_image/KUlogo1.png');
  background-size: cover;
`;

const ShortcutImage2 = styled.div`
  width: 29px;
  height: 38.813px;
  background-image: url('design_image/KUlogo2.png');
  background-size: cover;
`;

const ShortcutContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8.97px;
`;

const ConnectLink = styled(Typography)<TypographyProps>`
  font-size: ${(props) => sizeMapping['smallText'][0]};
  font-weight: ${(props) => sizeMapping['smallText'][1]};
  color: rgba(20, 20, 20, 0.7);
  text-decoration-line: underline;
`;

const MenuButton = styled.button`
  display: flex;
  width: auto;
  color: rgba(20, 20, 20, 0.7);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
`;

const MenuWrapper = styled.div`
  display: flex;
  width: auto;
  gap: 20px;
  justify-content: space-between;
`;

const HorizontalLine = styled.div`
  width: 1664px;
  height: 1px;
  background: rgba(20, 20, 20, 0.5);
`;

const ContentsWrapper = styled.div`
  display: flex; // 가로 정렬
  width: auto;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <Logo />
      <ContentsWrapper style={{ marginTop: '26.1px', marginBottom: '46.35px', gap: '767px' }}>
        <ContentsWrapper>
          <div>
            <Typography size="smallText" bold="600">
              사이트맵
            </Typography>
            <div style={{ height: '8.05px' }}></div>
            <MenuWrapper>
              <MenuButton>합격자료</MenuButton>
              <MenuButton>마이보드</MenuButton>
              <MenuButton>커뮤니티</MenuButton>
              <MenuButton>쪽지함</MenuButton>
              <MenuButton>환경설정</MenuButton>
            </MenuWrapper>
          </div>
          <div style={{ marginLeft: '62px' }}>
            <Typography size="smallText" bold="600">
              문의
            </Typography>
            <div style={{ height: '8.05px' }}></div>
            <Typography size="smallText" color="rgba(20, 20, 20, 0.70)">
              kupply.devkor@gmail.com
            </Typography>
          </div>
        </ContentsWrapper>
        <ContentsWrapper>
          <ShortcutWrapper>
            <ShortcutImage1 />
            <ShortcutContents>
              <Typography size="smallText" bold="600">
                고려대학교 포탈
              </Typography>
              <Link to="https://portal.korea.ac.kr/front/Intro.kpd" target="_blank">
                <ConnectLink>바로가기</ConnectLink>
              </Link>
            </ShortcutContents>
          </ShortcutWrapper>
          <ShortcutWrapper style={{ marginLeft: '58px' }}>
            <ShortcutImage2 />
            <ShortcutContents>
              <Typography size="smallText" bold="600">
                고려대학교 교육정보
              </Typography>
              <Link to="https://registrar.korea.ac.kr/eduinfo/info/major_double.do" target="_blank">
                <ConnectLink>바로가기</ConnectLink>
              </Link>
            </ShortcutContents>
          </ShortcutWrapper>
        </ContentsWrapper>
      </ContentsWrapper>
      <ContentsWrapper>
        <HorizontalLine></HorizontalLine>
      </ContentsWrapper>
      <ContentsWrapper style={{ marginTop: '28.89px', gap: '498px' }}>
        <ContentsWrapper>
          <Typography size="smallText" color="#A8A8A8" style={{ marginRight: '58px' }}>
            Copyright ⓒ 2023 kupply. all rights reserved.
          </Typography>
          <MenuWrapper>
            <MenuButton style={{ color: '#A8A8A8' }}>이용약관</MenuButton>
            <MenuButton style={{ color: '#A8A8A8' }}>개인정보 처리방침</MenuButton>
          </MenuWrapper>
        </ContentsWrapper>
        <ContentsWrapper style={{ gap: '8px' }}>
          <Typography size="smallText" color="#A8A8A8">
            고려대학교 소프트웨어 개발학회 DevKor
          </Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
            <path d="M1 0.212891V13.1635" stroke="#A8A8A8" stroke-width="0.5" />
          </svg>
          <Typography size="smallText" color="#A8A8A8">
            서울특별시 성북구 안암로 145 고려대학교
          </Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
            <path d="M1 0.212891V13.1635" stroke="#A8A8A8" stroke-width="0.5" />
          </svg>
          <Typography size="smallText" color="#A8A8A8">
            kupply.devkor@gmail.com
          </Typography>
        </ContentsWrapper>
      </ContentsWrapper>
    </FooterWrapper>
  );
}
