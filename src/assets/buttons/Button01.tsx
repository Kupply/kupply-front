import styled from 'styled-components';

import Typography from '../Typography';

export interface Button01Props extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'medium' | 'large';
  variant?: 'solid' | 'outline';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
}

function Button01(props: Button01Props) {
  const { children = 'Join!', size = 'medium', variant = 'solid', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper size={size} variant={variant} state={state} {...rest}>
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

const ButtonWrapper = styled.button<Button01Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  border: ${(props) =>
    props.variant === 'outline' && (props.state === 'default' || props.state === 'disabled')
      ? '1px solid #D85888'
      : 'none'};
  padding: ${(props) => (props.size === 'medium' ? '0.833vw 1.67vw' : '1.25vw 1.77vw')};
  display: flex;
  justify-content: center;
  align-items: center;
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

export default Button01;
