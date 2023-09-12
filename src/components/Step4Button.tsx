import React from 'react';
import styled, { css } from 'styled-components';

type StateOptions = 'default' | 'clicked' | 'unactive';

export interface Step4ButtonProps extends React.ComponentPropsWithRef<'div'> {
  state?: StateOptions;
  double?: boolean;
}

const ButtonWrapper = styled.button<Step4ButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 628px;
  height: 110px;
  padding-left: 44px;
  padding-right: 17px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: ${(props) => (props.state === 'default' ? '0px 0px 12px 0px  rgba(216, 88, 136, 0.10)' : 'none')};
  border: ${(props) =>
    props.state === 'default'
      ? 'none'
      : props.state === 'clicked'
      ? '1px solid #D85888'
      : '1px solid rgba(216, 88, 136, 0.30)'};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const Title = styled.text<Step4ButtonProps>`
  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  opacity: ${(props) => (props.state === 'unactive' ? '0.5' : '0.8')};
`;

const Passage = styled.text<Step4ButtonProps>`
  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  opacity: ${(props) => (props.state === 'unactive' ? '0.5' : '0.8')};
`;

function Step4Button(props: Step4ButtonProps) {
  const { state = 'default', double = false, ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <TextBox>
        <Title state={state} double={double}>
          {!double ? '이중전공 도전생' : '이중전공 진입생'}
        </Title>
        <Passage state={state} double={double}>
          {!double
            ? '이중전공 지원 전, 이중전공에 대한 정보가 궁금해요!'
            : '이중전공 진입에 성공했고, 다양한 정보를 공유하고 싶어요!'}
        </Passage>
      </TextBox>
      {(state === 'default' || state === 'clicked') && !double ? (
        <img src="../../design_image/step4_button/chick.png" width="90px" height="90px" />
      ) : (state === 'default' || state === 'clicked') && double ? (
        <img src="../../design_image/step4_button/chick_hood.png" width="90px" height="90px" />
      ) : state === 'unactive' && !double ? (
        <img src="../../design_image/step4_button/chick_2.png" width="90px" height="90px" />
      ) : (
        <img src="../../design_image/step4_button/chick_hood_2.png" width="90px" height="90px" />
      )}
    </ButtonWrapper>
  );
}

export default Step4Button;
