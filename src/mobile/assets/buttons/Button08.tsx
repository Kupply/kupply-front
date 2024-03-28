import styled from 'styled-components';
import { useState } from 'react';

import Typography from '../../../assets/Typography';

export interface Button08Props extends React.ComponentPropsWithoutRef<'button'> {
  question?: string;
  answer?: string[][];
}

function Button08(props: Button08Props) {
  const {
    question = '이중전공 지원에 반영되는 학점은 대내용 학점인가요, 대외용 학점인가요?',
    answer = [
      ['이중전공은 해당 학기에 아래 요건을 모두 만족하여야 지원 가능합니다.'],
      [
        '가. 제 1전공이 배정된 자',
        '나. 3학기 이상 등록자 (편입생은 본교 2학기 이상 등록자)',
        '다. 지원 당해 학기 재학생 (중도 휴학생을 포함한 휴학생은 지원 불가). 단, 당해학기 외국대학 교환학생 지원 불가.',
        '*당해 학기 재학생의 재학보유기간: 1학기 (3.1~7.31), 2학기 (9.1~익년 1.31)',
        '라. 이중(융합, 학생설계) 전공자 및 공학인증자(공과대)는 지원할 수 없음.',
        '1) 단, 이중(융합, 학생설계) 전공자(공학인증자 포함)가 재지원하고자 하는 경우, 반드시 2023.5.3(수)까지 기 합격부분이 포기처리 되어야 함.',
        '(신청방법: 포탈시스템-학적/졸업-학적사항-다중전공 포기신청, 공학인증-해당 학과)',
        '2) 이중(융합)전공 기합격자 및 공학인증 신청자의 재지원은 1회에 한함.',
        "3) 재지원하여 불합격한 경우, '04학번 이후 학생은 제1전공의 심화전공을 이수하여야 함.'",
      ],
    ],
  } = props;

  const [showAnswer, setShowAnswer] = useState(false);

  const handleButtonClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <MainWrapper showAnswer={showAnswer}>
      <QuestionBox>
        <Typography
          size="3.89vw"
          bold={showAnswer === false ? '500' : '700'}
          style={{ lineHeight: '120%', textAlign: 'initial' }}
        >
          {question}
        </Typography>
        <ImageWrapper showAnswer={showAnswer} onClick={handleButtonClick} src="../../../designImage/UAngleDown.svg" />
      </QuestionBox>
      {showAnswer === true && (
        <AnswerBox>
          {answer.map((paragraph, paragraphIndex) => (
            <div key={paragraphIndex}>
              {paragraph.map((sentence, sentenceIndex) => (
                <div key={sentenceIndex}>
                  <Typography size="3.89vw" bold="500" style={{ lineHeight: '150%' }}>
                    {sentence}
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

const MainWrapper = styled.div<{ showAnswer: boolean }>`
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
  background: ${(props) => (props.showAnswer === false ? 'rgba(255,255,255,0.4)' : '#FFF')};
  border-radius: 1.39vw;
`;

const QuestionBox = styled.div`
  width: 81.39vw;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5.83vw;
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

export default Button08;
