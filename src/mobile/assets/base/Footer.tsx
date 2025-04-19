// 이용약관 버튼 동작 조정 필요함

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Typography from '../../../assets/Typography';

function MobileFooter() {
  const navigate = useNavigate();

  const handleLinkClick1 = () => {
    window.location.href = 'https://portal.korea.ac.kr/front/Intro.kpd';
  };
  const handleLinkClick2 = () => {
    window.location.href = 'https://registrar.korea.ac.kr/eduinfo/info/major_double.do';
  };

  const handleButtonClick1 = () => {
    navigate('/settings');
  };
  const handleButtonClick2 = () => {
    window.location.href = 'https://forms.gle/7agPn1bgCjHumVER9';
  };
  const handleButtonClick3 = () => {
    window.location.href = 'https://candle-mulberry-ea5.notion.site/c78d3f50dc014f34a9dacfe2acea8a10?pvs=4';
  };

  return (
    <MainWrapper>
      <Logo src="../../../../designImage/kupply/KupplyVer1.svg" onClick={() => navigate('/')} />
      <Typography size="2.78vw" bold="600" style={{ lineHeight: '140%' }}>
        사이트맵
      </Typography>
      <HorizontalWrapper style={{ margin: '1.11vw 0 4.72vw 0', gap: '5.56vw' }}>
        <TextButton1 onClick={() => navigate('/landing')}>실시간 지원 현황</TextButton1>
        <TextButton1 onClick={() => navigate('/myboard')}>마이보드</TextButton1>
        <TextButton1 onClick={() => navigate('/archive')}>합격자료</TextButton1>
        <TextButton1 onClick={() => navigate('/settings')}>환경설정</TextButton1>
      </HorizontalWrapper>
      <Typography size="2.78vw" bold="600" style={{ lineHeight: '140%' }}>
        문의
      </Typography>
      <Typography size="2.78vw" color="rgba(20,20,20,0.7)" style={{ lineHeight: '140%', margin: '1.11vw 0 6.11vw 0' }}>
        kupply.devkor@gmail.com
      </Typography>
      <HorizontalWrapper style={{ gap: '5.22vw' }}>
        <HorizontalWrapper style={{ gap: '1.32vw' }}>
          <KoreaImage1 src="../../../../designImage/base/KuLogo1.png" />
          <VerticalWrapper>
            <Typography size="2.32vw" bold="600">
              고려대학교 포탈
            </Typography>
            <Typography
              size="2.32vw"
              color="rgba(20,20,20,0.7)"
              style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
              onClick={handleLinkClick1}
            >
              바로가기
            </Typography>
          </VerticalWrapper>
        </HorizontalWrapper>
        <HorizontalWrapper style={{ gap: '1.32vw' }}>
          <KoreaImage2 src="../../../../designImage/base/KuLogo2.png" />
          <VerticalWrapper>
            <Typography size="2.32vw" bold="600">
              고려대학교 교육정보
            </Typography>
            <Typography
              size="2.32vw"
              color="rgba(20,20,20,0.7)"
              style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
              onClick={handleLinkClick2}
            >
              바로가기
            </Typography>
          </VerticalWrapper>
        </HorizontalWrapper>
      </HorizontalWrapper>
      <HorizontalWrapper style={{ margin: '9.08vw 0 3.61vw 0', gap: '3.89vw' }}>
        <TextButton2 onClick={handleButtonClick1}>이용약관</TextButton2>
        <TextButton2 onClick={handleButtonClick2}>버그리포트</TextButton2>
        <TextButton2 onClick={handleButtonClick3}>쿠플라이 팀소개</TextButton2>
      </HorizontalWrapper>
      <Typography size="2.22vw" color="#A8a8a8" style={{ marginBottom: '0.56vw' }}>
        고려대학교 소프트웨어 개발학회 DevKor&nbsp;&nbsp;&nbsp;&nbsp;서울특별시 성북구 안암로 145 고려대학교
      </Typography>
      <Typography size="2.22vw" color="#A8a8a8">
        copyright ⓒ 2023 kupply. all rights reserved.
      </Typography>
      <HorizontalLine />
      <VerticalLine />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 95vw;
  height: 73.89vw;
  padding: 4.72vw 0 0 5vw;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  position: relative;
`;

const HorizontalWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
`;

const VerticalWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.48vw;
`;

const HorizontalLine = styled.div`
  width: 100vw;
  height: 0.17vw;
  background-color: #b9b9b9;
  position: absolute;
  left: 0;
  top: 54.72vw;
`;

const VerticalLine = styled.div`
  width: 0.14vw;
  height: 2.22vw;
  background-color: #a8a8a8;
  position: absolute;
  left: 41.9vw;
  top: 66.22vw;
`;

const Logo = styled.img`
  width: 20.56vw;
  height: 4.72vw;
  margin-bottom: 4.72vw;
  cursor: pointer;
`;

const TextButton1 = styled.button`
  width: auto;
  height: auto;
  color: rgba(20, 20, 20, 0.7);
  font-family: Pretendard;
  font-size: 2.78vw;
  font-weight: 400;
  line-height: 140%;
`;

const TextButton2 = styled.button`
  width: auto;
  height: auto;
  color: #a8a8a8;
  font-family: Pretendard;
  font-size: 2.78vw;
  font-weight: 600;
  line-height: 140%;
`;

const KoreaImage1 = styled.img`
  width: 5.13vw;
  height: 6.76vw;
`;

const KoreaImage2 = styled.img`
  width: 4.8vw;
  height: 6.42vw;
`;

export default MobileFooter;
