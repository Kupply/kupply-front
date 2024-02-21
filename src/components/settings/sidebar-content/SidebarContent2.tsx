import styled from "styled-components";
import { UserInput } from "../../signUp/UserInput";
import { GPAVerification, SemesterVerification } from "../../signUp/VerificationForm";
import Typography from "../../../assets/Typography";
import { useInputState } from "../../../utils/SignUpFunctions";
import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { isAppliedState, isGpaChangedState, settingsModalState } from "../../../store/atom";
import { useSubmit } from "../../../utils/SettingSubmitFunctions";

export function SidebarContent2(){
  // 지금 문제가 setGpaState이랑 setSemesterState에서 SignUpFunctions를 쓰고 있는데 이게 다르다 보니까 문제가 생긴다. role을 갖고 오는게 거기에는 있는데 여기는 role이 'candidate'으로 고정된 상황 

  const isGpaChanged = useRecoilValue(isGpaChangedState);
  const [modalOpen, setModalOpen] = useRecoilState(settingsModalState);
  const [isApplied, setIsApplied] = useRecoilState(isAppliedState);
  const {thirdSubmit} = useSubmit();

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
            <UserInput userInfoType="hopeMajor1"/>
            <UserInput userInfoType="hopeMajor2"/>
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
            <SubmitButton
              style={{ marginTop: '60px' }}
              active={!isApplied}
              onClick={() => {
                if (isGpaChanged.changed) {
                  setModalOpen(true);
                } else {
                  thirdSubmit();
                }
              }}
            >
              저장하기
            </SubmitButton>
          </div>
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