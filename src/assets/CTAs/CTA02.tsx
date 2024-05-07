import styled from 'styled-components';

import Typography from '../Typography';

export interface CTA02Props extends React.ComponentPropsWithoutRef<'button'> {
  size?: 'large' | 'small';
  state?: 'default' | 'hover' | 'disabled';
}

function CTA02(props: CTA02Props) {
  const { children = '나도 모의지원 하러가기', size = 'large', state = 'default', ...rest } = props;
  return (
    <ButtonWrapper size={size} state={state} {...rest}>
      <ImageWrapper
        src={state === 'disabled' ? '../../designImage/ButtonIconOpacity.svg' : '../../designImage/ButtonIconWhite.svg'}
      />
      <Typography
        size={size === 'large' ? '1.04vw' : '0.83vw'}
        bold="700"
        color={state === 'disabled' ? 'rgba(255,255,255,0.8)' : '#FFF'}
      >
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<CTA02Props>`
  width: ${(props) => (props.size === 'large' ? '23.33vw' : '14.69vw')};
  height: ${(props) => (props.size === 'large' ? '3.54vw' : '2.71vw')};
  box-sizing: border-box;
  padding: 0.83vw 1.67vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  border-radius: 0.52vw;
  background: ${(props) =>
    props.state === 'disabled'
      ? '#D3D3D3'
      : props.size === 'large' && props.state === 'hover'
      ? 'rgba(216,88,136,0.8)'
      : '#D85888'};
  box-shadow: ${(props) =>
    (props.size === 'large' && props.state === 'default') || (props.size === 'small' && props.state === 'hover')
      ? '0px 5px 11px 0px rgba(240,127,169,0.29), 0px 20px 20px 0px rgba(240, 127, 169, 0.26), 0px 45px 27px 0px rgba(240, 127, 169, 0.15), 0px 80px 32px 0px rgba(240,127,169,0.04), 0px 125px 35px 0px rgba(240,127, 169, 0.01)'
      : props.size === 'large' && props.state === 'hover'
      ? '0px 4px 12px 0px rgba(216,88,136,0.25)'
      : 'none'};
`;

const ImageWrapper = styled.img`
  width: 1.04vw;
  height: 1.04vw;
  flex-shrink: 0;
`;

export default CTA02;
