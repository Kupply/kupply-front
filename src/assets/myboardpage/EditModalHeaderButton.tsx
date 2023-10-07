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
  const { children = '나의 기본정보', isClicked = true, ...rest } = props; // default 설정
  return (
    <div style={{ position: 'relative' }}>
      <TextButton isClicked={isClicked} {...rest}>
        {children}
      </TextButton>
      {isClicked && (
        <svg xmlns="http://www.w3.org/2000/svg" width="168" height="4" viewBox="0 0 168 4" fill="none">
          <path d="M2 2H166" stroke="#D85888" stroke-width="4" stroke-linecap="round" />
        </svg>
      )}
    </div>
  );
}
