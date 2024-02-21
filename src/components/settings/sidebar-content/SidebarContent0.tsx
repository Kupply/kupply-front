import styled from "styled-components";
import TextFieldBox from "../../../assets/OldTextFieldBox";
import { UserInput } from "../../signUp/UserInput";
import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import { useRecoilState } from "recoil";
import { isAppliedState } from "../../../store/atom";
import client from "../../../utils/HttpClient";
import { useSubmit } from "../../../utils/SettingSubmitFunctions";

export function SidebarContent0(){
  const [isApplied, setIsApplied] = useRecoilState(isAppliedState);
  const {firstSubmit} = useSubmit();
  
  // axios - error의 문제가 발생하긴 하는데 submitButton 자체는 제대로 작동 
  return (
    <BodyContainer>
          <BodyTitle>나의 기본정보 수정하기</BodyTitle>
          <BodyContent>나의 기본 사항과 맞지 않는 정보를 수정하세요.</BodyContent>

          <TextFieldTitle>
            <strong>이름</strong> 수정하기
          </TextFieldTitle>
          <UserInput userInfoType="name"/>

          <TextFieldTitle>
            <strong>고려대학교 학번</strong> 수정하기
          </TextFieldTitle>
          <UserInput userInfoType="studentId"/>

          <TextFieldTitle>
            <strong>본전공(1전공)</strong> 수정하기
          </TextFieldTitle>
          <UserInput userInfoType="firstMajor"/>

          <SubmitButton
            style={{ marginTop: '60px' }}
            active={!isApplied}
            onClick={() => {
              firstSubmit();
              console.log('submitted');
            }}
          >
            저장하기
          </SubmitButton>
        </BodyContainer>
  )
}

const BodyContainer = styled.div`
  padding-left: 262px;
  padding-top: 70px;
`;

const BodyTitle = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 100% */
`;

const BodyContent = styled.div`
  color: var(--Main-Black, #141414);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 111.111% */
  opacity: 0.6;
  margin-top: 12px;
`;

const TextFieldTitle = styled.div`
  margin-top: 58px;
  margin-bottom: 9px;
  opacity: 0.8;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;
