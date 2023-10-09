import React from 'react';
import styled, { css } from 'styled-components';

type StateOptions = 'default' | 'clicked' | 'unactive';

export interface StepProps extends React.ComponentPropsWithRef<'div'> {
  state?: StateOptions;
  double?: boolean;
}

const ButtonWrapper = styled.button<StepProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 297px;
  height: 68px;
  padding: 25px 18px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: ${(props) => (props.state === 'default' ? '0px 0px 12px 0px  rgba(216, 88, 136, 0.10)' : 'none')};
  border: ${(props) =>
    props.state === 'default'
      ? 'none'
      : props.state === 'clicked'
      ? '1px solid #D85888'
      : '1px solid rgba(216, 88, 136, 0.10)'};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;

const Passage = styled.text<StepProps>`
  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  opacity: ${(props) => (props.state === 'unactive' ? '0.5' : '0.8')};
`;

function FirstReAppliedButton(props: StepProps) {
  const { state = 'default', double = false, ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <TextBox>
        <Passage state={state} double={double}>
          {!double
            ? '아니요, 이번이 첫 지원이에요.'
            : '네, 재지원이에요.'}
        </Passage>
      </TextBox>
    </ButtonWrapper>
  );
}

export default FirstReAppliedButton;
