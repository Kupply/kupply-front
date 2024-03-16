import NotSubmittedWrapper from "./NotSubmittedWrapper";
import styled from "styled-components";
import UploadButton from "../../../../assets/myboardpage/UploadButton";
import Typography from "../../../../assets/Typography";
import CompleteMockApplicationButton from "../../../../assets/myboardpage/CompleteMockApplication";
import { CurrentModalProps } from "./Modal0";
import { applicationModalState, applicationSubmittedState } from "../../../../store/atom";
import { useRecoilState } from "recoil";

export default function CurrentModal2(){

  const [currentModal, setCurrentModal] = useRecoilState(applicationModalState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedState);
  return (
    <>
    <ContentsWrapper>
      <NotSubmittedWrapper currentStep={3}>
      <SubContentsWrapper>
        <div style={{ position: 'absolute', left: '4.844vw', top: '13.958vw' }}>
          <Typography
            size="0.9375vw"
            style={{ color: 'var(--Main-Black, #141414)', opacity: 0.8, fontWeight: '700' }}
          >
            학업계획서 첨부하기
          </Typography>{"  "}
          <Typography
            size="0.9375vw"
            bold="500"
            style={{
              color: 'var(--A8_Grey-4, #A8A8A8)',
              opacity: 0.8,
              marginTop: '-0.9375vw',
            }}
          >
            (선택)
          </Typography>
        </div>
        <div style={{ position: 'absolute', left: '4.844vw', top: '15.417vw' }}>
          <UploadBox>
            <UploadButton isClicked={true} style={{ position: 'absolute', top: '8.594vw', left: '12.031vw' }} />
          </UploadBox>
        </div>
      </SubContentsWrapper>
    </NotSubmittedWrapper>
    </ContentsWrapper>
    <CompleteMockApplicationButton
        active={true}
        onClick={() => {
          setCurrentModal(3);
          setIsSubmitted(true);
        }}
        style={{marginBottom: '-0.87vw'}}
      />
    </>
    
  )
}

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 10px;
  gap: 0.521vw;
  padding: auto;
  //padding-top: 36.5px;
  padding-top: 1.901vw;
`;

const UploadBox = styled.div`
  //width: 628px;
  width: 32.708vw;
  //height: 238px;
  height: 12.396vw;
  flex-shrink: 0;
  //border-radius: 10px;
  border-radius: 0.521vw;
  border: 1px dashed #e57c90;
  background: var(--White, #fff);
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //height: 796px;
  height: 41.458vw;
`;