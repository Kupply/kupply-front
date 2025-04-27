import {
  appModalUserTypeMobileState,
  applicationModalMobileState,
  applicationSubmittedMobileState,
  gpaSettingsState,
  selectedFileMobileState,
  userSettingsState,
  currentSemesterState,
} from '../../store/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Typography from '../../assets/Typography';
import styled from 'styled-components';
import ModalLarge from '../../mobile/components/base/ModalLarge';
import Icon02 from '../../assets/icons/Icon02';
import Icon03 from '../../assets/icons/Icon03';
import CurrentModal0 from '../../mobile/components/myboard/applyModal/CurrentModal0';
import CurrentModal1 from '../../mobile/components/myboard/applyModal/CurrentModal1';
import CurrentModal2 from '../../mobile/components/myboard/applyModal/CurrentModal2';
import CurrentModal3 from '../../mobile/components/myboard/applyModal/CurrentModal3';
import CurrentModal4 from '../../mobile/components/myboard/applyModal/CurrentModal4';
import NotSubmittedHeader from '../../mobile/components/myboard/applyModal/NotSubmittedHeader';
import { client } from '../../utils/HttpClient';
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

export default function MobileApplicationModal(props: ModalProps) {
  const { isOpenModal, setOpenModal, onClickModal } = props;

  const [selectedFile, setSelectedFile] = useRecoilState(selectedFileMobileState);
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalMobileState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedMobileState);

  const hopeMajor1 = useRecoilValue(userSettingsState('hopeMajor1'));
  const hopeMajor2 = useRecoilValue(userSettingsState('hopeMajor2'));
  const gpa = useRecoilValue(gpaSettingsState('candidate'));
  const candidateState = useRecoilValue(appModalUserTypeMobileState).userState[0];
  const curSemester = useRecoilValue(currentSemesterState('candidate'));
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
    if (currentModal == 3) {
      setIsSubmitted((prev) => !prev);
    }
  };

  // 모의지원 완료하기 확인에서 수행하는 function
  const closeModal = () => {
    setCurrentModal(0);
    setOpenModal(!isOpenModal);
    setIsSubmitted(false);
    window.location.reload();
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
      console.log(parseFloat(gpa.num1 + '.' + gpa.num2 + gpa.num3));
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
          {!isSubmitted ? (
            <TitleHeader>
              <CloseButton />
              <TitleText>실지원 정보 확인하기</TitleText>
              <CloseButton
                onClick={() => {
                  setOpenModal(!isOpenModal);
                }}
              >
                <Icon02 size="100%" />
              </CloseButton>
            </TitleHeader>
          ) : (
            <TitleHeader>
              <PrevButton onClick={handlePrev}>
                <Icon03 size="100%" />
              </PrevButton>
              <CloseButton
                onClick={() => {
                  setOpenModal(!isOpenModal);
                }}
              >
                <Icon02 size="100%" />
              </CloseButton>
            </TitleHeader>
          )}
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
                  return (
                    <CurrentModal3
                      isOpenModal={isOpenModal}
                      setOpenModal={setOpenModal}
                      onCustomFunction={submitApplication}
                    />
                  );
                case 4:
                  return (
                    <CurrentModal4
                      setOpenModal={setOpenModal}
                      isOpenModal={isOpenModal}
                      onCustomFunction={closeModal}
                    />
                  );
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
  width: 10vw;
  height: 10vw;
  cursor: pointer;
`;

const PrevButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 10vw;
  cursor: pointer;
`;
