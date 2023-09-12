import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Typography from '../../assets/Typography';
import MultiStepProgressBar from '../../assets/MultiStepProgressBar';
import TextFieldBox from '../../assets/TextFieldBox';
import NextButton from '../../assets/buttons/NextButton';
import LoginButton from '../../assets/buttons/LoginButton';
import PrevButton from '../../assets/buttons/PrevButton';
import CheckButton from '../../assets/checkbox/CheckButton';
import { check } from 'prettier';
import { ScrollBarSmall, ScrollBarLarge } from '../../assets/ScrollButton';

/*
주의1) 1, 5 페이지는 (첫 단계, 마지막 단계 페이지는) 이벤트 함수에 신경써서 구현 
주의2) 5페이지는 스크롤바 애니메이션 구현
*/

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #fcfafb;
`;

const Wrapper2 = styled.div`
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
  width: 816px;
  height: 850px;
  padding: 42px 94px 78px 94px;
  padding-left: 94px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  margin-top: 25px;
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

const ContentsTitleWrapper = styled.div`
  margin-bottom: 30px;
`;

const TextTitleWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  text-align: center;
`;

const TextTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 11px;
`;

const TextOutBox = styled.div`
  width: 628px;
  height: 228px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--White, #fff);
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const TextBox = styled.div`
  width: 594px;
  height: 204px;
  padding: 8px;
  gap: 8px;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const ButtonsTextWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 22px;
  margin-bottom: 22px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-right: 18px;
`;

const FixedWidth = css`
  // 628px 너무 길어서 길이 조절했습니다
  width: 475px;
`;

const NextButtonFixedWidth = styled(NextButton)`
  ${FixedWidth}
`;

const ScrollBox = styled.div`
  display: inline-flex;
  height: 80%;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  // gap: 20px;
`;

const ArrowImage = styled.img`
  //display: flex;
  width: 28px;
  height: 28px;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
`;

/* Asset에 있는 CheckButton 수정하기 애매해서 여기에 살짝 수정했습니다 */
const CheckButtonWrapper = styled.button<{ isChecked: boolean }>`
  width: 28px;
  height: 28px;
  transition: 0.25s ease-in-out;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 28px;
    height: 28px;
    transition: 0.25s ease-in-out;
    stroke: #a8a8a8;
    fill: #ffffff;
  }

  ${(props) =>
    props.isChecked &&
    css`
      & > svg > path {
        stroke: #ffffff;
        fill: rgba(216, 88, 136, 0.75);
        border: none;
      }
    `}
