import styled from "styled-components";
import { UserInput } from "../../signUp/UserInput";
import Button03 from "../../../assets/buttons/Button03";
import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import { useRecoilValue } from "recoil";
import { isAppliedState } from "../../../store/atom";
import { useSubmit3 } from "../../../utils/SettingSubmitFunctions";
import { useEmailVerification, usePassword2Verification, usePasswordVerification } from "../../../utils/UserInputVerification";

export function SidebarContent3(){

  const isApplied = useRecoilValue(isAppliedState);
  const {fourthSubmit} = useSubmit3();
  usePasswordVerification('settings');
  usePassword2Verification('settings');
  useEmailVerification('settings');
  
  // loginPage에서 loginedUser이라는 명칭을 따르고 있기 때문에 이를 여기서는 유지해야 한다 
  return (
    <BodyContainer>
          <BodyTitle>계정관리</BodyTitle>
          <BodyContent>
            안전한 개인정보 보호를 위해 비밀번호를 변경하세요. 쿠플라이의 아이디는 고려대학교 <br />
            이메일 입니다.
          </BodyContent>
          <TextFieldTitle>
            <strong>쿠플라이 아이디</strong>
          </TextFieldTitle>
          <UserInput userInfoType="id" userInfoTypeManual="loginedUser" locationUsed="settings"/>
          <TextFieldTitle>
            <strong>비밀번호</strong> 변경하기
          </TextFieldTitle>
          <UserInput userInfoType="password" locationUsed="settings"/>

          <TextFieldTitle>
            <strong>비밀번호 재확인</strong>하기
          </TextFieldTitle>
          <UserInput userInfoType="password2" locationUsed="settings"/>
          <div>
            <Button03
              style={{ marginTop: '60px', width: '100%' }}
              state={!isApplied ? 'pressed' : 'disabled'}
              onClick={() => {
                fourthSubmit();
              }}
            >
              저장하기
            </Button03>
          </div>
        </BodyContainer>
  );
}

const BodyContainer = styled.div`
  //padding-left: 262px;
  padding-left: 13.645vw;
  padding-top: 3.646vw;
  //padding-top: 70px;
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