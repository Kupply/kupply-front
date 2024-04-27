import styled from 'styled-components';

import Typography from '../../assets/Typography';
import Button11 from '../../assets/buttons/Button11';

interface BannerProps {
  scrollToFAQ: () => void;
}

function Banner({ scrollToFAQ }: BannerProps) {
  return (
    <MainWrapper>
      <Typography size="1.67vw" bold="700" color="#FFF" style={{ lineHeight: '120%' }}>
        다른 지원자들은 어떤 정보를 궁금해하고 있을까?
      </Typography>
      <Button11 onClick={scrollToFAQ} style={{ color: '#FFF', zIndex: '10' }}>
        이중전공 A to Z 바로가기
      </Button11>
      <img
        width="11.5%"
        height="63%"
        src="../../designImage/landing/banner01.png"
        style={{ position: 'absolute', bottom: '18.5%', right: '20.16%' }}
      />
      <img
        width="11.5%"
        height="63%"
        src="../../designImage/landing/banner02.png"
        style={{ position: 'absolute', bottom: '18.5%', right: '11.68%' }}
      />
      <img
        width="11.5%"
        height="63%"
        src="../../designImage/landing/banner03.png"
        style={{ position: 'absolute', bottom: '18.5%', right: '3.19%' }}
      />
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: 53.75vw;
  height: 7.82vw;
  margin: 3.02vw 0 4.69vw 0;
  padding: 2.6vw 0 0 3.34vw;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  gap: 0.52vw;
  border-radius: 1.56vw;
  background: var(--Blue, #313b80);
  box-shadow: 0px 14.857px 37.143px 0px rgba(223, 223, 223, 0.4);
  backdrop-filter: blur(6.685710906982422px);
`;

export default Banner;
