import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button05Props extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'large';
  state?: 'default' | 'pressed';
}

function Button05(props: Button05Props) {
  const { children = '인증번호 다시 받기', size = 'small', state = 'default', ...rest } = props;
  return (
    <MainWrapper size={size} state={state} {...rest}>
      <Typography
        size="3.61vw"
        bold="500"
        color={state === 'pressed' ? '#FFF' : '#D85888'}
        style={{ lineHeight: '120%' }}
      >
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button05Props>`
  width: ${(props) => (props.size === 'small' ? '81.67vw' : '91.11vw')};
  height: auto;
  box-sizing: border-box;
  padding: 3.61vw 9.44vw;
  border: ${(props) => (props.state === 'pressed' ? 'none' : '0.28vw solid #D85888')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.22vw;
  background: ${(props) => (props.state === 'pressed' ? '#D85888' : 'none')};
  border-radius: 1.39vw;
`;

export default Button05;
