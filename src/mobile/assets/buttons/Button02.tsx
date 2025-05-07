import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button02Props extends React.ComponentPropsWithoutRef<'button'> {
  state?: 'default' | 'pressed' | 'disabled';
  width?: string;
  height?: string;
  fontSize?: string;
  fontBold?: string;
  imgSize?: string;
}

// 고파스 통합 후 Join 버튼 (w/ 고파스 로고)
function Button02(props: Button02Props) {
  const { children = '고파스 아이디로 로그인하기', 
    state = 'default', 
    width = '90.83vw',
    height = 'auto',
    fontSize = '3.61vw',
    fontBold = '700',
    imgSize='6.11vw', ...rest } = props;

  return (
    <MainWrapper state={state} width={width} height={height} {...rest}>
      <ImageWrapper
        imgSize={imgSize}
        src={
          '../../../designImage/ButtonKoreapas.svg'
          // state === 'pressed' ? '../../../designImage/ButtonIconPink.svg' : '../../../designImage/ButtonIconWhite.svg'
        }
      />
      <Typography
        size={fontSize}
        bold={fontBold}
        color={state === 'pressed' ? '#D85888' : '#FFF'}
        style={{ lineHeight: '120%' }}
      >
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button02Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
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

const ImageWrapper = styled.img<Button02Props>`
  width: ${(props) => props.imgSize};
  height: ${(props) => props.imgSize};
`;

export default Button02;
