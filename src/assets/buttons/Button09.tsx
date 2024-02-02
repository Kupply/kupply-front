import styled from 'styled-components';

import Typography from '../Typography';

export interface Button09Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'pressed' | 'disabled' | 'hover';
}

function Button09(props: Button09Props) {
  const { children = '1지망', state = 'pressed', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography bold={state === 'pressed' ? '700' : '500'} color={state === 'disabled' ? '#B9B9B9' : '#D85888'}>
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button09Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 16px 2.08vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${(props) =>
    props.state === 'pressed' ? 'rgba(216,88,136,0.1)' : props.state === 'disabled' ? 'none' : 'rgba(255,255,255,0.1)'};
  box-shadow: ${(props) => (props.state === 'hover' ? '0px 0px 12px 0px rgba(216,88,136,0.1)' : 'none')};
`;

export default Button09;
