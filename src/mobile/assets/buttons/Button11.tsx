import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button11Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'pressed';
}

function Button11(props: Button11Props) {
  const { children = '이중전공 A to Z 바로가기', state = 'default', ...rest } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <Typography size="2.5vw" bold="500" color={state === 'default' ? '#FFF' : '#D85888'}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button11Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 2.22vw 5.56vw;
  border: 0.14vw solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.11vw;
  background: ${(props) => (props.state === 'pressed' ? 'rgba(255,255,255,0.3)' : 'none')};
  border-radius: 0.69vw;
`;

export default Button11;
