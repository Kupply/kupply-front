import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../../../assets/Typography';

export interface Button08Props extends React.ComponentPropsWithoutRef<'button'> {
  isOpen?: boolean;
  onToggle?: () => void;
  question?: string;
  answer?: { text: string; bold: string }[][]; // 타입 정의 수정
  isPinned?: boolean; // 필독 여부 prop
}

function Button08_notice(props: Button08Props) {
  const {
    isOpen = false,
    onToggle,
    question = '이중전공 지원 요건이 어떻게 되나요?',
    answer = [
      [{ text: '이중전공은 해당 학기에 아래 요건을 모두 만족하여야 지원 가능합니다.', bold: '500' }],
      [{ text: '', bold: '' }],
      [{ text: '가. 제 1전공이 배정된 자', bold: '700' }],
      // ... 기존 answer 내용
    ],
    isPinned = false, // 기본값은 false
    ...rest
  } = props;

  const [showAnswer, setShowAnswer] = useState(isOpen);

  const handleButtonClick = () => {
    setShowAnswer(!showAnswer);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <MainWrapper showAnswer={showAnswer} $isPinned={isPinned}>
      <QuestionBox>
        <QuestionTextWrapper>
          {isPinned && (
            <PinnedBox>
              <PinnedText>필독</PinnedText>
            </PinnedBox>
          )}
          <Typography
            size="3.89vw"
            bold={showAnswer === false ? '500' : '700'}
            style={{ lineHeight: '120%', textAlign: 'initial' }}
          >
            {question}
          </Typography>
        </QuestionTextWrapper>
        <ImageWrapper showAnswer={showAnswer} onClick={handleButtonClick} src="../../../designImage/UAngleDown.svg" />
      </QuestionBox>
      {showAnswer === true && (
        <AnswerBox>
          {answer.map((paragraph, paragraphIndex) => (
            <div key={paragraphIndex}>
              {paragraph.map((sentence, sentenceIndex) => (
                <div key={sentenceIndex}>
                  <Typography size="3.89vw" bold={sentence.bold} style={{ lineHeight: '150%' }}>
                    {sentence.text}
                  </Typography>
                </div>
              ))}
              {paragraphIndex !== answer.length - 1 && <ParagraphSpacing />}
            </div>
          ))}
        </AnswerBox>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{ showAnswer: boolean; $isPinned?: boolean }>`
  width: 91.11vw;
  height: auto;
  box-sizing: border-box;
  padding: ${(props) => (props.showAnswer === true ? '6.67vw 5vw 6.67vw 3.06vw' : '4.44vw 5vw 4.17vw 3.06vw')};
  border: ${(props) => (props.showAnswer === true ? '0.28vw solid #D85888' : '0.28vw solid #DFDFDF')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 13.89vw;
  background: ${(props) =>
    props.showAnswer === true ? '#FFF' : props.$isPinned ? '#F4F4F4' : 'rgba(255,255,255,0.6)'};
  border-radius: 1.39vw;
  border: ${(props) =>
    props.$isPinned ? '1px solid rgba(223, 223, 223, 0.40)' : '1px solid rgba(223, 223, 223, 0.4)'};
`;

const QuestionBox = styled.div`
  width: 81.39vw;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5.83vw;
`;

// 질문과 필독 배지를 함께 감싸는 컨테이너 추가
const QuestionTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw; // 필독 배지와 질문 사이의 간격
`;

const AnswerBox = styled.div`
  width: 81.39vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.img<{ showAnswer: boolean }>`
  width: 5vw;
  height: 5vw;
  cursor: pointer;
  transform: ${(props) => (props.showAnswer === true ? 'rotate(180deg)' : 'none')};
`;

const ParagraphSpacing = styled.div`
  width: auto;
  height: 6.22vw;
`;

// 필독 배지 스타일 컴포넌트
const PinnedBox = styled.div`
  display: flex;
  min-width: 8.85vw;
  padding: 1.11vw 1.67vw;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: rgba(216, 88, 136, 0.1);
`;

const PinnedText = styled.div`
  color: #d85888;
  text-align: center;
  /* mob_tiny_Medium */
  font-family: Pretendard;
  font-size: 3.06vw;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

export default Button08_notice;