import styled from 'styled-components';

import Typography from '../../../assets/Typography';

function Banner() {
  return (
    <MainWrapper>
      <Typography size="3.33vw" bold="700" color="rgba(255,255,255,0.5)" style={{ lineHeight: '120%' }}>
        합격자료
      </Typography>
      <Typography
        size="5vw"
        bold="700"
        color="#FFF"
        style={{
          textAlign: 'center',
          textShadow: '0 0.42vw 1.69vw rgba(255,255,255,0.33)',
          lineHeight: '120%',
          margin: '1.67vw 0 0.83vw 0',
        }}
      >
        쿠플라이가 모아주는 고려대학교 인기 <br /> 이중전공 정보모음.zip
      </Typography>
      <Typography size="3.06vw" bold="500" color="#FFF" style={{ lineHeight: '120%' }}>
        모두의 성공적인 이중전공 진입 메이트 쿠플라이와 함께해요!
      </Typography>
      <CellPhone />
      <Notch />
      <PowerButton />
      <VolumeButton style={{ top: '58.54vw' }} />
      <VolumeButton style={{ top: '62.04vw' }} />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 76.11vw;
  padding-top: 11.11vw;
  background-image: url('../../../../designImage/mobile/onboarding/banner.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CellPhone = styled.div`
  width: 27.5vw;
  height: 42.78vw;
  box-sizing: border-box;
  border-top: 1.2vw solid #f3f4f8;
  border-left: 1.2vw solid #f3f4f8;
  border-right: 1.2vw solid #f3f4f8;
  background-color: #fff;
  border-radius: 3.6vw 3.6vw 0 0;
  box-shadow: -10vw 0 10vw rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 8.89vw;
  bottom: 0;
  z-index: 5;
`;

const Notch = styled.div`
  width: 13.75vw;
  height: 2.4vw;
  border-radius: 0 0 1.2vw 1.2vw;
  background-color: #f3f4f8;
  position: absolute;
  z-index: 10;
  left: 15.8vw;
  top: 45.54vw;
`;

const PowerButton = styled.div`
  width: 0.6vw;
  height: 3.8vw;
  border-radius: 0.4vw 0 0 0.4vw;
  background-color: #c6c8d4;
  position: absolute;
  left: 8.3vw;
  top: 52.54vw;
  z-index: 10;
`;

const VolumeButton = styled.div`
  width: 0.5vw;
  height: 3.3vw;
  border-radius: 0.4vw 0 0 0.4vw;
  background-color: #c6c8d4;
  position: absolute;
  left: 8.4vw;
  z-index: 10;
`;

export default Banner;
