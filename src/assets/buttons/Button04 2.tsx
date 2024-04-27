import styled from 'styled-components';

import Typography from '../Typography';

export interface Button04Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'pressed' | 'disabled';
}

function Button04(props: Button04Props) {
  const { children = '이전', state = 'pressed', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography bold="700" color={state === 'pressed' ? '#D85888' : '#DFDFDF'}>
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button04Props>`
  width: 8.13vw;
  height: auto;
  box-sizing: border-box;
  border: ${(props) => (props.state === 'pressed' ? '1px solid #D85888' : '1px solid #DFDFDF')};
  padding: 1.25vw 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.521vw; //10px;
  background: #fff;
  opacity: ${(props) => (props.state === 'disabled' ? '0.45' : '1')};
`;

export default Button04;
