import styled from "styled-components";
import TextFieldBox from "../../../assets/OldTextFieldBox";
import { UserInput } from "../../signUp/UserInput";
//import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import Button03 from "../../../assets/buttons/Button03";
import { useRecoilState } from "recoil";
import { isAppliedState } from "../../../store/atom";
import client from "../../../utils/HttpClient";
import { useSubmit0 } from "../../../utils/SettingSubmitFunctions";
import { useStudentIdVerification } from "../../../utils/UserInputVerification";

export function SidebarContent0(){
  const [isApplied, setIsApplied] = useRecoilState(isAppliedState);
  const {firstSubmit} = useSubmit0();

  // 각 input이 validated되었는지의 여부가 없음 firstSubmit이 validated되었을 때 가능하도록?
  useStudentIdVerification('settings');
  
  return (
    <BodyContainer>
          <BodyTitle>나의 기본정보 수정하기</BodyTitle>
          <BodyContent>나의 기본 사항과 맞지 않는 정보를 수정하세요.</BodyContent>

          <TextFieldTitle>
            <strong>이름</strong> 수정하기
          </TextFieldTitle>
          <UserInput userInfoType="name" locationUsed="settings"/>
          
          
          <TextFieldTitle>
            <strong>고려대학교 학번</strong> 수정하기
          </TextFieldTitle>
          <UserInput userInfoType="studentId" locationUsed="settings"/>
          

          <TextFieldTitle>
            <strong>본전공(1전공)</strong> 수정하기
          </TextFieldTitle>
          
          <UserInput userInfoType="firstMajor" locationUsed="settings"/>
          
          <Button03
            style={{ marginTop: '60px', width: '100%'}}
            state={!isApplied ? 'pressed' : 'disabled'}
            onClick={() => {
              firstSubmit();
              console.log('submitted');
            }}
          >
            저장하기
          </Button03>
        </BodyContainer>
  )
}

const BodyContainer = styled.div`
  //padding-left: 262px;
  padding-left: 13.645vw;
  padding-top: 3.646vw; //70px;
  //width: 628px;
  width: 32.7083vw;
`;

const BodyTitle = styled.div`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25vw; /* 100% */
`;

const BodyContent = styled.div`
  color: var(--Main-Black, #141414);
  text-shadow: 0px 4px 16px rgba(255, 255, 255, 0.33);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 111.111%; //22px; /* 111.111% */
  opacity: 0.6;
  margin-top: 0.625vw; //12px;
`;

const TextFieldTitle = styled.div`
  margin-top: 3.021vw; //58px;
  margin-bottom: 0.4688vw; //9px;
  opacity: 0.8;
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 400;
  line-height: 0.9375vw;
`;
