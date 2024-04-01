import styled from "styled-components";
import { ReactNode, PropsWithChildren } from "react";

const Overlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 80%;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  transition: all 0.5s ease;
  z-index: 1;
`;

interface ModalProps {
  onClickToggleModal: () => void;
  children: ReactNode; // Allow multiple children
  // 아무 인자를 받지 않고, void 를 return (=no return) 하는 함수
  // This kind of function is commonly used as a 'callback' or 'event handler' to specify what should happen when a modal is closed.
}

export default function ModalLarge({ onClickToggleModal, children }: PropsWithChildren<ModalProps>){
  return (
    <Overlay>
      <Modal>
        {children}
      </Modal>
    </Overlay>
  )
}