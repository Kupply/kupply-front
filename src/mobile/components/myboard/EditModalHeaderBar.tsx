import styled from 'styled-components';
import EditModalHeaderButton from './EditModalHeaderButton';
import { editModalMobileState, headerButtonMobileState } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import { headerButtonStateType } from '../../../store/atom';

interface buttonDataType {
  id: headerButtonStateType;
  modalId: number;
  text: string;
}

const buttonData: buttonDataType[] = [
  { id: 'basicMajor', modalId: 0, text: '나의 기본정보' },
  { id: 'interestMajor', modalId: 1, text: '관심 전공' },
  { id: 'currentGPA', modalId: 2, text: '현재 내 학점' },
  //{ id: 'hopeSemester', modalId: 3, text: '희망 지원학기'},
];

export default function MobileHeaderBar() {
  const [currentModal, setCurrentModal] = useRecoilState(editModalMobileState);
  const [headerButton, setHeaderButton] = useRecoilState(headerButtonMobileState);

  const handleButtonClick = (id: headerButtonStateType, modalId: number) => {
    setHeaderButton(id);
    setCurrentModal(modalId);
  };

  return (
    <HeaderButtonWrapper>
      {buttonData.map((button) => (
        <EditModalHeaderButton
          key={button.id}
          isClicked={headerButton === button.id}
          onClick={() => handleButtonClick(button.id, button.modalId)}
        >
          {button.text}
        </EditModalHeaderButton>
      ))}
    </HeaderButtonWrapper>
  );
}

const HeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-between;
`;
