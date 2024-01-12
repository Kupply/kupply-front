import styled from 'styled-components';

import Typography from './Typography';

export interface TextFieldBoxProps extends React.ComponentPropsWithoutRef<'div'> {
  state?: 'default' | 'hover' | 'focused' | 'typing' | 'filled' | 'correct' | 'error' | 'loading';
  password?: boolean;
  placeHolder?: string;
  helpMessage?: string;
}

function TextFieldBox(props: TextFieldBoxProps) {
  const {
    children,
    state = 'default',
    password = false,
    placeHolder = '',
    helpMessage = 'Help Message',
    ...rest
  } = props;
  return (
    <MainWrapper>
      <TextFieldWrapper state={state} password={password} {...rest}>
        {(state === 'focused' || state === 'typing') && (
          <Typography size="0.63vw" color="#D85888">
            {helpMessage}
          </Typography>
        )}
        <TextField state={state} placeholder={placeHolder}></TextField>
      </TextFieldWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextFieldWrapper = styled.div<TextFieldBoxProps>`
  width: 32.71vw;
  height: auto;
  box-sizing: border-box;
  border: ${(props) =>
    props.state === 'default' || props.state === 'hover'
      ? '1px solid #B9B9B9'
      : props.state === 'error'
      ? '1px solid #EA0909'
      : '1px solid #D85888'};
  padding: 25px 0.94vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  background: ${(props) =>
    props.state === 'focused' || props.state === 'typing' ? 'rgba(216, 88, 136, 0.05)' : 'var(--White, #FFF)'};
  box-shadow: ${(props) => (props.state === 'hover' ? '0px 0px 12px 0px rgba(216, 88, 136, 0.10)' : 'none')};
`;

const TextField = styled.input<TextFieldBoxProps>`
  width: 28.44vw;
  height: auto;
  border: none;
  outline: none;
  background: none;
  font-family: Pretendard;
  font-size: 0.94vw;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => (props.state === 'typing' || props.state === 'error' ? '#141414' : '#D85888')};
  line-height: 100%;

  &::placeholder {
    font-family: Pretendard;
    font-size: 0.94vw;
    font-style: normal;
    font-weight: 500;
    color: #b9b9b9;
    opacity: 0.8;
    line-height: 100%;
  }
`;

export default TextFieldBox;
