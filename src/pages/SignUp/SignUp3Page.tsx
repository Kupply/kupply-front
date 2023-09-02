import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Typography from "../../assets/Typography";
import MultiStepProgressBar from "../../assets/MultiStepProgressBar";
import TextFieldBox from "../../assets/TextFieldBox";
import NextButton from "../../assets/NextButton";
import PrevButton from "../../assets/PrevButton";
/*
[ 참고 사항 - TextFieldBox State Option ]
  default /  hover /  focused /  typing /  filled /  error /  loading /  password
  자세한 사항: TextFieldBox.tsx 
};
*/

/* 
[ 추후 수정 사항  - 오윤진이 기억해두려고 작성한 내용]
1. Input 입력 수행도에 따라 NextButton 의 상태 props 통해 지정 필요 
2. Input 입력 서버로 전송
3. handleNext handlePrev 함수 수정
4. ProgressBar 크기 수정
*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
  padding-bottom: 25px;
`;

const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 816px;
  height: 850px;
  padding: 67px 94px 78px 94px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
`;

const StepIndicator = styled.div`
  display: inline-flex;
  padding: 8px 18px;
  justify-content: center;
  margin-bottom: 17px;
  align-items: center;
  border-radius: 999px;
  border: 1px solid #d85888;
  background: rgba(255, 255, 255, 0.3);
  color: #d85888;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

const ContentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 34px;
`;
// state를 부모 컴포넌트에서 넘겨 주기 위해 추가
type StateOptions =
  | "default"
  | "hover"
  | "focused"
  | "typing"
  | "filled"
  | "error"
  | "loading"
  | "password";

export default function SignUp3Page() {
  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const steps = [1, 2, 3, 4, 5];
  const [currentStep, setCurrentStep] = useState<number>(3); // 회원가입 2 단계 페이지
  const [complete, setComplete] = useState<boolean>(false);

  /* 각 input들의 값을 state를 사용하여 관리 */
  const [ID, setID] = useState<string>("bruce1115@korea.ac.kr");
  const [IDState, setIDState] = useState<StateOptions>("default");
  const [password, setPassword] = useState<string>("");
  const [passwordState, setPasswordState] = useState<StateOptions>("default");
  const [password2, setPassword2] = useState<string>("");
  const [password2State, setPassword2State] = useState<StateOptions>("default");
  const [nickname, setNickname] = useState<string>("");
  const [nicknameState, setnicknameState] = useState<StateOptions>("default");

  /* 모든 state가 빈 문자열이 아니면 선택이 완료된 것이므로 complete를 true로 전환한다. 반대도 마찬가지. */
  useEffect(() => {
    if (
      IDState === "filled" &&
      passwordState === "filled" &&
      password2State === "filled" &&
      nicknameState === "filled" &&
      !complete
    ) {
      setComplete(true);
    } else if (
      !(
        IDState === "filled" &&
        passwordState === "filled" &&
        password2State === "filled" &&
        nicknameState === "filled"
      ) &&
      complete
    ) {
      setComplete(false);
    }
  }, [IDState, passwordState, password2State, nicknameState, complete]);

  /* ID의 유효성 검사 */
  useEffect(() => {
    const IDcheck = /@korea\.ac\.kr$/;
    if (IDState === "filled") {
      if (!IDcheck.test(ID)) setIDState("error");
      else setIDState("filled");
    }
  }, [ID, IDState]);

  /* password의 유효성 검사 */
  useEffect(() => {
    const passwordCheck =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-]).{8,}$/;
    if (passwordState === "filled") {
      if (!passwordCheck.test(password)) setPasswordState("error");
      else setPasswordState("filled");
    }
  }, [password, passwordState]);

  /* password2의 유효성 검사 */
  useEffect(() => {
    const password2Check =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-]).{8,}$/;
    if (password2State === "filled") {
      if (!password2Check.test(password2)) setPassword2State("error");
      else setPassword2State("filled");
    }
  }, [password2, password2State]);

  /* password2의 일치 여부 검사 */
  useEffect(() => {
    if (
      !!password &&
      !!password2 &&
      passwordState === "filled" &&
      password2State === "filled"
    ) {
      if (password === password2) {
        setPassword2State("filled");
      } else {
        setPassword2State("error");
      }
    }
  }, [password, passwordState, password2, password2State]);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = () => {
    navigate("/signUp4");
  };

  const handlePrev = () => {
    navigate("/signUp2");
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: "131.579%" }}>
          환영합니다
        </Typography>
        <Typography
          size="mediumText"
          style={{ opacity: "0.8", marginTop: "5px" }}
        >
          회원가입을 위한 몇가지 절차를 거친 후 다양한 서비스를 이용하세요.
        </Typography>
      </TitleWrapper>
      <div style={{ width: "976.8px", height: "30px" }}>
        <MultiStepProgressBar
          steps={steps}
          currentStep={currentStep}
          complete={complete}
        />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 3</StepIndicator>
          <Typography size="largeText">
            쿠플라이 비밀번호와 닉네임 설정하기
          </Typography>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="630"
            height="2"
            viewBox="0 0 630 2"
            fill="none"
          >
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>
        <ContentsList>
          <ContentsWrapper>
            <div style={{ display: "flex" }}>
              <Typography
                size="mediumText"
                bold="700"
                style={{ opacity: "0.8" }}
              >
                쿠플라이 아이디
              </Typography>
            </div>
            <TextFieldBox
              value={ID}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setID(e.target.value);
              }}
              state={"filled"}
              setState={() => {}}
              setValue={() => {}}
            ></TextFieldBox>
            {/* 이미지 추가가 필요해요! */}
            <Typography size="details" color="#A8A8A8">
              쿠플라이 아이디는 고려대학교 이메일입니다.
            </Typography>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: "flex" }}>
              <Typography
                size="mediumText"
                bold="700"
                style={{ opacity: "0.8" }}
              >
                비밀번호
              </Typography>
              <Typography size="mediumText">를 입력해주세요.</Typography>
            </div>
            <TextFieldBox
              placeholder="대소문자, 특수문자를 최소 하나씩 조합하여 8글자 이상"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              state={passwordState}
              setState={setPasswordState}
              setValue={setPassword}
              helpMessage="비밀번호는 <8자 이상/1개 이상의 대,소문자/1개 이상의 특수문자>가 포함되어야 합니다."
              errorMessage="유효하지 않은 비밀번호에요."
              type="password"
            ></TextFieldBox>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: "flex" }}>
              <Typography size="mediumText">비밀번호를&nbsp;</Typography>
              <Typography
                size="mediumText"
                bold="700"
                style={{ opacity: "0.8" }}
              >
                확인
              </Typography>
              <Typography size="mediumText">해&nbsp;주세요.</Typography>
            </div>
            <TextFieldBox
              placeholder="비밀번호 확인"
              value={password2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword2(e.target.value);
              }}
              state={password2State}
              setState={setPassword2State}
              setValue={setPassword2}
              helpMessage="비밀번호 확인"
              errorMessage="비밀번호가 일치하지 않아요!"
              type="password"
            ></TextFieldBox>
          </ContentsWrapper>
          <ContentsWrapper>
            <div style={{ display: "flex" }}>
              <Typography size="mediumText">
                쿠플라이에서 사용할&nbsp;
              </Typography>
              <Typography
                size="mediumText"
                bold="700"
                style={{ opacity: "0.8" }}
              >
                닉네임
              </Typography>
              <Typography size="mediumText">을 설정해주세요.</Typography>
            </div>
            <TextFieldBox
              placeholder="닉네임"
              value={nickname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNickname(e.target.value);
              }}
              state={nicknameState}
              setState={setnicknameState}
              setValue={setNickname}
              helpMessage="닉네임"
            ></TextFieldBox>
          </ContentsWrapper>
        </ContentsList>
        <ButtonsWrapper>
          <PrevButton />
          <NextButton active={complete} />
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
}
