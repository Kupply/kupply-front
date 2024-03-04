import React, {useState, useCallback} from "react";
import SignUpSmall from "./modals/SignUpSmall";
import SignUpLarge1 from "./modals/SignUpLarge1";
import SignUpLarge2 from "./modals/SignUpLarge2";
import SignUpLarge3 from "./modals/SignUpLarge3";
import { sendEmail } from "../../utils/SignUpFunctions";
import { currentModalState, isOpenModalState, sendNumState, userState } from "../../store/atom";
import { useRecoilState } from "recoil";

interface ModalHandleProps {
  setBlank: () => void;
}

export function ModalHandle ({setBlank}: ModalHandleProps) {
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);
  const [isOpenModal, setOpenModal] = useRecoilState(isOpenModalState);
  const [sendNum, setSendNum] = useRecoilState(sendNumState);
  const [email, setEmail] = useRecoilState(userState('kuEmail'));

  const onClickToggleSmallModal = useCallback(async () => {
    setOpenModal(!isOpenModal);
    setCurrentModal(0);
    console.log(isOpenModal);
    //setState가 마지막에 실행되므로, 첫 번째 재전송 시엔 email 값이 빈 문자열이 된다.
    if (!isOpenModal) {
      setSendNum(sendNum + 1);
      await sendEmail(sessionStorage.getItem('kuEmail') || '');
    }
    setBlank();
  }, [isOpenModal]);

  console.log(isOpenModal);

  // large modal 관련
  const onClickToggleLargeModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    setCurrentModal(1); // 현재 모달창 (step) 초기화
    console.log(isOpenModal); // 디버그 목적
  }, [isOpenModal]);

  return (
    <>
      {
        (() => {
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
                  email={email.info}
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
                  email={email.info}
                  emailState={email.infoState}
                  setEmail={(v) => setEmail((prev) => ({...prev, info: v}))}
                  setEmailState={(s) => setEmail((prev) => ({...prev, infoState: s}))}
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
                  email={email.info}
                />
              );
  
            default:
              return null;
          }
        })()
      }
    </>
  )
}