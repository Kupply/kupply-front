import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button12Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'pressed';
}

function Button12(props: Button12Props) {
  const { children = '사진 업로드', state = 'default', ...rest } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <Typography size="3.33vw" bold="500" color={state === 'default' ? '#434343' : '#D85888'}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button12Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 2.22vw 3.33vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.22vw;
  background: ${(props) => (props.state === 'pressed' ? 'rgba(216,88,136,0.1)' : 'rgba(223,223,223,0.5)')};
  border-radius: 999px;
`;

export default Button12;
