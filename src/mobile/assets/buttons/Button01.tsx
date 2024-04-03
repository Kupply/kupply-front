import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button01Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'pressed' | 'disabled';
}

function Button01(props: Button01Props) {
  const { children = 'Join', state = 'default', ...rest } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <Typography
        size="3.61vw"
        bold="700"
        color={state === 'pressed' ? '#FFF' : '#D85888'}
        style={{ lineHeight: '120%' }}
      >
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button01Props>`
  width: 21.11vw;
  height: auto;
  box-sizing: border-box;
  padding: 3.61vw 4.44vw;
  border: ${(props) => (props.state === 'pressed' ? 'none' : '0.28vw solid #D85888')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.94vw;
  background: ${(props) => (props.state === 'pressed' ? '#D85888' : 'none')};
  opacity: ${(props) => (props.state === 'disabled' ? '0.45' : '1')};
  border-radius: 1.39vw;
`;

export default Button01;
