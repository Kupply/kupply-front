import styled from 'styled-components';
import Typography from '../../assets/Typography';

const MainWrapper = styled.div`
  width: 100vw;
  height: 2146px;
  display: flex;
  align-items: center;
  gap: 17.56px;
  background-image: url('../../design_image/Mockup 1.png');
  background-repeat: no-repeat;
  background-size: 1129px 900px;
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
          <GradationText>이중전공에 대한 모든 정보,</GradationText>
        </TextWrapper>
        <TextWrapper>
          <img src="../../design_image/Kupply_ver1.png" width="490px" height="120px" />
          <Typography size="heading1" bold="400" color="#141414" style={{ marginTop: '50px' }}>
            &nbsp;와 함께
          </Typography>
        </TextWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
}
