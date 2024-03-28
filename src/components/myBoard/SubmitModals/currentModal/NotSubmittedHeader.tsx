import styled from "styled-components";
import MultiStepProgressBar from "../../../../assets/progressIndicator/ProgressBar";
import Typography from "../../../../assets/Typography";

interface NotSubmittedHeaderProps{
  currentStep: number;
  
}

// step별로 mapping해주는 것 추가 
export default function NotSubmittedHeader(props: NotSubmittedHeaderProps){
  const {currentStep, } = props;

  return (
    <ContentsWrapper>
    <ProgressBarWrapper style={{ position: 'absolute', top: '0.25vw'}}>
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
      {/* <DividingLine/> */}
    </ContentsWrapper>
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


// const DividingLine = styled.div`
//   //width: 860px;
//   widht: 44.792vw;
//   height: 30px;
//   background: #dfdfdf;
//   position: absolute;
//   left: 0px;
//   //top: 232px;
//   top: 12.083vw;
// `;

// 지금 문제는 오직 얘다 
const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%; /* Ensure it doesn't exceed the width of its container */
  align-items: center;
  margin-top: 1vw;
  position: relative;
`;