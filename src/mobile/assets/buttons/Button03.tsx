import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button03Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'disabled';
}

function Button03(props: Button03Props) {
  const { children = '다음', state = 'default', ...rest } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <Typography size="3.61vw" bold="700" color="#FFF" style={{ lineHeight: '120%' }}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button03Props>`
  width: 67.78vw;
  height: auto;
  box-sizing: border-box;
  padding: 3.61vw 4.44vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.22vw;
  background: ${(props) => (props.state === 'default' ? '#E079A0' : '#DFDFDF')};
  opacity: ${(props) => (props.state === 'disabled' ? '0.75' : '1')};
  border-radius: 1.39vw;
`;

export default Button03;
