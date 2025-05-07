import {
  appModalUserTypeState,
  applicationModalState,
  applicationSubmittedState,
  currentSemesterState,
  gpaSettingsState,
  selectedFileState,
  userSettingsState,
} from '../../../store/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Typography from '../../../assets/Typography';
import styled from 'styled-components';
import ModalLarge from '../../base/ModalLarge';
import Icon02 from '../../../assets/icons/Icon02';
import CurrentModal0 from './currentModal/Modal0';
import CurrentModal1 from './currentModal/Modal1';
import CurrentModal2 from './currentModal/Modal2';
import CurrentModal3 from './currentModal/Modal3';
import CurrentModal4 from './currentModal/Modal4';
import { client } from '../../../utils/HttpClient';
import NotSubmittedHeader from './currentModal/NotSubmittedHeader';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

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

export function UploadButton(props: UploadButtonProps) {
  const { children = '첨부 파일 업로드', ...rest } = props;
  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (newFiles && newFiles.length > 0) {
      const newFile = newFiles[0];
      setSelectedFile(newFile);
    }
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
        <div style={{ position: 'relative', alignItems: 'center' }}>
          <img
            src={process.env.PUBLIC_URL + `/designImage/myBoard/EmptySelectedFile.svg`}
            alt="Empty Selected File Image"
          />
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
          <label htmlFor="fileInput">Custom Upload Button</label>
          <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
      )}
    </div>
  );
}

export default function ApplicationModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;

  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedState);

  const hopeMajor1 = useRecoilValue(userSettingsState('hopeMajor1'));
  const hopeMajor2 = useRecoilValue(userSettingsState('hopeMajor2'));
  const gpa = useRecoilValue(gpaSettingsState('candidate'));
  const candidateState = useRecoilValue(appModalUserTypeState).userState[0];
  const curSemester = useRecoilValue(currentSemesterState('candidate'));

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
        applyGrade: curSemester.num1 + '-' + curSemester.num2,
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

  return ReactDOM.createPortal(
    <Main>
      {isOpenModal && (
        <ModalLarge onClickToggleModal={onClickModal}>
          {currentModal !== 4 ? (
            <CloseButton
              onClick={() => {
                setOpenModal(!isOpenModal);
                setCurrentModal(0);
                if (currentModal === 3) setIsSubmitted(false);
              }}
            >
              <Icon02 />
            </CloseButton>
          ) : (
            <></>
          )}
          {!isSubmitted ? (
            <>
              <ModalTitleWrapper>
                <Typography size="1.25vw" bold="700">
                  지원 정보를 확인해주세요
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

              {(() => {
                switch (currentModal) {
                  case 0:
                    return (
                      <>
                        <NotSubmittedHeader currentStep={1} />
                        <CurrentModal0 handleNext={handleNext} handlePrev={handlePrev} />
                      </>
                    );
                  case 1:
                    return (
                      <>
                        <NotSubmittedHeader currentStep={2} />
                        <CurrentModal1 handleNext={handleNext} handlePrev={handlePrev} />
                      </>
                    );
                  case 2:
                    return (
                      <>
                        <NotSubmittedHeader currentStep={3} />
                        <CurrentModal2 />
                      </>
                    );
                  default:
                    return <></>;
                }
              })()}
            </>
          ) : (
            (() => {
              switch (currentModal) {
                case 3:
                  return <CurrentModal3 setOpenModal={setOpenModal} onCustomFunction={submitApplication} />;
                case 4:
                  return <CurrentModal4 setOpenModal={setOpenModal} isOpenModal={isOpenModal} />;
                default:
                  return <></>;
              }
            })()
          )}
        </ModalLarge>
      )}
    </Main>,
    document.getElementById('root') as HTMLElement,
  );
}

// ModalLarge안에 들어가는게 부모는 position이 없고 조상은 fixed
const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  overflow-y: scroll;
  z-index: 1005;

  & > div > dialog {
    top: 10%;
  }
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
  gap: 0.221vw;
  align-items: center;
  margin-top: 1.667vw;
`;

const StyledInput = styled.input`
  position: absolute;
  top: 6.771vw;
  left: 12.031vw;
  width: 100px; /* Default width */
`;
