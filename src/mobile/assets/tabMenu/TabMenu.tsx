import React from 'react';
import styled from 'styled-components';

export interface MobileTabMenuButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isClicked: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<MobileTabMenuButtonProps>`
  display: flex;
  width: 25vw; // 90px
  height: 10vw; // 36px
  flex-shrink: 0;

  /* mob_detail_Medium */
  font-family: Pretendard;
  font-size: 3.89vw; // 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 16.8px */
  border-radius: 0.51vw; // 1.831px;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  text-align: center;

  ${({ isClicked }) =>
    isClicked
      ? `
      background: #d85888;
      box-shadow: 0px 1.465px 14.65px 2.198px rgba(216, 88, 136, 0.25);
      color: #FFFFFF;
      `
      : `
      background: none;
      color: rgba(20, 20, 20, 0.8);
    `};
`;

export default function MobileTabMenuButton(props: MobileTabMenuButtonProps) {
  const { children = '공통', isClicked = true, ...rest } = props;
  return (
    <Button isClicked={isClicked} {...rest}>
      {children}
    </Button>
  );
}
