import { editModalState, errorMessageState, gpaSettingsState, isGpaChangedState, semesterSettingsState, userProfileState, userSettingsState } from "../../../store/atom";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
import { useState, useRef } from "react";
import styled from "styled-components";
import HeaderBar from "./HeaderBar";
import Typography from "../../../assets/Typography";
import ModalLarge from "../../base/ModalLarge";
import Icon02 from "../../../assets/icons/Icon02";
import CurrentModal0 from "./currentModal/Modal0";
import CurrentModal1 from "./currentModal/Modal1";
import CurrentModal2 from "./currentModal/Modal2";
import CurrentModal3 from "./currentModal/Modal3";
import Button01 from "../../../assets/buttons/Button01";
import AlertIconExclamation from "../../../assets/icons/AlertIconExclamation";
import { useNavigate } from 'react-router-dom';
import client from "../../../utils/HttpClient";

export interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickModal: () => void; // 함수;
  isApplied: boolean;
}

export default function EditModal(props: ModalProps){
  const { isOpenModal, setOpenModal, onClickModal, isApplied } = props;
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  useResetRecoilState(isGpaChangedState);
  const [isGpaChanged, setIsGpaChanged] = useRecoilState(isGpaChangedState);
  const [currentModal, setCurrentModal] = useRecoilState(editModalState);
  const originNickname = useRef<string>(localStorage.getItem('nickname'));
  const originstdId = useRef<string>(localStorage.getItem('studentId'));
  const originFirstMajor = useRef<string>(localStorage.getItem('firstMajor'));
  const originHopeMajor1 = useRef<string>(localStorage.getItem('hopeMajor1'));
  const originHopeMajor2 = useRef<string>(localStorage.getItem('hopeMajor2'));
  const originGPA1 = useRef<string>(localStorage.getItem('curGPA')?.charAt(0) || '');
  const originGPA2 = useRef<string>(localStorage.getItem('curGPA')?.charAt(2) || '');
  const originGPA3 = useRef<string>(localStorage.getItem('curGPA')?.charAt(3) || '');
  const originHopeSemester1 = useRef<string>(localStorage.getItem('hopeSemester')?.charAt(2) || '');
  const originHopeSemester2 = useRef<string>(localStorage.getItem('hopeSemester')?.charAt(3) || '');
  const originHopeSemester3 = useRef<string>(localStorage.getItem('hopeSemester')?.charAt(5) || '');
  const originUserProfilePic = useRef<string>(localStorage.getItem('userProfilePic'));

  const nickname = useRecoilValue(userSettingsState('nickname'));
  const stdId = useRecoilValue(userSettingsState('studentId'));
  const firstMajor = useRecoilValue(userSettingsState('firstMajor'));
  const hopeMajor1 = useRecoilValue(userSettingsState('hopeMajor1'));
  const hopeMajor2 = useRecoilValue(userSettingsState('hopeMajor2'));
  const GPA = useRecoilValue(gpaSettingsState('candidate'));
  const hopeSemester = useRecoilValue(semesterSettingsState('candidate'));
  const userProfile = useRecoilValue(userProfileState);

  const onClickSubmit = async () => {
    let updateData = {};

    if (originNickname.current !== nickname.info) {
      updateData = { ...updateData, newNickname: nickname.info };
    }
    if (originstdId.current !== stdId.info) {
      updateData = { ...updateData, newStudentId: stdId.info };
    }
    if (originFirstMajor.current !== firstMajor.info) {
      updateData = { ...updateData, newFirstMajor: firstMajor.info };
    }
    if (originHopeMajor1.current !== hopeMajor1.info) {
      updateData = { ...updateData, newHopeMajor1: hopeMajor1.info };
    }
    if (originHopeMajor2.current !== hopeMajor2.info) {
      updateData = { ...updateData, newHopeMajor2: hopeMajor2.info };
    }
    if (originGPA1.current !== GPA.num1 || originGPA2.current !== GPA.num2 || originGPA3.current !== GPA.num3) {
      const newGpa = parseFloat(GPA.num1 + '.' + GPA.num2 + GPA.num3);
      const oldGpa = parseFloat(originGPA1.current + '.' + originGPA2.current + originGPA3.current);

      if (Math.abs(oldGpa - newGpa) >= 1.5) {
        alert('비정상적인 학점 변경이 감지되었습니다. 이메일로 문의바랍니다.');
        navigate('/myboard');
      } else {
        updateData = { ...updateData, newCurGPA: newGpa };
      }
    }
    if (
      originHopeSemester1.current !== hopeSemester.num1 ||
      originHopeSemester2.current !== hopeSemester.num2 ||
      originHopeSemester3.current !== hopeSemester.num3
    ) {
      const newHopeSemester = '20' + hopeSemester.num1 + hopeSemester.num2 + '-' + hopeSemester.num3;
      updateData = { ...updateData, newHopeSemester: newHopeSemester };
    }
    if (originUserProfilePic.current !== userProfile.pic) {
      updateData = { ...updateData, newProfilePic: userProfile.pic };
    }

    if (Object.keys(updateData).length !== 0) {
      try {
        // await axios.post('http://localhost:8080/user/updateMe', updateData, config);
        await client.post('/user/updateMe', updateData);

        window.location.reload(); // 페이지 새로고침.
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Main>
      {isOpenModal && isSubmitted && isGpaChanged && (
        <ModalLarge onClickToggleModal={onClickModal}>
          <CloseButton
            onClick={() => {
              setOpenModal(!isOpenModal);
            }}
          >
            <Icon02/>
          </CloseButton>
          <AlertWrapper>
            <AlertIconExclamation width="5.885vw" height="5.885vw" />
            <Typography size="1.25vw" bold="700" style={{ marginTop: '1.302vw' }}>
              변경한 학점을 저장하시겠습니까?
            </Typography>
            <Typography size="0.9375vw" bold="500" style={{ marginTop: '1.25vw', lineHeight: '136.111%' }}>
              수정을 저장하면 이번 이중전공 지원 시즌 동안
              <br />단 한 번의 학점 수정 기회가 남아요.
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1.146vw', marginTop: '4.167vw' }}>
              <Button01
                variant="outline"
                size="medium"
                onClick={() => {
                  setIsSubmitted(false);
                }}
              >
                취소
              </Button01>
              <Button01
                variant="solid"
                size="medium"
                onClick={() => {
                  setOpenModal(!isOpenModal);
                  setIsSubmitted(true);
                  onClickSubmit();
                }}
              >
                확인
              </Button01>
            </div>
          </AlertWrapper>
        </ModalLarge>
      )}
      {isOpenModal && !isSubmitted && (
      <ModalLarge onClickToggleModal={onClickModal}>
        <HeaderWrapper>
          <CloseButton
            onClick={() => {
              setOpenModal(!isOpenModal);
            }}
          >
            <Icon02/>
          </CloseButton>
          <Typography size="1.042vw" bold="700" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '2.083vw' }}>
            프로필 정보 수정하기
          </Typography>
          <div style={{ height: '2.083vw' }}></div>
        <HeaderBar/>
      </HeaderWrapper>
      {(() => {
        switch(currentModal){
          case 0:
            return <CurrentModal0 
                      isOpenModal={isOpenModal}
                      setOpenModal={setOpenModal}
                      onClickSubmit={onClickSubmit}
                      isApplied={isApplied}/>
          case 1:
            return <CurrentModal1
            isOpenModal={isOpenModal}
            setOpenModal={setOpenModal}
            onClickSubmit={onClickSubmit}
            isApplied={isApplied}/>
          case 2:
            return <CurrentModal2
            isOpenModal={isOpenModal}
                      setOpenModal={setOpenModal}
                      onClickSubmit={onClickSubmit}
                      isApplied={isApplied}/>
          case 3:
            return <CurrentModal3
            isOpenModal={isOpenModal}
                      setOpenModal={setOpenModal}
                      onClickSubmit={onClickSubmit}
                      isApplied={isApplied}/>
        }
      })()}
    </ModalLarge>
    )}
  </Main>
  )
}

const Main = styled.main`
  width: 100%;
  height: 1px; // 버튼 안눌림 이슈 수정
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1005;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //width: 814px;
  width: 120%;
  //height: 134px;
  height: 6.979vw;
  flex-shrink: 0;
  background-color: #fcfafb;
  border-bottom: 1px solid var(--DF_Grey-2, #dfdfdf);
  //margin-top: -16px;
  margin-top: -0.833vw;
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

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //width: 628px;
  width: 32.708vw;
  align-items: center;
  text-align: center;
  margin: auto auto;
`;