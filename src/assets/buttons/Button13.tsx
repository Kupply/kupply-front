import styled from 'styled-components';

import Typography from '../Typography';

export interface Button13Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'pressed';
}

function Button13(props: Button13Props) {
  const { children = '아니요, 이번이 첫 지원이에요.', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography size="0.94vw" bold="500" style={{ opacity: '0.8' }}>
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button13Props>`
  width: 15.47vw;
  height: auto;
  box-sizing: border-box;
  border: ${(props) => (props.state === 'pressed' ? '1px solid #D85888' : 'none')};
  padding: 25px 0.94vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  box-shadow: ${(props) => (props.state === 'default' ? '0px 0px 12px 0px rgba(216,88,136,0.1)' : 'none')};
`;

export default Button13;
