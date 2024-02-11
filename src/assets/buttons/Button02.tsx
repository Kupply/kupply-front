import styled from 'styled-components';

import Typography from '../Typography';

export interface Button02Props extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'solid' | 'outline';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
}

function Button02(props: Button02Props) {
  const { children = 'Join!', variant = 'solid', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper variant={variant} state={state} {...rest}>
      <ImageWrapper
        src={
          (variant === 'solid' && state === 'pressed') || (variant === 'outline' && state !== 'pressed')
            ? '../../designImage/ButtonIconPink.svg'
            : '../../designImage/ButtonIconWhite.svg'
        }
      />
      <Typography
        bold="500"
        color={
          (variant === 'solid' && state === 'pressed') || (variant === 'outline' && state !== 'pressed')
            ? '#D85888'
            : '#FFF'
        }
      >
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button02Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  border: ${(props) =>
    props.variant === 'outline' && (props.state === 'default' || props.state === 'disabled')
      ? '1px solid #D85888'
      : 'none'};
  padding: 24px 1.77vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.42vw;
  border-radius: 10px;
  background: ${(props) =>
    props.variant === 'solid' && props.state === 'hover'
      ? 'rgba(216, 88, 136, 0.75)'
      : (props.variant === 'solid' && props.state === 'pressed') ||
        (props.variant === 'outline' && props.state === 'hover')
      ? 'rgba(216, 88, 136, 0.10)'
      : props.variant === 'outline' && (props.state === 'default' || props.state === 'disabled')
      ? 'none'
      : '#D85888'};
  opacity: ${(props) => (props.state === 'disabled' ? '0.45' : '1')};
  box-shadow: ${(props) =>
    props.variant === 'solid' && props.state === 'hover' ? '0px 4px 12px 0px rgba(216, 88, 136, 0.25)' : 'none'};
`;

const ImageWrapper = styled.img`
  width: 1.04vw;
  height: 1.04vw;
`;

export default Button02;
