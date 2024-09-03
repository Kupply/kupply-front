import styled from 'styled-components';

import Typography from '../../../assets/Typography';

export interface Button06Props extends React.ComponentPropsWithoutRef<'button'> {
  title?: string;
  content?: string;
  state?: 'default' | 'clicked' | 'inactive';
}

function Button06(props: Button06Props) {
  const {
    title = '이중전공 도전생',
    content = '이중전공 지원 전, 이중전공에 대한 정보가 궁금해요.',
    state = 'default',
    ...rest
  } = props;
  return (
    <MainWrapper state={state} {...rest}>
      <TextWrapper>
        <Typography size="3.89vw" bold="700" style={{ lineHeight: '150%', opacity: '0.8' }}>
          {title}
        </Typography>
        <Typography
          size="3.33vw"
          style={{ lineHeight: '150%', opacity: '0.8', overflowWrap: 'break-word', textAlign: 'initial' }}
        >
          {content}
        </Typography>
      </TextWrapper>
      <ImageWrapper>
        <img src="../../../designImage/character/Chick1StandSide.png" alt="Chick1Stand" />
      </ImageWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.button<Button06Props>`
  width: 91.11vw; // This was already set to vw
  height: 25vw; // Converted from 90px
  box-sizing: border-box;

  padding: 2.77vw 2.77vw 2.77vw 6.11vw; // This is already in vw
  border: ${(props) => (props.state === 'clicked' ? '0.28vw solid #D85888' : 'none')};
  display: flex;
  gap: 4.722vw; // Converted from 17px
  align-items: center;
  background: #fff;
  border-radius: 2.778vw; // Converted from 10px
  box-shadow: 0px 0px 3.33vw 0px rgba(216, 88, 146, 0.1);
  opacity: ${(props) => (props.state === 'inactive' ? '0.45' : '1')};
`;

const TextWrapper = styled.div`
  width: 61.667vw; // Converted from 222px
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 5vw; // Converted from 18px
`;

const ImageWrapper = styled.div`
  width: 12.5vw; // Converted from 45px
  height: 19.444vw; // Converted from 70px
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Button06;
