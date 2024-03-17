import styled from 'styled-components';

import Typography from '../../assets/Typography';

function Banner() {
  return (
    <MainWrapper>
      <Typography size="0.94vw" bold="700" color="rgba(255,255,255,0.5)" style={{ margin: '5.21vw 0 0.42vw 0' }}>
        합격자료
      </Typography>
      <div style={{ display: 'felx' }}>
        <Typography size="2.5vw" bold="700" color="#FFF" style={{ lineHeight: '121.875%' }}>
          쿠플라이가 모아주는 고려대학교 인기 이중전공 정보모음
        </Typography>
        <Typography size="2.5vw" bold="300" color="#FFF" style={{ lineHeight: '121.875%' }}>
          .zip
        </Typography>
      </div>
      <Typography size="1.04vw" bold="500" color="#FFF" style={{ margin: '0.89vw 0 0.42vw 0' }}>
        쿠플라이가 현재 서비스 제공 중인 이준전공 학과의 정보들이에요.
      </Typography>
      <Typography size="1.04vw" bold="500" color="#FFF">
        앞으로 더 추가될 학과들을 기대해 주세요!
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 52.66vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('../../designImage/onboarding/Banner.png');
  background-size: cover;
`;

export default Banner;
