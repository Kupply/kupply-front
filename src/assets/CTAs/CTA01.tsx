import styled from 'styled-components';

import Typography from '../Typography';

export interface CTA01Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'disabled';
}

function CTA01(props: CTA01Props) {
  const { children = '로그인하고 쿠플라이 이용하기', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography bold="700" color="#FFF">
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<CTA01Props>`
  width: 32.71vw;
  height: auto;
  box-sizing: border-box;
  padding: 1.25vw 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.521vw; //10px;
  background: ${(props) => (props.state === 'default' ? '#D85888' : 'rgba(223,223,223,0.75)')};
`;

export default CTA01;
