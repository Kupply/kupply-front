import styled from "styled-components";
import { UserInput } from "../../signUp/UserInput";
//import SubmitButton from "../../../assets/buttons/OldSubmitButton";
import Button03 from "../../../assets/buttons/Button03";
import Typography from "../../../assets/Typography";
import { useRecoilState } from "recoil";
import { isAppliedState, userProfileState, userSettingsState, userState } from "../../../store/atom";
import client from "../../../utils/HttpClient";
import { useSubmit1 } from "../../../utils/SettingSubmitFunctions";
import NicknameCheckButton from "../../../assets/progressIndicator/Loader";
import { useNicknameVerification } from "../../../utils/UserInputVerification";


type StateOptions = 'default' | 'hover' | 'loading' | 'filled' | 'error' ;

export function SidebarContent1(){
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [nickname, setNickname] = useRecoilState(userSettingsState('nickname'));
  const [isApplied, setIsApplied] = useRecoilState(isAppliedState);

  useNicknameVerification('settings');
  const {secondSubmit} = useSubmit1();

  return (
    <BodyContainer>
          <BodyTitle>프로필 사진 / 닉네임 변경하기</BodyTitle>
          <BodyContent>쿠플라이에서 사용할 닉네임과 프로필을 수정하세요.</BodyContent>
          <TextFieldTitle>
            <strong>프로필 사진</strong> 변경하기
          </TextFieldTitle>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1.0416vw' }}>
            <CurrentImg
              src={
                userProfile.pic === 'customProfile'
                  ? userProfile.link
                  : `designImage/character/rectProfile/${userProfile.pic}.png`
              }
              alt="current profile"
            />
            <div>
              <CandidateImgsWrapper>
                <CandidateImg // 각 이미지들을 버튼으로 수정 필요, 이미지 업로드 기능 구현 필요
                  src="designImage/character/rectProfile/RectProfile1.png"
                  alt="candidate profile 1"
                  onClick={() => setUserProfile((prev) => ({...prev, pic: 'rectProfile1'}))}
                />
                <CandidateImg
                  src="designImage/character/rectProfile/RectProfile2.png"
                  alt="candidate profile 2"
                  onClick={() => setUserProfile((prev) => ({...prev, pic: 'rectProfile2'}))}
                />
                <CandidateImg
                  src="designImage/character/rectProfile/RectProfile3.png"
                  alt="candidate profile 3"
                  onClick={() => setUserProfile((prev) => ({...prev, pic: 'rectProfile3'}))}
                />
                <CandidateImg
                  src="designImage/character/rectProfile/RectProfile4.png"
                  alt="candidate profile 4"
                  onClick={() => setUserProfile((prev) => ({...prev, pic: 'rectProfile4'}))}
                />
              </CandidateImgsWrapper>
              <div style={{ gap: '0.2604vw', marginTop: '2.708vw', display: 'flex' }}></div>
            </div>
          </div>
          <ContentsWrapper>
            <div style={{ display: 'flex', marginTop: '3.125vw' }}>
              <Typography
                size="mediumText"
                style={{ color: 'var(--Main-Black, #141414)', fontWeight: 700, opacity: 0.8 }}
              >
                닉네임&nbsp;
              </Typography>
              <Typography
                size="mediumText"
                style={{ color: 'var(--Main-Black, #141414)', fontWeight: 400, opacity: 0.8, lineHeight: '18px' }}
              >
                수정하기
              </Typography>
            </div>
            <div style={{position: 'relative'}}>
            <UserInput userInfoType="nickname" locationUsed="settings">
            {nickname.info === '' || nickname.infoState === 'filled' ? (
              <></>
            ) : (
              <NicknameCheckButtonWrapper>
                <NicknameCheckButton
                  nickname={nickname.info}
                  state={nickname.infoCheck as StateOptions}
                  setState={(so) => setNickname((prev) => ({...prev, infoCheck: so}))}
                  style={{whiteSpace: 'nowrap'}}
                ></NicknameCheckButton>
              </NicknameCheckButtonWrapper>
            )}
            </UserInput>
            </div>
            
            
          </ContentsWrapper>
          
          <Button03
            style={{ marginTop: '245px', width: '100%' }}
            state={!isApplied ? 'pressed' : 'disabled'}
            onClick={() => {
              secondSubmit();
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


const CurrentImg = styled.img`
  width: 7.96875vw; //153px;
  height: 7.96875vw; //153px;
  object-fit: cover;
`;

const CandidateImg = styled.img`
  width: 3.8541vw; //74px;
  height: 3.8541vw; //74px;
  object-fit: cover;
  cursor: pointer;
`;

const CandidateImgsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 14px;
`;

const ContentsWrapper = styled.div`
  //position: relative;
  display: flex;
  flex-direction: column;
  width: 32.7083vw; //628px;
  gap: 9px;
`;


const NicknameCheckButtonWrapper = styled.div`
  position: absolute;
  top: 1.12vw; //23px;
  left: 25vw; //490px;
  z-index: 20;
`;