import {
  appModalUserTypeState,
  applicationModalState,
  applicationSubmittedState,
  gpaSettingsState,
  selectedFileState,
  userSettingsState,
} from '../../store/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Typography from '../../assets/Typography';
import styled from 'styled-components';
import ModalLarge from '../../mobile/components/base/ModalLarge';
import Icon02 from '../../assets/icons/Icon02';
import CurrentModal0 from '../../mobile/components/myboard/applyModal/CurrentModal0';
import CurrentModal1 from '../../components/myBoard/SubmitModals/currentModal/Modal1';
import CurrentModal2 from '../../components/myBoard/SubmitModals/currentModal/Modal2';
import CurrentModal3 from '../../components/myBoard/SubmitModals/currentModal/Modal3';
import CurrentModal4 from '../../components/myBoard/SubmitModals/currentModal/Modal4';
import NotSubmittedHeader from '../../mobile/components/myboard/applyModal/NotSubmittedHeader';
import client from '../../utils/HttpClient';
import { useRef } from 'react';

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
}

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

export default function MobileApplicationModal(props: ModalProps) {
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
      {isOpenModal && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <TitleHeader>
            <PrevButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              <Icon02 size="3.61vw" />
            </PrevButton>
            <TitleText>실지원 정보 확인하기</TitleText>
            <CloseButton
              onClick={() => {
                setOpenModal(!isOpenModal);
              }}
            >
              <Icon02 size="3.61vw" />
            </CloseButton>
          </TitleHeader>
          {!isSubmitted ? (
            <>
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
                        <NotSubmittedHeader currentStep={2} />
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
    </Main>
  );
}

// ModalLarge안에 들어가는게 부모는 position이 없고 조상은 fixed
const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  overflow-y: scroll;
  width: 100%;
  height: 100%;

  z-index: 1005;
`;

const TitleHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 83.33vw;
  height: 6.67vw;

  margin-top: 3.61vw;
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.221vw;

  margin-top: 1.667vw;
`;

const StyledInput = styled.input`
  position: absolute;
  top: 6.771vw;
  left: 12.031vw;
  width: 100px; /* Default width */
`;

///////////////// text /////////////////
const TitleText = styled.text`
  color: #141414;
  text-align: center;
  font-family: Pretendard;
  font-size: 3.89vw;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
`;

///////////////// BTN /////////////////

const CloseButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.125vw;
  height: 3.125vw;

  cursor: pointer;
`;

const PrevButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.125vw;
  height: 3.125vw;

  cursor: pointer;
`;
