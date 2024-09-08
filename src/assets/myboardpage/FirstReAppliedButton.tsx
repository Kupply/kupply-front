import React from 'react';
import styled, { css } from 'styled-components';

type StateOptions = 'default' | 'clicked' | 'inactive';

export interface StepProps extends React.ComponentPropsWithRef<'div'> {
  state?: StateOptions;
  double?: boolean;
}

const ButtonWrapper = styled.button<StepProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  //width: 297px;
  width: 15.469vw;
  //height: 68px;
  height: 3.542vw;
  //padding: 25px 18px;
  padding: 1.302vw 0.9375vw;
  flex-shrink: 0;
  //border-radius: 10px;
  border-radius: 0.521vw;
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
  //gap: 8px;
  gap: 0.417vw;
`;

const Passage = styled.text<StepProps>`
  color: var(--main-black, #141414);
  font-family: Pretendard;
  //font-size: 18px;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 500;
  //line-height: 18px;
  line-height: 100%;
  opacity: ${(props) => (props.state === 'inactive' ? '0.5' : '0.8')};
`;

function FirstReAppliedButton(props: StepProps) {
  const { state = 'default', double = false, ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <TextBox>
        <Passage state={state} double={double}>
          {!double ? '아니요, 이번이 첫 지원이에요.' : '네, 지원해본 경험이 있어요.'}
        </Passage>
      </TextBox>
    </ButtonWrapper>
  );
}

export default FirstReAppliedButton;
