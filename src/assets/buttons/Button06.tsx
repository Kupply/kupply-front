import styled from 'styled-components';

import Typography from '../Typography';

export interface Button06Props extends React.ComponentPropsWithoutRef<'button'> {
  title?: string;
  content?: string;
  state?: 'default' | 'pressed' | 'disabled';
}

function Button06(props: Button06Props) {
  const {
    title = '이중전공 도전생',
    content = '이중전공 지원 전, 이중전공에 대한 정보가 궁금해요.',
    state = 'default',
    ...rest
  } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <TextWrapper>
        <Typography size="0.94vw" bold="700" style={{ opacity: state === 'disabled' ? '0.5' : '0.8' }}>
          {title}
        </Typography>
        <Typography size="0.94vw" style={{ opacity: state === 'disabled' ? '0.5' : '0.8' }}>
          {content}
        </Typography>
      </TextWrapper>
      <ImageWrapper
        src={
          state === 'disabled'
            ? '../../designImage/character/Chick1StandSideOpacity.png'
            : '../../designImage/character/Chick1StandSide.png'
        }
      />
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<Button06Props>`
  width: 32.71vw;
  height: 110px;
  box-sizing: border-box;
  border: ${(props) =>
    props.state === 'default'
      ? 'none'
      : props.state === 'pressed'
      ? '1px solid #D85888'
      : '1px solid rgba(216, 88, 136, 0.30)'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: #fff;
  box-shadow: ${(props) => (props.state === 'default' ? '0px 0px 12px 0px rgba(216, 88, 136, 0.10)' : 'none')};
`;

const TextWrapper = styled.div`
  width: auto;
  height: auto;
  margin-left: 7.01%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8.92px;
`;

const ImageWrapper = styled.img`
  width: 4.69vw;
  height: 4.69vw;
  margin-right: 2.71%;
  flex-shrink: 0;
`;

export default Button06;
