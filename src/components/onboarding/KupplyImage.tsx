// 디자인 미완인듯

import styled from 'styled-components';
import Typography from '../../assets/Typography';

function KupplyImage() {
  return (
    <MainWrapper>
      <Typography size="4.17vw" bold="700" color="#000" style={{ lineHeight: '116.25%', marginTop: '10.21vw' }}>
        당신이 찾던 이중전공의 모든 정보,
      </Typography>
      <img
        width="68.13%"
        height="41.75%"
        src="../../designImage/onboarding/KupplyImage.png"
        style={{ position: 'absolute', bottom: '20.42%', right: '15.63%' }}
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 87.71vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
`;

export default KupplyImage;
