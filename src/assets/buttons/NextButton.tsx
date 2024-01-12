import styled from 'styled-components';

import Typography from '../Typography';

export interface NextButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'large';
  state?: 'active' | 'unactive';
}

function NextButton(props: NextButtonProps) {
  const { children, size = 'small', state = 'active', ...rest } = props;
  return (
    <ButtonWrapper size={size} state={state} {...rest}>
      <Typography
        bold="700"
        color={
          size === 'small' && state === 'active'
            ? 'var(--PRIMARY, #D85888)'
            : size === 'small' && state === 'unactive'
            ? 'var(--DF_Grey-2, #DFDFDF)'
            : 'var(--White, #FFF)'
        }
      >
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<NextButtonProps>`
  width: ${(props) => (props.size === 'small' ? '8.13vw' : '23.65vw')};
  height: 68px;
  box-sizing: border-box;
  border: ${(props) =>
    props.size === 'small' && props.state === 'active'
      ? '1px solid #D85888'
      : props.size === 'small' && props.state === 'unactive'
      ? '1px solid var(--DF_Gray-2, #DFDFDF)'
      : '0px'};
  padding: 24px 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  border-radius: 10px;
  background: ${(props) =>
    props.size === 'small'
      ? 'var(--White, #FFF)'
      : props.state === 'active'
      ? 'rgba(216, 88, 136, 0.80)'
      : 'var(--DF_Gray-2, #DFDFDF)'};
  opacity: ${(props) =>
    props.size === 'small' && props.state === 'unactive'
      ? '0.45'
      : props.size === 'large' && props.state === 'unactive'
      ? '0.75'
      : '1'};
`;

export default NextButton;
