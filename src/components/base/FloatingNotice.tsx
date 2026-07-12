import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

type NoticePosition = {
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  offsetX: number;
  offsetY: number;
};

export default function FloatingNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<NoticePosition | null>(null);
  const [dragState, setDragState] = useState<DragState | null>(null);
  const noticeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('button') || target.closest('a') || !noticeRef.current) return;

    const noticeRect = noticeRef.current.getBoundingClientRect();

    setDragState({
      pointerId: event.pointerId,
      offsetX: event.clientX - noticeRect.left,
      offsetY: event.clientY - noticeRect.top,
    });
    setPosition({ x: noticeRect.left, y: noticeRect.top });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId || !noticeRef.current) return;

    const noticeRect = noticeRef.current.getBoundingClientRect();
    const nextX = event.clientX - dragState.offsetX;
    const nextY = event.clientY - dragState.offsetY;
    const maxX = window.innerWidth - noticeRect.width - 8;
    const maxY = window.innerHeight - noticeRect.height - 8;

    setPosition({
      x: Math.min(Math.max(8, nextX), maxX),
      y: Math.min(Math.max(8, nextY), maxY),
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState?.pointerId === event.pointerId) {
      setDragState(null);
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <Backdrop aria-hidden="true" />
      <Wrapper
        ref={noticeRef}
        role="status"
        aria-live="polite"
        $isDragging={Boolean(dragState)}
        style={
          position ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto', transform: 'none' } : undefined
        }
      >
        <NoticeHeader onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
          <Badge>NOTICE</Badge>
          <CloseButton type="button" onClick={handleClose} aria-label="공지 닫기">
            ×
          </CloseButton>
        </NoticeHeader>
        <Title>쿠플라이 운영 주체 변경 안내</Title>
        <Description>
          <Paragraph>안녕하세요, 쿠플라이 개발팀입니다.</Paragraph>
          <Paragraph>
            쿠플라이는 고려대학교 이중전공 지원 정보를 더 편리하게 확인할 수 있도록 DevKor 소속 개발자 5명과 디자이너
            3명이 함께 만들고 운영해 온 서비스입니다. 그동안 많은 학우분께서 서비스를 이용해 주시고 응원해 주신 덕분에
            지금까지 운영을 이어올 수 있었습니다.
          </Paragraph>
          <Paragraph>
            다만 운영진 대부분이 졸업 이후 취업 등으로 각자의 업무를 이어가게 되면서, 기존 개발팀이 지속적인 유지보수와
            데이터 관리를 안정적으로 수행하기 어려운 상황이 되었습니다. 이에 서비스를 종료하는 대신, 쿠플라이가 안정적으로
            계속 운영될 수 있도록 운영 주체를 고파스로 이전하기로 했습니다.
          </Paragraph>
          <Paragraph>
            쿠플라이는 기존에도 고파스 계정을 기반으로 로그인해 왔기 때문에 별도의 재가입은 필요하지 않습니다. 운영 주체가
            변경된 이후에도 주요 기능과 이용 방식은 현재와 동일하게 유지될 예정입니다.
          </Paragraph>
          <Paragraph>
            운영 이전 이후 서비스 이용 및 개인정보 관련 문의는 고파스 측 문의 채널을 통해 부탁드립니다.
          </Paragraph>
          <Paragraph>
            짧지 않은 시간 동안 쿠플라이를 믿고 함께해 주신 모든 분께 진심으로 감사드립니다.
          </Paragraph>
        </Description>
      </Wrapper>
    </>
  );
}

const floatIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1090;
  background: rgba(20, 16, 19, 0.55);
`;

const Wrapper = styled.aside<{ $isDragging: boolean }>`
  position: fixed;
  top: 4.792vw;
  left: 50%;
  z-index: 1100;
  width: 43vw;
  padding: 1.458vw 1.667vw 1.563vw;
  box-sizing: border-box;
  border: none;
  border-radius: 1.042vw;
  background: #fff;
  box-shadow: 0 0 1.563vw rgba(0, 0, 0, 0.1);
  color: #141414;
  font-family: Pretendard;
  animation: ${floatIn} 260ms ease-out;
  transition: box-shadow 160ms ease;
  transform: translateX(-50%);
  user-select: none;
  max-height: calc(100vh - 6.25vw);
  overflow-y: auto;
  overscroll-behavior: contain;

  ${({ $isDragging }) =>
    $isDragging &&
    `
      box-shadow: 0 0 1.875vw rgba(0, 0, 0, 0.16);
    `}

  @media screen and (max-width: 900px) {
    top: 84px;
    width: min(640px, calc(100vw - 32px));
    padding: 24px 28px 26px;
    border-radius: 20px;
  }

  @media screen and (max-width: 600px) {
    top: 44%;
    left: 50%;
    width: calc(100vw - 48px);
    max-width: 360px;
    max-height: calc(100dvh - 112px);
    padding: 18px 18px 20px;
    transform: translate(-50%, -50%);
  }
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625vw;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  @media screen and (max-width: 900px) {
    gap: 12px;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 1.25vw;
  padding: 0 0.521vw;
  border-radius: 999px;
  background: rgba(229, 124, 144, 0.12);
  color: #e57c90;
  font-size: 0.625vw;
  font-weight: 700;
  line-height: 1;

  @media screen and (max-width: 900px) {
    height: 24px;
    padding: 0 10px;
    font-size: 12px;
  }

  @media screen and (max-width: 600px) {
    height: 22px;
    padding: 0 9px;
    font-size: 11px;
  }
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.458vw;
  height: 1.458vw;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: rgba(20, 20, 20, 0.5);
  font-size: 1.25vw;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(20, 20, 20, 0.05);
    color: #141414;
  }

  @media screen and (max-width: 900px) {
    width: 28px;
    height: 28px;
    font-size: 24px;
  }

  @media screen and (max-width: 600px) {
    width: 26px;
    height: 26px;
    font-size: 22px;
  }
`;

const Title = styled.h2`
  margin: 0.938vw 0 0.833vw;
  color: #141414;
  font-size: 1.25vw;
  font-weight: 700;
  line-height: 1.35;

  @media screen and (max-width: 900px) {
    margin: 18px 0 16px;
    font-size: 22px;
  }

  @media screen and (max-width: 600px) {
    margin: 16px 0 14px;
    font-size: 19px;
    line-height: 1.4;
  }
`;

const Description = styled.div`
  margin: 0;
  color: rgba(20, 20, 20, 0.72);
  font-size: 0.781vw;
  font-weight: 500;
  line-height: 1.68;
  word-break: keep-all;
  text-wrap: pretty;

  @media screen and (max-width: 900px) {
    font-size: 14px;
    line-height: 1.68;
  }

  @media screen and (max-width: 600px) {
    font-size: 13px;
    line-height: 1.62;
  }
`;

const Paragraph = styled.p`
  margin: 0 0 0.521vw;

  @media screen and (max-width: 900px) {
    margin-bottom: 10px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 600px) {
    margin-bottom: 8px;
  }
`;
