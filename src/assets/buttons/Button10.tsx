import styled from 'styled-components';

import Typography from '../Typography';

export interface Button10Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'hover';
}

function Button10(props: Button10Props) {
  const { children = '더 다양한 합격 자료가 궁금하다면?', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <ImageWrapper src="../../designImage/ArrowUpRight.svg" />
      <Typography bold="700" color="#FFF">
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button10Props>`
  width: auto;
  height: auto;
  box-sizing: border-box;
  padding: 24px 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  border-radius: 10px;
  background: #d85888;
  box-shadow: ${(props) => (props.state === 'hover' ? '0px 4px 12px 0px rgba(216,88,136,0.25)' : 'none')};
`;

const ImageWrapper = styled.img`
  width: 1.04vw;
  height: 1.04vw;
  flex-shrink: 0;
`;

export default Button10;
