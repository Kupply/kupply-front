import styled from 'styled-components';

import Typography from '../Typography';

export interface CTA03Props extends React.ComponentPropsWithoutRef<'button'> {}

function CTA03(props: CTA03Props) {
  const { children = '쿠플라이 모의지원 완료하기', ...rest } = props;
  return (
    <ButtonWrapper {...rest}>
      <ImageWrapper src="../../designImage/ButtonIconWhite.svg" />
      <Typography size="1.25vw" bold="700" color="#FFF">
        {children}
      </Typography>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<CTA03Props>`
  width: 42.4vw;
  height: 124px;
  box-sizing: border-box;
  padding: 16px 1.67vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.42vw;
  border-radius: 0px 0px 20px 20px;
  background: #d85888;
`;

const ImageWrapper = styled.img`
  width: 1.04vw;
  height: 1.04vw;
  flex-shrink: 0;
`;

export default CTA03;
