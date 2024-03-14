import styled from "styled-components";
import MultiStepProgressBar from "../../../../assets/progressIndicator/ProgressBar";
import Typography from "../../../../assets/Typography";

interface NotSubmittedWrapperProps{
  currentStep: number;
  children: React.ReactNode;
}

// step별로 mapping해주는 것 추가 
export default function NotSubmittedWrapper(props: NotSubmittedWrapperProps){
  const {currentStep, children} = props;

  return (
    <>
    <ProgressBarWrapper style={{ position: 'absolute', top: '6.25vw', left: '-4.297vw' }}>
      Hello
      <MultiStepProgressBar numberOfSteps={3} currentStep={currentStep} complete={true} />
      <ProgressBarTitle>
        <div style={{ textAlign: 'left', paddingLeft: '7.031vw', lineHeight: '136.111%' }}>
        <Typography
          size="0.9375vw"
          bold="500"
          color="#E57C90"
        >
          STEP1
          {currentStep === 1 && <><br />
          기존 정보 확인하기</>}
        </Typography>
        </div>
        <div style={{
            textAlign: 'center',
            marginTop: currentStep === 1 ? '-2.552vw' : '-1.198vw',
            lineHeight: '136.111%',
          }}>
        <Typography
          size="0.9375vw"
          bold="500" 
          color={currentStep >= 2? '#E57C90' : 'var(--DF_Grey-2, #DFDFDF)'}  
        >
          STEP2
          {currentStep === 2 && <><br />
          지원학기 입력하기</>}
        </Typography>
        </div>
        <div style={{
            textAlign: 'right',
            marginTop: currentStep === 2 ? '-2.552vw' : '-1.198vw',
            marginRight: '6.771vw',
            lineHeight: '136.111%',
          }}>
        <Typography
          size="0.9375vw"
          bold="500"
          color={currentStep === 3 ? '#E57C90' : 'var(--DF_Grey-2, #DFDFDF)'}
        >
          STEP3
          {currentStep === 3 && <><br />
          학업계획서 첨부하기</>}
        </Typography>
        </div>
      </ProgressBarTitle>              
      </ProgressBarWrapper>
      <DividingLine/>
        {children}
    </>
  )
}

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // width: 814px;
`;

const ProgressBarTitle = styled.text`
  text-align: left;
  font-family: Pretendard;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 500;
  line-height: 136.111%;
  //margin-top: 8px;
  margin-top: 0.417vw;
`;


const DividingLine = styled.div`
  //width: 860px;
  widht: 44.792vw;
  height: 1px;
  background: #dfdfdf;
  position: absolute;
  left: 0px;
  //top: 232px;
  top: 12.083vw;
`;
