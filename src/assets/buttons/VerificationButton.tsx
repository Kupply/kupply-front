import styled from 'styled-components';

import Typography from '../Typography';

export interface VerificationButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'hover' | 'active';
}

function VerificationButton(props: VerificationButtonProps) {
  const { children, state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography bold="500" color={state === 'active' ? 'var(--White, #FFF)' : '#D85888'}>
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<VerificationButtonProps>`
  width: 32.67vw;
  height: 68px;
  box-sizing: border-box;
  border: ${(props) => (props.state === 'default' ? '1px solid #D85888' : '0px')};
  padding: 25px 0.94vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  border-radius: 10px;
  background: ${(props) =>
    props.state === 'default'
      ? 'var(--White, #FFF)'
      : props.state === 'hover'
      ? 'var(--primary-10, rgba(216, 88, 136, 0.10))'
      : 'var(--PRIMARY, #D85888)'};
`;

export default VerificationButton;
