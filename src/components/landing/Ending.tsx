import styled from 'styled-components';
import Typography from '../../assets/OldTypography';

const MainWrapper = styled.div`
  width: 100vw;
  height: 1400px;
  display: flex;
  align-items: center;
  gap: 17.56px;
  background-image: url('../../designImage/landing/LandingMockup2.png');
  background-repeat: no-repeat;
  background-size: 58.8vw 46.9vw;
  background-position: right center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17.56px;
  position: relative;
  z-index: 2;
`;

const TextWrapper = styled.div`
  display: flex;
`;

const GradationText = styled.span`
  background: linear-gradient(92deg, #d85888 0%, #ffafbd 100.57%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Pretendard;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: 62px;
`;

export default function Ending() {
  return (
    <MainWrapper>
      <ContentWrapper style={{ marginLeft: '6.56%' }}>
        <TextWrapper style={{ alignItems: 'center' }}>
          <Typography size="heading1" bold="400" color="rgba(20, 20, 20, 0.80)">
            당신이 찾는&nbsp;
          </Typography>
          <Typography size="heading1">이중전공에 대한 모든 정보,</Typography>
        </TextWrapper>
        <TextWrapper>
          <img
            src="../../designImage/landing/LandingMockup1.png"
            width="490px"
            height="120px"
            style={{ marginTop: '44px', marginLeft: '129px' }}
          />
        </TextWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
}
