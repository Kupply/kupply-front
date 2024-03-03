import styled from 'styled-components';

import Typography from '../Typography';

export interface Button03Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'pressed' | 'disabled';
}

function Button03(props: Button03Props) {
  const { children = '다음', state = 'pressed', ...rest } = props;
  return (
    <ButtonWrapper state={state} disabled = {state === 'disabled'} {...rest}>
      <Typography bold="700" color="#FFF">
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button03Props>`
  width: 23.65vw;
  height: auto;
  box-sizing: border-box;
  padding: 1.25vw 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.521vw; //10px;
  background: ${(props) => (props.state === 'pressed' ? 'rgba(216, 88, 136, 0.80)' : 'var(--DF_Grey-2, #DFDFDF)')};
  opacity: ${(props) => (props.state === 'disabled' ? '0.75' : '1')};
`;

export default Button03;
