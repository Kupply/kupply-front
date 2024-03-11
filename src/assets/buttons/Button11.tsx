import styled from 'styled-components';

import Typography from '../Typography';

export interface Button11Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'hover' | 'pressed';
}

function Button11(props: Button11Props) {
  const { children = '인문계 캠퍼스만 보기', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography
        size="0.94vw"
        bold={state === 'pressed' ? '700' : '500'}
        color={state === 'default' ? '#B9B9B9' : '#D85888'}
        {...rest}
      >
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button11Props>`
  width: fit-content;
  height: auto;
  box-sizing: border-box;
  border: ${(props) => (props.state === 'default' ? '1px solid #EEE' : 'none')};
  padding: 0.83vw 2.08vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: ${(props) =>
    props.state === 'pressed' ? 'rgba(216,88,136,0.1)' : props.state === 'default' ? 'none' : 'rgba(255,255,255,0.1)'};
  box-shadow: ${(props) => (props.state === 'hover' ? '0px 0px 12px 0px rgba(216,88,136,0.1)' : 'none')};
`;

export default Button11;
