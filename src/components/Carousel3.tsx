import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  height: 630px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background-size: cover;
  background-image: url("/design_image/carousel/carousel3.png");
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  margin-right: 1000px;
`;

const DirectButton = styled.button`
  width: 124px;
  height: 44px;
  display: inline-flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 0px 40px 0px rgba(216, 88, 136, 0.2);
  margin-bottom: 8px;
`;

const ButtonText = styled.text`
  color: #d85888;
  text-align: center;
  font-family: GmarketSans;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 20px; /* 100% */
  letter-spacing: -0.6px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Text = styled.text`
  color: #121212;
  text-align: right;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 300;
  line-height: 28px; /* 87.5% */
`;

const BoldText = styled.div`
  color: #121212;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;

function Carousel3() {
  return (
    <Wrapper>
      <ContentWrapper>
        <DirectButton>
          <ButtonText>마이보드</ButtonText>
        </DirectButton>
        <TextWrapper>
          <Text>아직 1지망과 2지망을 고민중 이신가요?</Text>
        </TextWrapper>
        <TextWrapper>
          <Text>지난 학기&nbsp;</Text>
          <BoldText>성적 커트라인 한눈에 비교</BoldText>
          <Text>하고 결정하세요.</Text>
        </TextWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Carousel3;
