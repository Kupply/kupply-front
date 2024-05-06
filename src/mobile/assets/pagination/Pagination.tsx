import React from 'react';
import styled from 'styled-components';

export interface MobilePaginationButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isClicked: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<MobilePaginationButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 9.44vw; // 34px;
  height: 9.44vw; // 34px;
  border-radius: 1.39vw; // 5px
  padding: 5vw; // 18px
  gap: 2.22vw; // 8px;
  flex-shrink: 0;

  font-family: Pretendard;
  font-size: 3.89vw; // 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 142.857%;

  ${({ isClicked }) =>
    isClicked
      ? `
      background: #D85888;
      color: rgba(255, 255, 255, 1);
      box-shadow: 0 1.11vw 3.33vw 0 rgba(216,88,136,0.25)
      `
      : `
      background: #F5F5F5;
      color:  rgba(67, 67, 67, 0.80) ;
    `};

  ${({ isClicked }) =>
    !isClicked &&
    `
    &:hover {
      animation-timing-function: ease-in-out;
      animation-duration: 300ms;
      background: #d85888;
      color: #FFF;
      box-shadow: 0px 4px 12px 0px rgba(216, 88, 136, 0.25);
    }
  `};
`;

export default function MobilePaginationButton(props: MobilePaginationButtonProps) {
  const { children = '1', isClicked = true, ...rest } = props;
  return (
    <Button isClicked={isClicked} {...rest}>
      {children}
    </Button>
  );
}
