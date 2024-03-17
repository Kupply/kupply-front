import React from 'react';
import styled from 'styled-components';

export interface InterestMajorProps extends React.ComponentPropsWithoutRef<'button'> {
  onView?: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<InterestMajorProps>`
  display: flex;
  width: 6.46vw;
  height: 2.4vw;
  justify-content: center;
  align-items: center;
  border-radius: 0.26vw;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.04vw;
  font-style: normal;
  line-height: 100%;

  ${({ onView }) =>
    onView
      ? `
      background: rgba(216, 88, 136, 0.1);
      color: #d85888;
      font-weight: 700;
      `
      : `
      background: none;
      color: #b9b9b9;
      font-weight: 500;
    `};

  &:hover {
    // While hovering
    // Change to: "Hover";
    // Animate: Dissolve;
    animation-timing-function: ease-in-out;
    animation-duration: 300ms;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 12px 0px rgba(216, 88, 136, 0.1);
    color: #d85888;
  }
`;

export default function InterestMajorButton(props: InterestMajorProps) {
  const { children = '1지망', onView = true, ...rest } = props;
  return (
    <Button onView={onView} {...rest}>
      {children}
    </Button>
  );
}
