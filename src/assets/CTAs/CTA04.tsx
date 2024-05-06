import styled from 'styled-components';

import Typography from '../Typography';

export interface CTA04Props extends React.ComponentPropsWithoutRef<'button'> {}

function CTA04(props: CTA04Props) {
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

const ButtonWrapper = styled.button<CTA04Props>`
  width: 32.71vw;
  gap: 0.42vw;
  height: auto;
  box-sizing: border-box;
  padding: 1.25vw 1.77vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.521vw; //10px;
  background: #d85888;
`;

const ImageWrapper = styled.img`
  width: 1.04vw;
  height: 1.04vw;
  flex-shrink: 0;
`;

export default CTA04;
