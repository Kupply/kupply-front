// 디자인 미완인듯

import styled from 'styled-components';
import Typography from '../../assets/Typography';

function KupplyImage() {
  return (
    <MainWrapper>
      <div style={{ display: 'flex', marginTop: '26.82vw' }}>
        <Typography size="4.17vw" color="rgba(20,20,20,0.8)">
          당신이 찾는&nbsp;
        </Typography>
        <Typography size="4.17vw" bold="700">
          이중전공에 대한 모든 정보,
        </Typography>
      </div>
      <img
        src="../../designImage/landing/LandingMockup1.png"
        width="29.33%"
        height="5.37%"
        style={{ marginTop: '3.13vw' }}
      />
      <img
        width="100%"
        height="100%"
        src="../../../../designImage/mobile/onboarding/kupply.png"
        style={{ position: 'absolute', bottom: '0', right: '0' }}
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 138.19vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

const Logo = styled.div`
  color: #fff;
`;

export default KupplyImage;
