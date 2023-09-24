import React, { useState, useEffect } from 'react';

export interface TImerProps {
  setTime: number; // (분) 기준
  currentModal: number;
  sendNum: number;
  // setTimeLeft: () => void; // 타이머 초기화 목적
}

export default function Timer({ setTime, currentModal, sendNum }: TImerProps) {
  const MINUTES_IN_MS = setTime * 60 * 1000;
  const INTERVAL = 1000; // 1초
  const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');

  // 타이머 리셋
  useEffect(() => {
    if (currentModal === 0 || currentModal === 3) {
      setTimeLeft(MINUTES_IN_MS);
      console.log('타이머 초기화');
    }
  }, [currentModal, MINUTES_IN_MS, sendNum]);

  useEffect(() => {
    // setTimeLeft(MINUTES_IN_MS);
    const timer = setInterval(() => {
      // 1초씩 차감
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          console.log('타이머 종료');
          return 0;
        }
        return prevTime - INTERVAL;
      });
    }, INTERVAL); // INTERVAL

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, MINUTES_IN_MS]); // 남은 시간이 바뀔 때마다 useEffect 실행

  return (
    <div>
      {minutes}분 {second}초
    </div>
  );
}
