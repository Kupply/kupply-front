import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button07Props extends React.ComponentPropsWithoutRef<'button'> {
  title?: string;
  content?: string;
  state?: 'default' | 'pressed' | 'disabled';
}

function Button07(props: Button07Props) {
  const {
    title = '이중전공 진입생',
    content = '이중전공 진입에 성공했고, 다양한 정보를 공유하고 싶어요!',
    state = 'default',
    ...rest
  } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <TextWrapper>
        <Typography size="3.89vw" bold="700" style={{ lineHeight: '150%', opacity: '0.8' }}>
          {title}
        </Typography>
        <Typography size="3.33vw" style={{ lineHeight: '150%', opacity: '0.8', textAlign: 'initial' }}>
          {content}
        </Typography>
      </TextWrapper>
      <ImageWrapper src="../../../designImage/character/Chick2StandSide.png" />
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button07Props>`
  width: 91.11vw;
  height: auto;
  box-sizing: border-box;
  padding: 2.77vw 2.77vw 2.77vw 6.11vw;
  border: ${(props) => (props.state === 'pressed' ? '0.28vw solid #D85888' : 'none')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 2.78vw;
  box-shadow: 0px 0px 12px 0px rgba(216, 88, 146, 0.1);
  opacity: ${(props) => (props.state === 'disabled' ? '0.45' : '1')};
`;

const TextWrapper = styled.div`
  width: 55.56vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.94vw;
`;

const ImageWrapper = styled.img`
  width: 19.44vw;
  height: 19.44vw;
`;

export default Button07;