`;

interface CustomCheckButtonProps {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void; //  이 부분 수정했습니다
}

const CustomCheckButton: React.FC<CustomCheckButtonProps> = ({ isChecked, onChange }) => {
  return (
    <CheckButtonWrapper
      isChecked={isChecked}
      onClick={() => onChange(!isChecked)} //  이 부분 수정했습니다
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14.0002 25.6666C20.4435 25.6666 25.6668 20.4432 25.6668 13.9999C25.6668 7.5566 20.4435 2.33325 14.0002 2.33325C7.55684 2.33325 2.3335 7.5566 2.3335 13.9999C2.3335 20.4432 7.55684 25.6666 14.0002 25.6666Z"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.8891 11.0833L12.5419 16.4305L10.1113 13.9999"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </CheckButtonWrapper>
  );
};

function SignUp5Page() {
  /*각 체크박스의 상태를 state로 관리*/
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const [isButtonActive, setIsButtonActive] = useState(false);

  /* 모든 약관에 동의했는지 확인 */
  const allStateAgreed = () => {
    return Object.values(individualChecks).every((val) => val);
  };

  useEffect(() => {
    if (allChecked) {
      setIndividualChecks({
        first: true,
        second: true,
        third: true,
        fourth: true,
      });
    }
  }, [allChecked]);

  useEffect(() => {
    if (allStateAgreed()) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [individualChecks]);

  useEffect(() => {
    setIsButtonActive(allStateAgreed());
  }, [individualChecks]);

  /* Prev/Next 버튼 동작에 따른 페이지(회원가입 단계) 이동 */
  const navigate = useNavigate();

  /* Progress Bar 동작을 위한 리액트훅 및 함수 모음 (props로 전달) */
  const steps = [1, 2, 3, 4, 5];
  const [currentStep, setCurrentStep] = useState<number>(5); // 회원가입 5 단계 페이지
  const [complete, setComplete] = useState<boolean>(true);

  /* 각 페이지마다 버튼 이벤트가 상이하기 때문에 개별 정의 */
  const handleNext = () => {
    if (isButtonActive) {
      navigate('/signupcomplete');
    } else {
      alert('모든 약관에 동의해주세요.');
    }
  };

  const handlePrev = () => {
    navigate('/signUp4');
  };

  const [scrollActive, setActive] = useState(false);

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: '131.579%' }}>
          거의 다왔습니다!
        </Typography>
        <Typography size="mediumText" style={{ opacity: '0.8', marginTop: '5px' }}>
          쿠플라이의 몇 가지 약관을 확인하면 서비스를 이용하실 수 있어요.
        </Typography>
      </TitleWrapper>

      <div style={{ width: '976.8px', height: '30px' }}>
        <MultiStepProgressBar steps={steps} currentStep={currentStep} complete={complete} />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 5</StepIndicator>
          <Typography size="largeText">약관 읽고 서비스 이용하기</Typography>
          <svg xmlns="http://www.w3.org/2000/svg" width="630" height="2" viewBox="0 0 630 2" fill="none">
            <path d="M1 1H629" stroke="#D85888" stroke-linecap="round" />
          </svg>
        </ContentsTitleWrapper>

        <TextTitleWrapper>
          <TextTitle>
            <CustomCheckButton isChecked={allChecked} onChange={setAllChecked} />
            <Typography
              size="largeText"
              style={{
                fontWeight: '600',
                marginBottom: '-5px',
                justifyContent: 'center',
              }}
            >
              약관 전체동의 하기
              <ArrowImage // 위치가 좀 이상해서 수정 필요
                src="design_image/carousel/carousel_right_button.png"
                alt="right arrow"
              />
            </Typography>
          </TextTitle>
        </TextTitleWrapper>
        <ScrollBox>
          <ScrollBarLarge isChecked={scrollActive}>
            <ButtonsTextWrapper>
              <CustomCheckButton
                isChecked={individualChecks.first}
                onChange={(newCheckedValue) =>
                  setIndividualChecks((prev) => ({
                    ...prev,
                    first: newCheckedValue,
                  }))
                }
              />
              <Typography
                size="mediumText"
                style={{
                  fontWeight: '600',
                  marginBottom: '-5px',
                  justifyContent: 'center',
                }}
              >
                개인정보 수집, 이용목적 동의 약관
                <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow" />
              </Typography>
            </ButtonsTextWrapper>

            <TextOutBox>
              <TextBox>
                <ScrollBarSmall isChecked={scrollActive}>
                  <Typography size="mediumText" style={{ fontWeight: '400' }}>
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                  </Typography>
                </ScrollBarSmall>
              </TextBox>
            </TextOutBox>

            <ButtonsTextWrapper>
              <CustomCheckButton
                isChecked={individualChecks.second}
                onChange={(newCheckedValue) =>
                  setIndividualChecks((prev) => ({
                    ...prev,
                    second: newCheckedValue,
                  }))
                }
              />
              <Typography
                size="mediumText"
                style={{
                  fontWeight: '600',
                  marginBottom: '-5px',
                  justifyContent: 'center',
                }}
              >
                커뮤니티 이용수칙 준수 - 1
                <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow" />
              </Typography>
            </ButtonsTextWrapper>

            <TextOutBox>
              <TextBox>
                <ScrollBarSmall isChecked={scrollActive}>
                  <Typography size="mediumText" style={{ fontWeight: '400' }}>
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                  </Typography>
                </ScrollBarSmall>
              </TextBox>
            </TextOutBox>

            <ButtonsTextWrapper>
              <CustomCheckButton
                isChecked={individualChecks.third}
                onChange={(newCheckedValue) =>
                  setIndividualChecks((prev) => ({
                    ...prev,
                    third: newCheckedValue,
                  }))
                }
              />
              <Typography
                size="mediumText"
                style={{
                  fontWeight: '600',
                  marginBottom: '-5px',
                  justifyContent: 'center',
                }}
              >
                커뮤니티 이용수칙 준수 - 2
                <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow" />
              </Typography>
            </ButtonsTextWrapper>

            <TextOutBox>
              <TextBox>
                <ScrollBarSmall isChecked={scrollActive}>
                  <Typography size="mediumText" style={{ fontWeight: '400' }}>
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                  </Typography>
                </ScrollBarSmall>
              </TextBox>
            </TextOutBox>

            <ButtonsTextWrapper>
              <CustomCheckButton
                isChecked={individualChecks.fourth}
                onChange={(newCheckedValue) =>
                  setIndividualChecks((prev) => ({
                    ...prev,
                    fourth: newCheckedValue,
                  }))
                }
              />
              <Typography
                size="mediumText"
                style={{
                  fontWeight: '600',
                  marginBottom: '-5px',
                  justifyContent: 'center',
                }}
              >
                커뮤니티 이용수칙 준수 - 3
                <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow" />
              </Typography>
            </ButtonsTextWrapper>

            <TextOutBox>
              <TextBox>
                <ScrollBarSmall isChecked={scrollActive}>
                  <Typography size="mediumText" style={{ fontWeight: '400' }}>
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                    「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의
                    개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보
                    제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할
                    때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는
                    고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
                  </Typography>
                </ScrollBarSmall>
              </TextBox>
            </TextOutBox>

            <ButtonsWrapper>
              <PrevButton />
              <NextButtonFixedWidth active={isButtonActive} onClick={handleNext}>
                Next
              </NextButtonFixedWidth>
            </ButtonsWrapper>
          </ScrollBarLarge>
        </ScrollBox>
      </FormWrapper>
    </Wrapper>
  );
}

const TitleOutBox = styled.div`
  width: 877px;
  height: 411px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LonginButtonWrapper = styled.div`
  display: flex;
  width: 628px;
  padding: 24px 34px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: var(--Primary-color, #d85888);
`;

