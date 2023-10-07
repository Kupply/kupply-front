import React from 'react';
import styled from 'styled-components';

export interface ImgCtrlButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
}

const Button = styled.button<ImgCtrlButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(223, 223, 223, 0.5);
  color: #434343;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;

  &:hover {
    // While hovering
    // Change to: "Hover";
    // Animate: Dissolve;
    animation-timing-function: ease-in-out;
    animation-duration: 300ms;
    background: var(--primary-10, rgba(216, 88, 136, 0.1));
    color: #d85888;
  }

  &:active {
    animation-timing-function: ease-in-out;
    animation-duration: 300ms;
    background: var(--primary-10, rgba(216, 88, 136, 0.1));
    color: #d85888;
  }
`;

export default function ImgCtrlButton(props: ImgCtrlButtonProps) {
  const { children = '사진 업로드', ...rest } = props;
  return <Button {...rest}>{children}</Button>;
}
