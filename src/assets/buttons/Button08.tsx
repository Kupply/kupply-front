import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../Typography';
import React from 'react';

export interface FAQboxProps extends React.ComponentPropsWithRef<'div'> {
  isOpen?: boolean;
  onToggle?: () => void;
  question?: string;
  answer?: { text: string; bold: string }[][];
}

const MainWrapper = styled.div`
  display: flex;
  width: 52.449vw;
  padding: 1.875vw 2.291vw;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3.125vw;
  flex-shrink: 0;
  border-radius: 0.5208vw;
  background: rgba(255, 255, 255, 0.6);
`;

const TitleWrapper = styled.div`
  width: 52.449vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 52.449vw;
  display: flex;
  flex-direction: column;
`;

function Button08(props: FAQboxProps) {
  const {
    isOpen = false,
    onToggle,
    question = '이중전공 지원 요건이 어떻게 되나요?',
    answer = [
      [{ text: '이중전공은 해당 학기에 아래 요건을 모두 만족하여야 지원 가능합니다.', bold: '500' }],
      [{ text: '', bold: '' }],
      [{ text: '가. 제 1전공이 배정된 자', bold: '700' }],
      [{ text: '', bold: '' }],
      [{ text: '나. 3학기 이상 등록자 (편입생은 본교 2학기 이상 등록자)', bold: '700' }],
      [{ text: '', bold: '' }],
      [
        { text: '다. 지원 당해 학기 재학생 (중도 휴학생을 포함한 휴학생은 지원 불가).', bold: '700' },
        { text: '단, 당해학기 외국대학 교환학생 지원 불가.', bold: '500' },
      ],
      [{ text: '*당해 학기 재학생의 재학보유기간: 1학기(3.1~7.31), 2학기(9.1~익년.1.31)', bold: '500' }],
      [{ text: '', bold: '' }],
      [{ text: '라. 이중(융합, 학생설계)전공자 및 공학인증자(공과대)는 지원할 수 없음.', bold: '700' }],
      [
        { text: '1) 단, 이중(융합, 학생설계)전공자(공학인증자 포함)가 재지원하고자 하는 경우, 반드시 ', bold: '500' },
        { text: '2023. 5. 3.(수)', bold: '700' },
        { text: '까지 기 합격부분이 ', bold: '500' },
        { text: '포기처리 ', bold: '700' },
        { text: '되어야 함.', bold: '500' },
      ],
      [{ text: '(신청방법 : 포탈시스템-학적/졸업-학적사항-다중전공포기신청, 공학인증-해당학과)', bold: '500' }],
      [{ text: '2) 이중(융합)전공 기합격자 및 공학인증 신청자의 재지원은 1회에 한함.', bold: '500' }],
      [{ text: "3) 재지원하여 불합격한 경우, '04학번 이후 학생은 제1전공의 심화전공을 이수하여야 함.", bold: '500' }],
    ],
    ...rest
  } = props;

  const [showAnswer, setShowAnswer] = useState(false);
  const handleButtonClick = () => (showAnswer == true ? setShowAnswer(false) : setShowAnswer(true));

  return (
    <MainWrapper
      style={{
        border: isOpen ? '1px solid #d85888' : '1px solid rgba(223, 223, 223, 0.4)',
        boxShadow: isOpen ? '0px 0px 0.625vw 0px rgba(216, 88, 136, 0.10)' : '',
      }}
      {...rest}
    >
      <TitleWrapper onClick={onToggle} style={{ cursor: 'pointer' }}>
        <Typography size="1.041vw" bold="500" style={{ lineHeight: '120%' }}>
          {question}
        </Typography>
        <img
          src="../../designImage/UAngleDown.svg"
          onClick={onToggle}
          style={{
            cursor: 'pointer',
            transform: isOpen == true ? 'rotate(180deg)' : 'none',
            width: '1.771vw',
            height: '1.771vw',
          }}
        />
      </TitleWrapper>
      {isOpen == true && (
        <ContentWrapper>
          {answer.map((lineAnswers, lineIndex) => (
            <div key={lineIndex}>
              {lineAnswers.map((answer, segmentIndex) =>
                answer.text !== '' ? (
                  <Typography
                    key={segmentIndex}
                    size="0.9375vw"
                    bold={answer.bold}
                    style={{
                      lineHeight: '1.458vw',
                    }}
                  >
                    {answer.text}
                  </Typography>
                ) : (
                  <div key={segmentIndex} style={{ height: '1.458vw' }} />
                ),
              )}
            </div>
          ))}
        </ContentWrapper>
      )}
    </MainWrapper>
  );
}

export default Button08;
