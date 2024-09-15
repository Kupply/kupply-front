import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/OldLogo';
import Typography, { TypographyProps } from '../../assets/OldTypography';
import { sizeMapping } from '../../assets/OldTypography';
import { TextButton05 } from '../../assets/buttons/TextButton';
import { useRecoilState } from 'recoil';
import { SBContentState } from '../../store/atom';

export default function Footer() {
  const [selected, setSelected] = useRecoilState(SBContentState);
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
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Contents>
          <ContentsWrapper justify="space-between" size="58%" maxSize="616px">
            <SiteMap>
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
            </SiteMap>
            <QNAWrapper>
              <Typography size="smallText" bold="600">
                문의
              </Typography>
              <div style={{ height: '8.05px' }}></div>
              <Typography size="smallText" color="rgba(20, 20, 20, 0.70)">
                kupply.devkor@gmail.com
              </Typography>
            </QNAWrapper>
          </ContentsWrapper>
          <ContentsWrapper justify="flex-end" size="42%" maxSize="480px">
            <ShortcutWrapper>
              <ShortcutImage1 />
              <ShortcutContents>
                <Typography size="smallText" bold="600">
                  고려대학교 포탈
                </Typography>
                {/* <Link to="https://portal.korea.ac.kr/front/Intro.kpd" target="_blank">
                  <ConnectLink>바로가기</ConnectLink>
                </Link> */}
                <TextButton05 fontSize="10px" externalUrl="https://portal.korea.ac.kr/front/Intro.kpd">
                  바로가기
                </TextButton05>
              </ShortcutContents>
            </ShortcutWrapper>
            <ShortcutWrapper>
              <ShortcutImage2 />
              <ShortcutContents>
                <Typography size="smallText" bold="600">
                  고려대학교 교육정보
                </Typography>
                {/* <Link to="https://registrar.korea.ac.kr/eduinfo/info/major_double.do" target="_blank">
                  <ConnectLink>바로가기</ConnectLink>
                </Link> */}
                <TextButton05 fontSize="10px" externalUrl="https://registrar.korea.ac.kr/eduinfo/info/major_double.do">
                  바로가기
                </TextButton05>
              </ShortcutContents>
            </ShortcutWrapper>
          </ContentsWrapper>
        </Contents>
        <HorizentalWrapper>
          <HorizontalLine></HorizontalLine>
        </HorizentalWrapper>
        <BottomContentsWrapper>
          <ContentsWrapper size="25%" minSize="223px" maxSize="290px" justify="flex-start" order="3">
            <Typography size="smallText" color="#A8A8A8">
              Copyright ⓒ 2023 kupply. all rights reserved.
            </Typography>
          </ContentsWrapper>
          <ContentsWrapper size="20%" minSize="127px" justify="flex-start" order="1">
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
              <MenuButton
                style={{ color: '#A8A8A8' }}
                onClick={() => {
                  if (isLogined) {
                    setSelected(4);
                    navigate('/settings');
                  }
                }}
              >
                개인정보 처리방침
              </MenuButton>
              <MenuButton
                style={{ color: '#A8A8A8' }}
                onClick={() => {
                  window.open(
                    'https://candle-mulberry-ea5.notion.site/c78d3f50dc014f34a9dacfe2acea8a10?pvs=4',
                    '_blank',
                    'noopener,noreferrer',
                  );
                }}
              >
                쿠플라이 팀소개
              </MenuButton>
            </MenuWrapper>
          </ContentsWrapper>
          <ContentsTypoWrapper order="2">
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
          </ContentsTypoWrapper>
        </BottomContentsWrapper>
      </FooterWrapper>
    </Background>
  );
}

// 추후 수정: 절대값 px 을 상대값 % 로 바꿔야 함.

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 1920px; //2560px;
  height: 262px; //(262/1248 = 20.1)
  background: #f9f9f9;
  position: bottom;
`;

const FooterWrapper = styled.div`
  display: flex;
  top: 0;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;

  background: #f9f9f9;
  padding: 19px 3.34vw;
  box-sizing: border-box;
  position: bottom;
`;

const ShortcutWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 40.844px;
  gap: 8px;
  margin-right: 8px;

  @media screen and (max-width: 600px) {
    width: 50%;
    justify-content: flex-start;
    min-width: 150px;
  }
`;

