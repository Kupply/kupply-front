import React from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

export interface InterestMajorProps extends React.ComponentPropsWithoutRef<'button'> {
  active?: boolean;
  children?: React.ReactNode;
}

const Button = styled.button<InterestMajorProps>`
  display: flex;
  width: 124px;
  height: 46px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 5px;
  background: rgba(216, 88, 136, 0.23); // deafult, active
  /*
  &:disabled {
    opacity: 0.5;
    background: linear-gradient(93deg, #d85888 -24.37%, #f5bdbd 120.85%, rgba(253, 242, 242, 0.3) 161.07%);
  }
  */
`;

function InterestMajorButton(props: InterestMajorProps) {
  const { children = '1지망', active = false, ...rest } = props;
  return (
    <Button active={active} disabled={!active} {...rest}>
      <Typography size="bodyText" color="#D85888">
        {children}
      </Typography>
    </Button>
  );
}

export default InterestMajorButton;
