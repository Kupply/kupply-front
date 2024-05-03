import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Typography from '../../../assets/Typography';
import Banner04 from '../../assets/banners/Banner04';

function Join2() {
  const [isLogined, setIsLogined] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.isLogin === 'true') setIsLogined(true);
    else setIsLogined(false);
  }, []);

  return (
    <MainWrapper>
      <ImageWrapper isLogined={isLogined}>
        <Typography size="5.33vw">당신이 찾는 &nbsp;</Typography>
        <Typography size="5.33vw" bold="700">
          이중전공에 대한 모든 정보,
        </Typography>
      </ImageWrapper>
      {isLogined ? <Banner04 type={3} /> : <Banner04 type={2} />}
      <Logo src="../../../../designImage/landing/LandingMockup1.png" />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 100vw;
  height: 230vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  position: relative;
`;

const ImageWrapper = styled.div<{ isLogined?: boolean }>`
  width: 100vw;
  height: 122.77vw;
  margin: ${({ isLogined }) => (isLogined ? '47.22vw 0 6.11vw 0' : '47.22vw 0 14.44vw 0')};
  padding-top: 15.56vw;
  display: flex;
  justify-content: center;
  background-image: url('../../../../designImage/mobile/onboarding/kupply.png');
  background-size: cover;
`;

const Logo = styled.img`
  width: 38vw;
  height: 10vw;
  position: absolute;
  top: 72vw;
  left: 31vw;
`;

export default Join2;
