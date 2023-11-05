import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/Logo';
import Typography, { TypographyProps } from '../../assets/Typography';
import { sizeMapping } from '../../assets/Typography';

// 추후 수정: 절대값 px 을 상대값 % 로 바꿔야 함.

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1920px;
  height: 262px; //(262/1248 = 20.1)
  background: #f9f9f9;
  position: bottom: fixed;
`;

const FooterWrapper = styled.div`
  display: flex;
  top: 0;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  max-width: 1920px; //2560px;
  height: 262px; //(262/1248 = 20.1)
  background: #f9f9f9;
  padding: 41.84px 128px 42.78px 128px; // 상우하좌 순서
  box-sizing: border-box;
  position: bottom: fixed;
  //margin-top: ;
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
  // width: 53px;
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
  width: 100vw;
  height: 1px;
  background: rgba(20, 20, 20, 0.5);
`;

const ContentsWrapper = styled.div`
  display: flex; // 가로 정렬
  justify-content: space-between;
  width: auto;
`;

export default function Footer({ setSelected }: { setSelected: React.Dispatch<React.SetStateAction<number>> }) {
  const navigate = useNavigate();
  const handleMenu1Click = () => {
    navigate('/archive');
  };
  const handleMenu2Click = () => {
    navigate('/myboard');
  };
  const handleMenu3Click = () => {
    navigate('/landing');
  };
  const handleSettingsClick = () => {
    if (isLogined) navigate('/settings');
  };

  const [isLogined, setisLogined] = useState<boolean>(false);
  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setisLogined(true);
    else setisLogined(false);
  }, []);

  return (
    <Background>
      <FooterWrapper>
        <Logo />
        <ContentsWrapper style={{ marginTop: '26.1px', marginBottom: '46.35px' }}>
          <ContentsWrapper>
            <div>
              <Typography size="smallText" bold="600">
                사이트맵
              </Typography>
              <div style={{ height: '8.05px' }}></div>
              <MenuWrapper>
                <MenuButton onClick={handleMenu3Click}>실시간 지원현황</MenuButton>
                <MenuButton onClick={handleMenu1Click}>합격자료</MenuButton>
                <MenuButton onClick={handleMenu2Click}>마이보드</MenuButton>
                <MenuButton onClick={handleSettingsClick}>환경설정</MenuButton>
              </MenuWrapper>
            </div>
            <div style={{ marginLeft: '50px' }}>
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
        <ContentsWrapper style={{ marginTop: '28.89px', gap: 'auto' }}>
          <ContentsWrapper>
            <Typography size="smallText" color="#A8A8A8" style={{ marginRight: '38px' }}>
              Copyright ⓒ 2023 kupply. all rights reserved.
            </Typography>
            <MenuWrapper>
              <MenuButton
                style={{ color: '#A8A8A8' }}
                onClick={() => {
                  if (isLogined) {
                    setSelected(4);
                    navigate('/settings');
                  }
                }}
              >
                이용약관
              </MenuButton>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdY6ponmxnPWcGUCwQUB-wZboIXh7igfzxIr5-qFSHAACJnNA/viewform?usp=send_form"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MenuButton style={{ color: '#A8A8A8', width: 'auto' }}>버그리포트</MenuButton>
              </a>
              <a
                href="https://www.instagram.com/kupply_ku/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <MenuButton style={{ color: '#A8A8A8', width: 'auto' }}>인스타그램</MenuButton>
              </a>
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
    </Background>
  );
}