function SignUp5Complete() {
  const [isButtonActive, setIsButtionActive] = useState(true);
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/login');
  };

  return (
    <Wrapper2>
      <TitleOutBox>
        <div style={{ textAlign: 'center' }}>
          <Typography size="heading1" style={{ lineHeight: '104.167%' }}>
            축하합니다!
          </Typography>
          <div style={{ marginTop: '24px' }}>
            <Typography size="largeText" style={{ opacity: '0.8', lineHeight: '30px', fontWeight: '500' }}>
              이제 쿠플라이의 회원이 되셨습니다.
              <br />
              로그인 후, 다양한 쿠플라이의 서비스를 이용해보세요!
            </Typography>
          </div>
        </div>
      </TitleOutBox>

      <img
        src="design_image/0001.gif"
        alt="completeImage"
        style={{
          //background: "url(<path-to-image>) lightgray 50% / cover no-repeat",
          position: 'absolute',
          width: '781px',
          height: '836px',
          left: '570px',
          top: '269px',
        }}
      />

      <LonginButtonWrapper style={{ position: 'relative', top: '511px', left: '646' }}>
        <LoginButton active={isButtonActive} onClick={handleNext}>
          <Typography size="bodyText" color="var(--White, #FFF)">
            로그인하고 쿠플라이로 이동하기
          </Typography>
        </LoginButton>
      </LonginButtonWrapper>
    </Wrapper2>
  );
}

export { SignUp5Page, SignUp5Complete };
