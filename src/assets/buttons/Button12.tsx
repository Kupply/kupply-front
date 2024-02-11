import styled from 'styled-components';

import Typography from '../Typography';

export interface Button12Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'hover';
}

function Button12(props: Button12Props) {
  const { children = '사진 업로드', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <Typography size="0.63vw" bold="500" color={state === 'default' ? '#434343' : '#D85888'}>
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button12Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 8px 0.63vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  background: ${(props) => (props.state === 'default' ? 'rgba(223,223,223,0.50)' : 'rgba(216,88,136,0.1)')};
`;

export default Button12;