const ShortcutImage1 = styled.div`
  width: 31px;
  height: 40.844px;
  background-image: url('designImage/base/KuLogo1.png');
  background-size: cover;

  @media screen and (max-width: 900px) {
    width: 21px;
    height: 27px;
  }
`;

const ShortcutImage2 = styled.div`
  width: 31px;
  height: 40.844px;
  background-image: url('designImage/base/KuLogo2.png');
  background-size: cover;

  @media screen and (max-width: 900px) {
    width: 21px;
    height: 28px;
  }
`;

const ShortcutContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 8.97px;
  white-space: nowrap;

  & > button {
    display: flex;
    justify-content: flex-start;
    width: 40%;
    text-decoration: underline;
  }
  @media screen and (max-width: 900px) {
    div {
      font-size: 11px;
    }
    gap: 6px;
  }
  @media screen and (max-width: 600px) {
    width: 75%;
    gap: 4px;
  }
`;

const SiteMap = styled.div`
  width: '60%';
  max-width: '350px';

  @media screen and (max-width: 900px) {
    div {
      font-size: 11px;
    }
  }
`;

const QNAWrapper = styled.div`
  width: 40%;

  @media screen and (max-width: 900px) {
    div {
      font-size: 11px;
    }
  }
`;
// const ConnectLink = styled(Typography)<TypographyProps>`
//   font-size: ${(props) => sizeMapping['smallText'][0]};
//   font-weight: ${(props) => sizeMapping['smallText'][1]};
//   color: rgba(20, 20, 20, 0.7);
//   text-decoration-line: underline;
// `;

const LogoWrapper = styled.div`
  & img {
    width: 111px;
    object-fit: contain;
  }
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

  white-space: nowrap;

  @media screen and (max-width: 900px) {
    font-size: 11px;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > button {
    margin-right: 0.83vw;
  }

  @media screen and (max-width: 900px) {
    button {
      font-size: 11px;
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 600px) {
    justify-content: flex-start;

    & > button {
      margin-right: 20px;
    }
  }
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(20, 20, 20, 0.5);
`;

const ContentsWrapper = styled.div<{
  size?: string;
  justify?: string;
  minSize?: string;
  order?: string;
  maxSize?: string;
}>`
  display: flex; // 가로 정렬
  flex-direction: row;
  justify-content: ${(props) => (props.justify ? props.justify : 'space-around')};
  width: ${(props) => (props.size ? props.size : '50%')};
  min-width: ${(props) => (props.minSize ? props.minSize : '')};
  max-width: ${(props) => (props.maxSize ? props.maxSize : '')};

  @media screen and (max-width: 900px) {
    & > div {
      font-size: 11px;
    }
  }

  @media screen and (max-width: 600px) {
    order: ${(props) => (props.order ? props.order : '')};
    width: 100%;
  }
`;

const BottomContentsWrapper = styled.div`
  display: flex; // 가로 정렬
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 28px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    & > div:nth-child(2) {
      margin-bottom: 13px;

      button {
        font-size: 16px;
      }
    }
    & > div:nth-child(3) {
      margin-bottom: 8px;
      height: auto;

      & > div:last-child {
        display: none;
      }
    }
    & > div:nth-child(1) {
      margin-bottom: 16px;
    }
  }
`;

const ContentsTypoWrapper = styled.div<{ order?: string }>`
  display: flex; // 가로 정렬
  flex-direction: row;
  justify-content: flex-end;
  width: 55%;

  & > svg {
    margin: 0 4px;
  }

  @media screen and (max-width: 900px) {
    & > div {
      font-size: 11px;
    }
  }
  @media screen and (max-width: 600px) {
    order: ${(props) => (props.order ? props.order : '')};
    width: 100%;
    justify-content: flex-start;
  }
`;

const HorizentalWrapper = styled.div`
  width: 100%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 26.1px;
  margin-bottom: 46.35px;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin-top: 16px;
    margin-bottom: 18px;
    & > div:first-child {
      flex-direction: column;
    }
    & > div {
      width: 100%;
      justify-content: left;
    }

    & > div > div {
      margin-bottom: 16px;
      margin-right: 16px;
    }
  }
`;
