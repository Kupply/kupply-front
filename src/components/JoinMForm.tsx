import React from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const InputContainer = styled.div`
  width: 541px;
  height: 77px;
  border-radius: 12px;
  background: rgba(216, 88, 136, 0.20);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

const EmailInput = styled.input`
  width: 100%;
  height: 61px;
  border-radius: 10px;
  border: 1.977px solid #D85888;
  background: rgba(255, 255, 255, 0.80);
  flex: 1;
  margin: 0;
  padding: 0px 10px;
  margin-left: 8px;
  margin-right: 8px;
`
  
/* '이메일 주소' 라는 글씨를 입력창 위에 어떻게 얹을 수 있을까? (input 태그 내에는 별도의 children 삽입 불가) */
const EmailInputText = styled.text`
  color: #D85888;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const JoinButton = styled.button`
  width: 164px;
  height: 77px;
  margin-left: 20px;
  border: none;
  border-radius: 12px;
  background: #D85888;
  cursor: pointer;
`

const JoinText = styled.text`
  width: 67px;
  height: 36px;
  color: white;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`

const JoinSubContainer = styled.div`
  display: flex;
  width: 800px;
  height: 77px;
  background: white;
`

type JoinButtonProps = {
    onClick: any; 
  }
  
function JoinMForm({ onClick } : JoinButtonProps) {    
  
  const navigate = useNavigate();
  const handleJoinClick = () => {
    navigate("/join");
  }

  return (
    <JoinSubContainer>
            
      <InputContainer>
        <EmailInput />
      </InputContainer>

      <JoinButton onClick={handleJoinClick}>
        <JoinText>JOIN</JoinText>
      </JoinButton>

    </JoinSubContainer>
  )
}
  
export default JoinMForm;