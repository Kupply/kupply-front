import styled from 'styled-components';
import { useState } from 'react';
import Typography from '../Typography';
import React from 'react';

export interface FAQboxProps extends React.ComponentPropsWithRef<'div'> {
  isOpen?: boolean;
  onToggle?: () => void;
  question?: string;
  answer?: { text: string; bold: string }[][];
  isPinned?: boolean; // 필독 여부 prop
}

const MainWrapper = styled.div<{ $isPinned?: boolean }>`
  display: flex;
  width: 52.449vw;
  padding: 1.875vw 2.291vw;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3.125vw;
  flex-shrink: 0;
  border-radius: 0.5208vw;
  border: ${(props) =>
    props.$isPinned ? '1px solid rgba(223, 223, 223, 0.40)' : '1px solid rgba(223, 223, 223, 0.4)'};
  //background: ${(props) => (props.$isPinned ? 'rgba(228, 228, 228, 0.40)' : 'rgba(255, 255, 255, 0.6)')};
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

// 필독 배지 스타일 컴포넌트 추가
const PinnedBox = styled.div`
  display: flex;
  width: 5.26vw;
  height: 2.19vw;
  //padding: 0.78vw 1.25vw;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;

  border-radius: 52vw;
  background: #d85888;
`;

const PinnedText = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.83vw;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

// 타이틀과 배지를 감싸는 컨테이너
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625vw;
`;

function Button08_notice(props: FAQboxProps) {
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

  return (
    <MainWrapper
      $isPinned={isPinned} 
      style={{
        background: isOpen ? 'rgba(255, 255, 255, 0.6)' : (isPinned ? 'rgba(228, 228, 228, 0.40)' : 'rgba(255, 255, 255, 0.6)'),
        border: isOpen ? '1px solid #d85888' : '1px solid rgba(223, 223, 223, 0.4)',
        boxShadow: isOpen ? '0px 0px 0.625vw 0px rgba(216, 88, 136, 0.10)' : '',
      }}
      {...rest}
    >
      <TitleWrapper onClick={onToggle} style={{ cursor: 'pointer' }}>
        <TitleContainer>
          {isPinned && (
            <PinnedBox>
              <svg xmlns="http://www.w3.org/2000/svg" width="0.78vw" height="0.78vw" viewBox="0 0 15 16" fill="none">
                <path d="M2.5 14.25V9.875" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M2.5 9.875C2.5 9.875 3.125 9.25 5 9.25C6.875 9.25 8.125 10.5 10 10.5C11.875 10.5 12.5 9.875 12.5 9.875V2.375C12.5 2.375 11.875 3 10 3C8.125 3 6.875 1.75 5 1.75C3.125 1.75 2.5 2.375 2.5 2.375V9.875Z"
                  fill="white"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <PinnedText>필독</PinnedText>
            </PinnedBox>
          )}
          <Typography size="1.041vw" bold="500" style={{ lineHeight: '120%' }}>
            {question}
          </Typography>
        </TitleContainer>
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

export default Button08_notice;
