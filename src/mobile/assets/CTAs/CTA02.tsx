import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface CTA02Props extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'small' | 'large';
  state?: 'default' | 'disabled';
}

function CTA02(props: CTA02Props) {
  const { children = '회원가입 하러가기', size = 'small', state = 'default', ...rest } = props;
  return (
    <MainWrapper size={size} state={state} {...rest}>
      <ImageWrapper
        src={
          size === 'large' ? '../../../designImage/ButtonIconWhite.svg' : '../../../designImage/ButtonIconWhite2.svg'
        }
      />
      <Typography size="3.61vw" bold="700" color="#FFF" style={{ lineHeight: '120%' }}>
        {children}
      </Typography>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<CTA02Props>`
  width: ${(props) => (props.size === 'small' ? '49.17vw' : '90.83vw')};
  height: auto;
  box-sizing: border-box;
  padding: 3.33vw 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.94vw;
  background: ${(props) => (props.state === 'default' ? '#D85888' : '#D3D3D3')};
  border-radius: 1.39vw;
  box-shadow: ${(props) =>
    props.size === 'large' && props.state === 'default'
      ? '0px 21.11vw 5.83vw 0px rgba(240, 127, 169, 0.01), 0px 13.61vw 5.56vw 0px rgba(240, 127, 169, 0.04), 0px 7.5vw 4.44vw 0px rgba(240, 127, 169, 0.15), 0px 3.33vw 3.33vw 0px rgba(240, 127, 169, 0.26), 0px 0.83vw 1.94vw 0px rgba(240, 127, 169, 0.29)'
      : props.size === 'small' && props.state === 'default'
      ? '0 1.39vw 3.06vw 0 rgba(240, 127, 169, 0.29)'
      : 'none'};
`;

const ImageWrapper = styled.img`
  width: 5vw;
  height: 5vw;
`;

export default CTA02;
