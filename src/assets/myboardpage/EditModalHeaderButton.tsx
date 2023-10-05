import React from 'react';
import styled from 'styled-components';

export interface EditModalHeaderButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isClicked: boolean;
  children?: React.ReactNode;
}

const TextButton = styled.button<EditModalHeaderButtonProps>`
  display: flex;
  width: 164px;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  line-height: 100%;
  margin-bottom: 14px;

  ${({ isClicked }) =>
    isClicked
      ? `
        font-weight: 700;
        color: var(--Black2, #434343);
      `
      : `
        font-weight: 400;
        color: rgba(67, 67, 67, 0.60);
    `};
`;

export default function EditModalHeaderButton(props: EditModalHeaderButtonProps) {
  const { children = '나의 기본전공', isClicked = true, ...rest } = props; // default 설정
  return (
    <div style={{ position: 'relative' }}>
      <TextButton isClicked={isClicked} {...rest}>
        {children}
      </TextButton>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="814"
        height="134"
        viewBox="0 0 814 134"
        fill="none"
        style={{ position: 'relative', zIndex: '1' }}
      >
        <path
          d="M0.5 20C0.5 9.23045 9.23045 0.5 20 0.5H794C804.77 0.5 813.5 9.23045 813.5 20V133.5H0.5V20Z"
          fill="#FCFAFB"
          stroke="#DFDFDF"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="168"
        height="4"
        viewBox="0 0 168 4"
        fill="none"
        style={{ position: 'absolute', top: '0', left: '0' }}
      >
        <path d="M2 2H166" stroke="#D85888" stroke-width="4" stroke-linecap="round" />
      </svg>
    </div>
  );
}
