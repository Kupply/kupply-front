import React, {useState, useCallback} from "react";
import SignUpSmall from "./modals/SignUpSmall";
import SignUpLarge1 from "./modals/SignUpLarge1";
import SignUpLarge2 from "./modals/SignUpLarge2";
import SignUpLarge3 from "./modals/SignUpLarge3";
import { sendEmail } from "../../../utils/SignUpFunctions";
import { currentModalState, isOpenModalState,userState } from "../../../store/atom";
import { useRecoilState } from "recoil";
import { StateOptions } from "../../assets/field/Input02";

interface ModalHandleProps {
  setBlank: () => void;
  onClickToggleSmallModal: () => Promise<void>;
  onClickToggleLargeModal: () => void;
}

export function ModalHandle ({setBlank, onClickToggleLargeModal, onClickToggleSmallModal}: ModalHandleProps) {
  const [currentModal, setCurrentModal] = useRecoilState(currentModalState);
  const [isOpenModal, setOpenModal] = useRecoilState(isOpenModalState);
  const [email, setEmail] = useRecoilState(userState('email'));
  
  return (
    <>
      {
        (() => {
          switch (currentModal) {
            case 0:
              return (
                <div style={{ background: 'red', width: '100%', zIndex: 20, transform: 'translateY(+35.375vw)', }}>
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
                  emailState={email.infoState as StateOptions}
                  setEmail={(v: string) => setEmail((prev) => ({...prev, info: v}))}
                  setEmailState={(s: StateOptions) => setEmail((prev) => ({...prev, infoState: s}))}
                  setBlank={setBlank}
                />
              );
  
            case 3:
              //setTimerTime(3);
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