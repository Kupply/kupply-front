import styled from 'styled-components';

import Typography from '../Typography';

export interface Button05Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'hover' | 'pressed';
}

function Button05(props: Button05Props) {
  const { children = '인증번호 다시 받기', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography bold="500" color={state === 'pressed' ? 'var(--White, #FFF)' : '#D85888'}>
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button05Props>`
  width: 32.71vw;
  //height: auto;
  height: 3.542vw;
  box-sizing: border-box;
  border: ${(props) => (props.state === 'default' ? '1px solid #D85888' : '0px')};
  padding: 1.302vw 0.94vw;
  display: flex;
  justify-content: center;
  align-items: center;
  //border-radius: 10px;
  border-radius: 0.521vw;
  background: ${(props) =>
    props.state === 'default'
      ? 'var(--White, #FFF)'
      : props.state === 'hover'
      ? 'var(--primary-10, rgba(216, 88, 136, 0.10))'
      : 'var(--PRIMARY, #D85888)'};
`;

export default Button05;
