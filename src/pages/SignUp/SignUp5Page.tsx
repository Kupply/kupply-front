import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Typography from "../../assets/Typography";
import MultiStepProgressBar from "../../assets/MultiStepProgressBar";
import TextFieldBox from "../../assets/TextFieldBox";
import NextButton from "../../assets/NextButton";
import PrevButton from "../../assets/PrevButton";
import CheckButton from "../../assets/CheckButton";
import { check } from "prettier";

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
  padding-bottom: 400px;  // 임시로 지정 수정 필요?
`;

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 45px;
  padding-bottom: 48px;
`;

const FormWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 816px;
  height: 850px;
  padding: 42px 94px 78px 94px;
  padding-left: 94px;
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

const ContentsTitleWrapper = styled.div`
  margin-bottom: 50px;
`;

const TextTitleWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const TextOutBox = styled.div`
  width: 628px;
  height: 228px;
  border-radius: 10px;
  background-color: #FFFFFF;
  border: 1px solid #EEEEEE;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-top: 22px;
  margin-bottom: 22px;
`;

const TextBox = styled.div`     // 스크롤바 숨기기 왜 안될까...
  width: 594px;
  height: 204px;
  background-color: #FFFFFF;
  margin: 8px;
  overflow-y: auto;
  
  /* Webkit 기반의 브라우저 (예: Chrome, Safari)에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Firefox에서 스크롤바 숨기기 */
  scrollbar-width: none;

  /* Internet Explorer에서 스크롤바 숨기기 */
  -ms-overflow-style: none;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const ArrowImage = styled.img`
  margin-left: 8px;              
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
  onChange: (isChecked: boolean) => void;   //  이 부분 수정했습니다
}

const CustomCheckButton: React.FC<CustomCheckButtonProps> = ({ isChecked, onChange }) => {
  return (
    <CheckButtonWrapper
      isChecked={isChecked}
      onClick={() => onChange(!isChecked)}    //  이 부분 수정했습니다
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
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

export default function SignUp5Page() {
  /*각 체크박스의 상태를 state로 관리*/
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false
  });

  const [isButtonActive, setIsButtonActive] = useState(false);

  /* 모든 약관에 동의했는지 확인 */
  const allStateAgreed = () => {
    return Object.values(individualChecks).every(val => val);
  };

  useEffect(() => {
    if (allChecked) {
      setIndividualChecks({
        first: true,
        second: true,
        third: true,
        fourth: true
      });
    }
  }, [allChecked]);
  
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
      navigate("/signUp6");
    } else {
      alert("모든 약관에 동의해주세요.");
    }
  };

  const handlePrev = () => {
    navigate("/signUp4");
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography size="title1" style={{ lineHeight: "131.579%" }}>
          거의 다왔습니다!
        </Typography>
        <Typography
          size="mediumText"
          style={{ opacity: "0.8", marginTop: "5px" }}
        >
          쿠플라이의 몇 가지 약관을 확인하면 서비스를 이용하실 수 있어요.
        </Typography>
      </TitleWrapper>
      <div style={{ width: "976.8px", height: "30px" }}>
        <MultiStepProgressBar
          steps={steps}
          currentStep={currentStep}
          complete={complete}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
      <FormWrapper>
        <ContentsTitleWrapper>
          <StepIndicator>Step 5</StepIndicator>
          <Typography size="largeText">  
            약관 읽고 서비스 이용하기 
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

        <TextTitleWrapper>
          <CustomCheckButton 
            isChecked={allChecked}
            onChange={setAllChecked}
          />
          <Typography size="largeText"> 
            약관 전체동의 하기 
            <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow"/>
          </Typography> 
        </TextTitleWrapper>

        <ButtonsWrapper>
          <CustomCheckButton 
            isChecked={individualChecks.first}
            onChange={(newCheckedValue) => 
                setIndividualChecks(prev => ({ ...prev, first: newCheckedValue }))
            }
          />
          <Typography size="largeText"> 
            개인정보 수집, 이용목적 동의 약관
            <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow"/>
          </Typography> 
        </ButtonsWrapper> 

        <TextOutBox>
          <TextBox>
          「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다. 「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
          </TextBox>
        </TextOutBox>

        <ButtonsWrapper>
          <CustomCheckButton 
            isChecked={individualChecks.second}
            onChange={(newCheckedValue) => 
                setIndividualChecks(prev => ({ ...prev, second: newCheckedValue }))
            }
          />
          <Typography size="largeText"> 
            커뮤니티 이용수칙 준수-1
            <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow"/>
          </Typography> 
        </ButtonsWrapper> 

        <TextOutBox>
          <TextBox>
          「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다. 「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
          </TextBox>
        </TextOutBox>

        <ButtonsWrapper>
          <CustomCheckButton 
            isChecked={individualChecks.third}
            onChange={(newCheckedValue) => 
                setIndividualChecks(prev => ({ ...prev, third: newCheckedValue }))
            }
          />
          <Typography size="largeText"> 
            커뮤니티 이용수칙 준수-2
            <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow"/>
          </Typography> 
        </ButtonsWrapper> 

        <TextOutBox>
          <TextBox>
          「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다. 「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
          </TextBox>
        </TextOutBox>

        <ButtonsWrapper>
          <CustomCheckButton 
            isChecked={individualChecks.fourth}
            onChange={(newCheckedValue) => 
                setIndividualChecks(prev => ({ ...prev, fourth: newCheckedValue }))
            }
          />
          <Typography size="largeText"> 
            커뮤니티 이용수칙 준수-3
            <ArrowImage src="design_image/carousel/carousel_right_button.png" alt="right arrow"/>
          </Typography> 
        </ButtonsWrapper> 

        <TextOutBox>
          <TextBox>
          「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다. 「개인정보보호법」 등 관련 법규에 의거하여 고려대학교 소프트웨어 개발/연구 학회 DevKor 는 응답자의 개인정보 수집 및 활용에 대한 개인정보 수집/이용 동의서를 받고 있습니다. 제공된 개인정보는 개인정보 제공자가 동의한 내용 외의 다른 목적으로는 활용되지 않으며, 해당 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리 책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다. 제공된 개인 정보는 고려대학교 소프트웨어 개발/연구 학회 DevKor 의 아래 항목에 명시된 범위에서만 활용됩니다.
          </TextBox>
        </TextOutBox>

        <ButtonsWrapper>
          <PrevButton />
          <NextButton active={isButtonActive} onClick={handleNext}>Next</NextButton>
        </ButtonsWrapper>
      </FormWrapper>
    </Wrapper>
  );
};