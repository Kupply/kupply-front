import styled from 'styled-components';

import Typography from '../Typography';

export interface Button14Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
}

function Button14(props: Button14Props) {
  const { children = '합격자료', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography
        bold={state === 'hover' ? '600' : state === 'pressed' ? '700' : '500'}
        color={state === 'hover' ? '#D85888' : '#141414'}
        style={{ opacity: state === 'disabled' ? '0.6' : '1.0' }}
      >
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button14Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 8px 1.35vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background: ${(props) =>
    props.state === 'hover' ? 'rgba(216,88,136, 0.10)' : props.state === 'disabled' ? '#FFF' : 'none'};
`;

export default Button14;
