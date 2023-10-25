import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../Typography';

export interface FAQboxProps extends React.ComponentPropsWithRef<'div'> {
  question?: string;
  answer?: string;
}

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

function FAQbox(props: FAQboxProps) {
  const {
    question = '이중전공 지원에 반영되는 학점은 대내용 학점인가요, 대외용 학점인가요?',
    answer = '이중전공 지원에는 직전학기까지 수강신청한 모든 과목의 총 평점평균인 대내용 학점(F를 포함한 전체성적)이 반영됩니다.',
    ...rest
  } = props;

  const [showAnswer, setShowAnswer] = useState(false);
  const handleButtonClick = () => (showAnswer == true ? setShowAnswer(false) : setShowAnswer(true));

  return (
    <MainWrapper style={{ border: showAnswer == true ? '1px solid #d85888' : '1px solid #b9b9b9' }} {...rest}>
      <TitleWrapper>
        <Typography size="largeText" bold={showAnswer == true ? '700' : '500'}>
          {question}
        </Typography>
        <img
          src="../../design_image/u_angle-down.svg"
          onClick={handleButtonClick}
          style={{ cursor: 'pointer', transform: showAnswer == true ? 'rotate(180deg)' : 'none' }}
        />
      </TitleWrapper>
      {showAnswer == true ? (
        <ContentWrapper>
          <Typography size="mediumText">{answer}</Typography>
        </ContentWrapper>
      ) : (
        <></>
      )}
    </MainWrapper>
  );
}

export default FAQbox;
