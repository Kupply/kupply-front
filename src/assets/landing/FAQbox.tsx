import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../Typography';

const MainWrapper = styled.div`
  display: inline-flex;
  width: 1578px;
  padding: 44px;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.6);
`;

const TitleWrapper = styled.div`
  width: 1578px;
  display: flex;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  width: 1578px;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  gap: 6px;
`;

function FAQbox() {
  const [showAnswer, setShowAnswer] = useState(false);
  const handleButtonClick = () => (showAnswer == true ? setShowAnswer(false) : setShowAnswer(true));

  return (
    <MainWrapper style={{ border: showAnswer == true ? '1px solid #d85888' : '1px solid #b9b9b9' }}>
      <TitleWrapper>
        <Typography size="largeText" bold={showAnswer == true ? '700' : '500'}>
          이중전공 지원에 반영되는 학점은 대내용 학점인가요, 대외용 학점인가요?
        </Typography>
        <img src="../../design_image/u_angle-down.svg" onClick={handleButtonClick} />
      </TitleWrapper>
      {showAnswer == true ? (
        <ContentWrapper>
          <Typography size="mediumText">이중전공은 해당 학기에 아래 요건을 모두 만족하여야 지원 가능합니다.</Typography>
        </ContentWrapper>
      ) : (
        <></>
      )}
    </MainWrapper>
  );
}

export default FAQbox;
