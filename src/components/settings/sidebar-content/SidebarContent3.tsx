import styled from "styled-components";
import TextFieldBox from "../../../assets/OldTextFieldBox";
import { UserInput } from "../../signUp/UserInput";
import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import { useRecoilValue } from "recoil";
import { isAppliedState } from "../../../store/atom";
import { useSubmit } from "../../../utils/SettingSubmitFunctions";

export function SidebarContent3(){

  const isApplied = useRecoilValue(isAppliedState);
  const {fourthSubmit} = useSubmit();

  // 문제는 kupply-id가 미리 들어와 있는 형태가 아니라는 점 
  //const [email, setEmail] = useState<string>(localStorage.getItem('loginedUser') || '');
  // 이게 OldSettingsPage의 코드 
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
          <UserInput userInfoType="email" userInfoTypeManual="loginedUser"/>
          <TextFieldTitle>
            <strong>비밀번호</strong> 변경하기
          </TextFieldTitle>
          <UserInput userInfoType="password"/>

          <TextFieldTitle>
            <strong>비밀번호 재확인</strong>하기
          </TextFieldTitle>
          <UserInput userInfoType="password2"/>
          <div>
            <SubmitButton
              style={{ marginTop: '60px' }}
              active={!isApplied}
              onClick={() => {
                fourthSubmit();
              }}
            >
              저장하기
            </SubmitButton>
          </div>
        </BodyContainer>
  );
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