import { appModalUserTypeState, applicationModalState, applicationSubmittedState, gpaSettingsState, selectedFileState, userSettingsState } from "../../../store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import Typography from "../../../assets/Typography";
import styled from "styled-components";
import ModalLarge from "../../base/ModalLarge";
import Icon02 from "../../../assets/icons/Icon02";
import CurrentModal0 from "./currentModal/Modal0";
import CurrentModal1 from "./currentModal/Modal1";
import CurrentModal2 from "./currentModal/Modal2";
import CurrentModal3 from "./currentModal/Modal3";
import CurrentModal4 from "./currentModal/Modal4";
import client from "../../../utils/HttpClient";

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

/* 파일 업로드 */
export interface UploadButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isClicked: boolean;
  children?: React.ReactNode;
}

export function UploadButton(props: UploadButtonProps){
  const { children = '첨부 파일 업로드', ...rest } = props;
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles && newFiles.length > 0) {
      const newFile = newFiles[0];
      setSelectedFile(newFile);
    }
    console.log(selectedFile, 'this is the selected file but i have no idea whether this is now working or not');
  };

    return (
      <div style={{ position: 'relative' }}>
        {selectedFile! ? (
          <div>
            <img src={process.env.PUBLIC_URL + `/designImage/myBoard/SelectedFile.svg`} alt="selectedFile Image" />
            <Typography
              size="0.975vw"
              bold="500"
              style={{
                display: 'flex',
                color: '#E57C90',
                marginTop: '5px',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedFile.name}
            </Typography>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <img src={process.env.PUBLIC_URL + `/designImage/myBoard/EmptySelectedFile.svg`} alt="Empty Selected File Image" />
            <Typography
              size="0.975vw"
              bold="500"
              style={{
                display: 'flex',
                color: '#E57C90',
                marginTop: '0.885vw',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              학업계획서를 첨부해주세요 (선택)
            </Typography>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{
                position: 'absolute',
                top: '6.771vw',
                left: '12.031vw',
              }}
            />
          </div>
        )}
      </div>
    );
}


export default function ApplicationModal(props: ModalProps){
  const { isOpenModal, setOpenModal, onClickModal } = props;
  
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedState);

  const hopeMajor1 = useRecoilValue(userSettingsState('hopeMajor1'));
  const hopeMajor2 = useRecoilValue(userSettingsState('hopeMajor2'));
  const gpa = useRecoilValue(gpaSettingsState('candidate'));
  const candidateState = useRecoilValue(appModalUserTypeState).userState[0];

  // 문제는 semester가 내가 생각한거랑 다름, 지원학기가 아니라 본인의 학년이란 말이지...

  const handleNext = () => {
    if (currentModal < 4) {
      setCurrentModal(currentModal + 1);
    }
  };

  const handlePrev = () => {
    if (currentModal > 0) {
      setCurrentModal(currentModal - 1);
    }
  };
  const submitApplication = async () => {
    try {
      const applyData = {
        applyMajor1: hopeMajor1,
        applyMajor2: hopeMajor2,
        applyGPA: parseFloat(gpa.num1 + '.' + gpa.num2 + gpa.num3),
        applyTimes: candidateState === 'clicked' ? 'First' : 'Reapply',
        // applyGrade:  currentSemester1 + '-' + currentSemester2,
      };
      await client.post('/dashboard', applyData);

      if (selectedFile) {
        const formData = new FormData();
        formData.append('document', selectedFile);

        await client.post('/user/resume', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Main>
      {isOpenModal && 
      <ModalLarge onClickToggleModal={onClickModal}>
      <CloseButton
        onClick={() => {
          setOpenModal(!isOpenModal);
        }}
      >
        <Icon02/>
      </CloseButton>
        {!isSubmitted ? 
        <>
        <ModalTitleWrapper>
          <Typography size="1.25vw" bold="700" style={{ position: 'absolute', top: '2.865vw' }}>
            지원 정보 확인하기
          </Typography>
          <Typography
            size="0.9375vw"
            bold="500"
            style={{
              textAlign: 'center',
              marginTop: '0.521vw',
              color: 'rgba(20, 20, 20, 0.80)',
              lineHeight: ' 136.111% ',
            }}
          >
            실제 이중전공 지원과 동일한 정보를 입력해주세요.
          </Typography>
        </ModalTitleWrapper>
        {(()=>{
            switch(currentModal){
              case 0: 
                return <CurrentModal0 handleNext={handleNext} handlePrev={handlePrev}/>
              case 1:
                return <CurrentModal1 handleNext={handleNext} handlePrev={handlePrev}/>
              case 2: 
                return <CurrentModal2/>
              default:
                return <></>
            }
          })()}
        </>
          : 
        (()=>{
            switch(currentModal){
              case 3: 
                return <CurrentModal3 setOpenModal={setOpenModal} onCustomFunction={submitApplication}/>
              case 4:
                return <CurrentModal4 setOpenModal={setOpenModal} isOpenModal={isOpenModal}/>
              default:
                return <></>
            }
          })()
        }
      </ModalLarge>}
    </Main>
  )
}


const Main = styled.main`
  width: 100%;
  height: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  overflow-y: scroll;
  z-index: 1005;
`;


const CloseButton = styled.button`
  display: flex;
  //width: 60px;
  width: 3.125vw;
  //height: 60px;
  height: 3.125vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  //top: 32px;
  top: 1.667vw;
  //right: 40px;
  right: 2.083vw;
  cursor: pointer;
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 10px;
  gap: 0.521vw;
  align-items: center;
  //margin-top: 55px;
  margin-top: 2.865vw;
  //margin-bottom: 18px;
  margin-bottom: 0.9375vw;
`;