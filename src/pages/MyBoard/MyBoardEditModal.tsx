import { useState, useCallback } from 'react';
import styled from 'styled-components';
import AlertIconExclamation from '../../assets/icons/AlertIconExclamation';
import VerificationButton from '../../assets/buttons/VerificationButton';
import Typography from '../../assets/Typography';
import ModalLarge from '../../components/base/ModalLarge';

export interface ModalProps {
  currentModal: number;
  isOpenModal: boolean;
  setCurrentModal: (currentModal: number) => void;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수
}

/*
function ProfileEditPage(props: ModalProps) {
  const { currentModal, isOpenModal, setCurrentModal, setOpenModal, onClickModal } = props;

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleShowModal = () => {
    setOpenModal(true);
  };

  return (
    <Wrapper>
    
      <WrapperHead>
      <button onClick={handleShowModal}>Open Modal</button>

      {isOpenModal && (
        <ModalLarge
          currentModal={currentModal}
          isOpenModal={isOpenModal}
          setCurrentModal={setCurrentModal}
          setOpenModal={setOpenModal}
          onClickModal={onClickModal}
        />
      )}

      </WrapperHead>
      
    </Wrapper>
  );
};*/

function ProfileEditPage(props: ModalProps) {
    return (
      <Wrapper>
          
      </Wrapper>
    );
  };

function InterestMajorPage(props: ModalProps) {
  return (
    <Wrapper>
        
    </Wrapper>
  );
};


function GpaPage(props: ModalProps) {
  return (
    <Wrapper>
        
    </Wrapper>
  );
};

function GpaSavePage(props: ModalProps) {
  return (
    <Wrapper>
        
    </Wrapper>
  );
};


function HopeSemester(props: ModalProps) {
  return (
    <Wrapper>

    </Wrapper>
  );
};


const Wrapper = styled.div`
  width: 814px;
  height: 1028px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--White, #FFF);
`;

const WrapperHead = styled.div`
  width: 814px;
  height: 134px;
  flex-shrink: 0;
  fill: #FCFAFB;
  stroke-width: 1px;
  stroke: var(--DF_Grey-2, #DFDFDF);
`;

export {ProfileEditPage, InterestMajorPage, GpaPage, GpaSavePage, HopeSemester};