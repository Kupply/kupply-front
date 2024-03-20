import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../OldTypography';

export interface FAQboxProps extends React.ComponentPropsWithRef<'div'> {
  isOpen?: boolean;
  onToggle?: () => void;
  question?: string;
  answer?: { text: string; bold: string }[][];
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
  gap: 6px;
`;

function FAQbox(props: FAQboxProps) {
  const {
    isOpen = false,
    onToggle,
    question = '이중전공 지원에 반영되는 학점은 대내용 학점인가요, 대외용 학점인가요?',
    answer = [
      [
        {
          text: '이중전공 지원에는 직전학기까지 수강신청한 모든 과목의 총 평점평균인 대내용 학점(F를 포함한 전체성적)이 반영됩니다.',
          bold: '500',
        },
      ],
    ],
    ...rest
  } = props;

  const [showAnswer, setShowAnswer] = useState(false);
  const handleButtonClick = () => (showAnswer == true ? setShowAnswer(false) : setShowAnswer(true));

  return (
    <MainWrapper style={{ border: isOpen ? '1px solid #d85888' : '1px solid #b9b9b9' }} {...rest}>
      <TitleWrapper onClick={onToggle} style={{ cursor: 'pointer' }}>
        <Typography size="largeText" bold={isOpen ? '700' : '500'}>
          {question}
        </Typography>
        <img
          src="../../designImage/UAngleDown.svg"
          onClick={onToggle}
          style={{ cursor: 'pointer', transform: isOpen == true ? 'rotate(180deg)' : 'none' }}
        />
      </TitleWrapper>
      {isOpen == true ? (
        <ContentWrapper>
          {answer.map((lineAnswers, lineIndex) => (
            <div key={lineIndex}>
              {lineAnswers.map((answer, segmentIndex) => (
                <span key={segmentIndex} style={{ fontWeight: answer.bold, fontSize: '18px' }}>
                  {answer.text}
                </span>
              ))}
            </div>
          ))}
        </ContentWrapper>
      ) : (
        <></>
      )}
    </MainWrapper>
  );
}

export default FAQbox;
