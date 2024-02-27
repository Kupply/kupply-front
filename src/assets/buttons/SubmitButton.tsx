import styled from 'styled-components';

import Typography from '../Typography';

export interface SubmitButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'active' | 'unactive';
  size?: string;
}

function SubmitButton(props: SubmitButtonProps) {
  const { children, state = 'active', size, ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography size={size} bold="700" color="var(--White, #FFF)">
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<SubmitButtonProps>`
  width: 100%;
  height: 68px;

  box-sizing: border-box;
  padding: 10px 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: ${(props) => (props.state === 'active' ? '#D85888' : 'rgba(223,223,223,0.75)')};
`;

export default SubmitButton;
