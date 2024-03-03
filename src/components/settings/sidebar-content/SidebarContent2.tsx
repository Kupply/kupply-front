import styled from "styled-components";
import { UserInput } from "../../signUp/UserInput";
import { GPAVerification, SemesterVerification } from "../../signUp/VerificationForm";
import Typography from "../../../assets/Typography";
//import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import Button03 from "../../../assets/buttons/Button03";
import { useRecoilState, useRecoilValue } from "recoil";
import { isAppliedState, isGpaChangedState, settingsModalState } from "../../../store/atom";
import { useSubmit2 } from "../../../utils/SettingSubmitFunctions";

export function SidebarContent2(){

  const isGpaChanged = useRecoilValue(isGpaChangedState);
  const [modalOpen, setModalOpen] = useRecoilState(settingsModalState);
  const [isApplied, setIsApplied] = useRecoilState(isAppliedState);
  const {thirdSubmit} = useSubmit2();

  return (
    <BodyContainer>
          <BodyTitle>마이보드 프로필 수정하기</BodyTitle>
          <BodyContent>
            마이보드는 도전자님이 작성하신 정보를 바탕으로, 도전자님의 희망 이중전공 진입을 도울
            <br />
            다양한 정보를 제공합니다. 신뢰할 수 있는 마이보드를 제공받기 위해 정보를 수정하세요.
          </BodyContent>

          <TextFieldTitle>
            <strong>희망 이중전공</strong> 수정하기
          </TextFieldTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <UserInput userInfoType="hopeMajor1" locationUsed="settings"/>
            <UserInput userInfoType="hopeMajor2" locationUsed="settings"/>
          </div>

          <TextFieldTitle>
            <strong>학점</strong> 수정하기
          </TextFieldTitle>

          <GPAVerification 
            userType="candidate"
            locationUsed="Settings"
          />

          <TextFieldTitle>
            <strong>희망 지원학기</strong> 수정하기
          </TextFieldTitle>
          <SemesterVerification
            userType="candidate"
            locationUsed="Settings"
          />
          
          <div>
            <Button03
              style={{ marginTop: '60px', width: '100%' }}
              state={!isApplied ? 'pressed' : 'disabled'}
              onClick={() => {
                if (isGpaChanged.changed) {
                  setModalOpen(true);
                } else {
                  thirdSubmit();
                }
              }}
            >
              저장하기
            </Button03>
          </div>
        </BodyContainer>
  )
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