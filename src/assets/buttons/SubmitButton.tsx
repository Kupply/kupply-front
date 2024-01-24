import styled from 'styled-components';

import Typography from '../Typography';

export interface SubmitButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'active' | 'unactive';
}

function SubmitButton(props: SubmitButtonProps) {
  const { children, state = 'active', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography bold="700" color="var(--White, #FFF)">
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<SubmitButtonProps>`
  width: 32.71vw;
  height: 68px;
  box-sizing: border-box;
  padding: 24px 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  border-radius: 10px;
  background: ${(props) => (props.state === 'active' ? '#D85888' : 'rgba(223,223,223,0.75)')};
`;

export default SubmitButton;
