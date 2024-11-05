import styled from 'styled-components';
import EditModalHeaderButton from '../../../assets/myboardpage/EditModalHeaderButton';
import { editModalState, headerButtonState } from '../../../store/atom';
import { useRecoilState } from 'recoil';
import { headerButtonStateType } from '../../../store/atom';

interface buttonDataType {
  id: headerButtonStateType;
  modalId: number;
  text: string;
  icon: string;
}

const buttonData: buttonDataType[] = [
  { id: 'basicMajor', modalId: 0, text: '나의 기본정보', icon: 'FiUser' },
  { id: 'interestMajor', modalId: 1, text: '관심 전공', icon: 'UUniversity' },
  { id: 'currentGPA', modalId: 2, text: '현재 내 학점', icon: 'FiCalendar' },
  //{ id: 'hopeSemester', modalId: 3, text: '희망 지원학기', icon: 'FiTrello' },
];

export default function HeaderBar() {
  const [currentModal, setCurrentModal] = useRecoilState(editModalState);
  const [headerButton, setHeaderButton] = useRecoilState(headerButtonState);

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
          <img
            src={`designImage/myBoard/${button.icon}${currentModal === button.modalId ? 'Active' : ''}.svg`}
            style={{ marginRight: '0.7vw', width: '1vw', height: '1vw' }}
          />
          <BtnText isClicked={headerButton === button.id}>{button.text}</BtnText>
        </EditModalHeaderButton>
      ))}
    </HeaderButtonWrapper>
  );
}

const HeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-between;
  //margin-top: 40px;
`;

const BtnText = styled.span<{ isClicked: boolean }>`
  color: var(--Black2, #434343);
  font-family: Pretendard;
  font-size: 1.042vw;
  font-style: normal;
  font-weight: ${(props) => (props.isClicked ? '700' : '400')};
  line-height: 100%;
`;
