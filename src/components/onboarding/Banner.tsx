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
      <ImageWrapper>
        <div style={{ display: 'flex', gap: '2.11vw' }}>
          <SubImage />
          <SubImage />
          <SubImage />
        </div>
        <div style={{ display: 'flex', gap: '2.11vw' }}>
          <SubImage />
          <SubImage />
          <SubImage />
        </div>
      </ImageWrapper>
      <CellPhone></CellPhone>
      <Notch src="../../designImage/onboarding/Notch.png" />
      <MainImage />
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
  position: relative;
`;

const CellPhone = styled.div`
  width: 18.75vw;
  height: 34.09vw;
  border-top: 0.83vw solid #f3f4f8;
  border-left: 0.83vw solid #f3f4f8;
  border-right: 0.83vw solid #f3f4f8;
  background-color: #fff;
  border-radius: 2.72vw 2.72vw 0 0;
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 40.64vw;
`;

const Notch = styled.img`
  width: 8.1vw;
  height: 1.58vw;
  position: absolute;
  top: 18.5vw;
  left: 46.84vw;
  z-index: 10;
`;

const ImageWrapper = styled.div`
  width: 102.08vw;
  height: 16.88vw;
  display: flex;
  justify-content: space-between;
  margin-top: 14.36vw;
`;

const MainImage = styled.div`
  width: 15.08vw;
  height: 19.42vw;
  border-radius: 0.42vw;
  background-color: aliceblue;
  position: absolute;
  top: 25.82vw;
  left: 43.17vw;
  z-index: 10;
`;

const SubImage = styled.div`
  width: 13.13vw;
  height: 16.88vw;
  border-radius: 0.36vw;
  background-color: aliceblue;
`;

export default Banner;
