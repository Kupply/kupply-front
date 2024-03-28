import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button02Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'pressed' | 'disabled';
}

function Button02(props: Button02Props) {
  const { children = 'Join', state = 'default', ...rest } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <ImageWrapper
        src={
          state === 'pressed' ? '../../../designImage/ButtonIconPink.svg' : '../../../designImage/ButtonIconWhite.svg'
        }
      />
      <Typography
        size="3.61vw"
        bold="700"
        color={state === 'pressed' ? '#D85888' : '#FFF'}
        style={{ lineHeight: '120%' }}
      >
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button02Props>`
  width: 21.11vw;
  height: auto;
  box-sizing: border-box;
  padding: 3.61vw 4.44vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.94vw;
  background: ${(props) => (props.state === 'pressed' ? '#FBEEF3' : '#D85888')};
  opacity: ${(props) => (props.state === 'disabled' ? '0.45' : '1')};
  border-radius: 1.39vw;
`;

const ImageWrapper = styled.img`
  width: 2.78vw;
  height: 2.78vw;
`;

export default Button02;
