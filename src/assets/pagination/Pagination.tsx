import React from 'react';
import styled from 'styled-components';

export interface PaginationButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isClicked: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<PaginationButtonProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 2.6vw;
  height: 2.6vw;
  border-radius: 0.26vw;
  padding: 0.9375vw;
  gap: 0.42vw;
  flex-shrink: 0;

  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;

  ${({ isClicked }) =>
    isClicked
      ? `
      background: #D85888;
      color: #FFF;
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

export default function PaginationButton(props: PaginationButtonProps) {
  const { children = '1', isClicked = true, ...rest } = props;
  return (
    <Button isClicked={isClicked} {...rest}>
      {children}
    </Button>
  );
}
