import React from 'react';
import styled, { css } from 'styled-components';

// 'unactive' 이랑 'inactive'가 같아서 'unactive'을 빼고 싶지만 기존의 페이지가 돌아가기 위해 일단 이렇게 해놓음
type StateOptions = 'default' | 'clicked' | 'inactive' | 'unactive';

export interface Step4ButtonProps extends React.ComponentPropsWithRef<'div'> {
  state?: StateOptions;
  double?: boolean;
}

const ButtonWrapper = styled.button<Step4ButtonProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  //height: 110px;
  height: 5.729vw;
  padding-left: 2.29vw;
  padding-right: 0.885vw;
  flex-shrink: 0;
  border-radius: 0.521vw; //10px;
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
  gap: 0.4166vw; //8px;
`;

const Title = styled.text<Step4ButtonProps>`
  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100% //18px;
  opacity: ${(props) => (props.state === 'inactive' ? '0.5' : '0.8')};
`;

const Passage = styled.text<Step4ButtonProps>`
  color: var(--main-black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 100% //18px;
  opacity: ${(props) => (props.state === 'inactive' ? '0.5' : '0.8')};
`;

function Step4Button(props: Step4ButtonProps) {
  const { state = 'default', double = false, ...rest } = props;
  return (
    <ButtonWrapper state={state} {...rest}>
      <TextBox>
        <Title state={state} double={double}>
          {!double ? '이중전공 도전생' : '이중전공 합격생'}
        </Title>
        <Passage state={state} double={double}>
          {!double
            ? '이중전공 지원 전, 이중전공에 대한 정보가 궁금해요.'
            : '이중전공 진입에 성공했고, 다양한 정보를 공유하고 싶어요.'}
        </Passage>
      </TextBox>
      {(state === 'default' || state === 'clicked') && !double ? (
        <div style={{ width: '4.688vw', height: '4.668vw' }}>
          <img src="../../designImage/character/Chick1StandSide.png" width="100%" height="100%" />
        </div>
      ) : (state === 'default' || state === 'clicked') && double ? (
        <div style={{ width: '4.688vw', height: '4.668vw' }}>
          <img src="../../designImage/character/Chick2StandSide.png" width="100%" height="100%" />
        </div>
      ) : state === 'inactive' && !double ? (
        <div style={{ width: '4.688vw', height: '4.668vw' }}>
          <img src="../../designImage/character/Chick1StandSideOpacity.png" width="100%" height="100%" />
        </div>
      ) : (
        <div style={{ width: '4.668vw', height: '4.668vw' }}>
          <img src="../../designImage/character/Chick2StandSideOpacity.png" width="100%" height="100%" />
        </div>
      )}
    </ButtonWrapper>
  );
}

export default Step4Button;
