import { ReactNode, useState } from "react";
import styled from "styled-components";
import MobileProgressBar from "../../assets/progressIndicator/ProgressBar01";
import Typography from "../../../assets/Typography";
import { useNavigate } from "react-router-dom";

interface SignUpPageWrapperProps {
  step: number;
  stepInfo: string;
  children?: ReactNode;
}

export const SignUpPageWrapper:
  React.FC<SignUpPageWrapperProps> = ({ step, stepInfo, children }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(step);
  const [complete, setComplete] = useState<boolean>(currentStep === 5 ? true : false);

  return (
    <Wrapper>
      <TempHeader></TempHeader>
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%', position: 'relative'}}>
      <CloseButton onClick={() => {navigate('/')}}>
          <img src={process.env.PUBLIC_URL + 'designImage/icon/icon_02.svg'} alt="Close Button" />
      </CloseButton>
      <ContentsTitleWrapper>
        <StepIndicator>
          <Typography color="#D85888" size="2.78vw" bold="400">
            Step {currentStep}
          </Typography>
        </StepIndicator>
        <div style={{display: 'inline-block', alignContent: 'center'}}>
          <Typography size="3.89vw" bold="700">{stepInfo}</Typography>
        </div>
      </ContentsTitleWrapper>
      </div>
      <MobileProgressBar numberOfSteps={5} currentStep={step} complete={step === 5}/>
      <FormWrapper>
        {children}
      </FormWrapper>
    </Wrapper>
  )
  }

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding-bottom: 5vw;
  background-color: #FFF;

  // // 이 아래는 첫번째 페이지에 대해서만 
  // opacity: 0.7;
  // background: radial-gradient(48.78% 48.78% at 50% 52.3%, rgba(232, 88, 136, 0.15) 0%, rgba(255, 175, 189, 0.05) 100%);

  // //filter: blur(75px);

`;

const TempHeader = styled.div`
height: 2vw;
`;
// Wrapper내에서의 align은 나중에 생각
const CloseButton = styled.button`
display: flex;
width: 8.5vw;
height: 8.5vw;
flex-shrink: 0;
position: absolute;
top: -1vw;
left: 1vw;
cursor: pointer;
`;

const ContentsTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 10px;
  margin-bottom: 25px;
`;

const StepIndicator = styled.div`
display: flex;
//width: 45px;
width: 12.5vw;
//height: 21px;
height: 5.83vw;
//padding: 1.11vw 2.22vw;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 20px;
border: 0.522px solid #D85888;
background: rgba(255, 255, 255, 0.30);
`;

const FormWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;
