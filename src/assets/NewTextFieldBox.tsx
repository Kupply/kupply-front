import styled from 'styled-components';

const TextFieldBoxWrapper = styled.div`
  display: flex;
  width: 100%;

  //height: 68px;
  height: 3.542vw;
  //padding: 10px 18px;
  padding: 0.521vw 0.9375vw;
  // gap: 10px;
  // border-radius: 10px;
  gap: 0.521vw; //10px;
  border-radius: 0.521vw; //10px;
  box-sizing: border-box;

  & > input {
    width: 80%;
  }
  & > div:first-child {
    width: 20%;
  }
`;

const Input = styled.input<{ helpMessage?: string }>`
/* ${(props) => props.helpMessage !== '' ? } */
`;

function TextFieldBox() {
  return (
    <TextFieldBoxWrapper>
      <input></input>
      <div></div>
    </TextFieldBoxWrapper>
  );
}

export default TextFieldBox;
