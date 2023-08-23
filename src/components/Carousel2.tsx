import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1920px;
  height: 630px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background-size: cover;
  background-image: url("/design_image/carousel/carousel2.png");
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  margin-right: 200px;
`;

const DirectButton = styled.button`
  width: 147px;
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

function Carousel2() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/previous");
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <DirectButton onClick={handleButtonClick}>
          <ButtonText>실시간 비교</ButtonText>
        </DirectButton>
        <TextWrapper>
          <Text>당신이 지원한 이중전공,</Text>
        </TextWrapper>
        <TextWrapper>
          <BoldText>실시간 지원현황</BoldText>
          <Text>에 대한 정보를 알려드릴게요.</Text>
        </TextWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Carousel2;
