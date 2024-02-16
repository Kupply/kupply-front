import React, {useState, useCallback} from "react";
import SignUpSmall from "./modals/SignUpSmall";
import SignUpLarge1 from "./modals/SignUpLarge1";
import SignUpLarge2 from "./modals/SignUpLarge2";
import SignUpLarge3 from "./modals/SignUpLarge3";
import { sendEmail } from "../../utils/SignUpFunctions";
import { currentModalState, emailAtom, emailStateAtom, sendNumState } from "../../store/atom";
import { useRecoilState } from "recoil";

export function ModalHandle(setBlank: any){
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [sendNum, setSendNum] = useRecoilState(sendNumState);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [emailState, setEmailState] = useRecoilState(emailStateAtom);


  const onClickToggleSmallModal = useCallback(async () => {
    setOpenModal(!isOpenModal);
    setCurrentModal(0);
    console.log(isOpenModal);
    //setState가 마지막에 실행되므로, 첫 번째 재전송 시엔 email 값이 빈 문자열이 된다.
    if (!isOpenModal) {
      setSendNum(sendNum + 1);
      await sendEmail(sessionStorage.getItem('email') || '');
    }
    setBlank();
  }, [isOpenModal]);

  // large modal 관련
  const onClickToggleLargeModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setCurrentModal(1); // 현재 모달창 (step) 초기화
    console.log(isOpenModal); // 디버그 목적
  }, [isOpenModal]);

  return (
    <>
      {
        () => {
          switch (currentModal) {
            case 0:
              return (
                <div style={{ background: 'red', width: '100%', zIndex: 20 }}>
                  <SignUpSmall
                    currentModal={currentModal}
                    isOpenModal={isOpenModal}
                    setCurrentModal={setCurrentModal}
                    setOpenModal={setOpenModal}
                    onClickModal={onClickToggleSmallModal}
                  />
                </div>
              );
  
            case 1:
              return (
                <SignUpLarge1
                  email={email}
                  setBlank={setBlank}
                  currentModal={currentModal}
                  isOpenModal={isOpenModal}
                  setCurrentModal={setCurrentModal}
                  setOpenModal={setOpenModal}
                  onClickModal={onClickToggleLargeModal}
                />
              );
            case 2:
              return (
                <SignUpLarge2
                  currentModal={currentModal}
                  isOpenModal={isOpenModal}
                  setCurrentModal={setCurrentModal}
                  setOpenModal={setOpenModal}
                  onClickModal={onClickToggleLargeModal}
                  email={email}
                  emailState={emailState}
                  setEmail={setEmail}
                  setEmailState={setEmailState}
                  setBlank={setBlank}
                />
              );
  
            case 3:
              // setTimerTime(3);
              return (
                <SignUpLarge3
                  currentModal={currentModal}
                  isOpenModal={isOpenModal}
                  setCurrentModal={setCurrentModal}
                  setOpenModal={setOpenModal}
                  onClickModal={onClickToggleLargeModal}
                  email={email}
                />
              );
  
            default:
              return null;
          }
        }
      }
    </>
  )
}