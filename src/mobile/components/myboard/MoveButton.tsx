import styled from "styled-components";
import Button03 from "../../assets/buttons/Button03";
import Button04 from "../../assets/buttons/Button04";

interface MoveButtonProps{
  isOpenModal: boolean;
  setOpenModal: (isOpenModal: boolean) => void;
  onClickSubmit: () => void; // 함수;
  isApplied: boolean; 
  setIsSubmitted: (isSubmitted: boolean) => void;
  style?: React.CSSProperties;
  isGpaChanged: boolean;
};

export default function MoveButton(props: MoveButtonProps){
  const {isOpenModal, setOpenModal, isApplied, onClickSubmit, style,setIsSubmitted, isGpaChanged } = props;
  return (
    <MoveButtonWrapper style={style}>
      <Button04
        onClick={() => {
          setOpenModal(!isOpenModal);
        }}
        state='default'
      >
        취소
      </Button04>
      <Button03
        state={!isApplied ? 'default':'disabled'}
        onClick={() => {
          setIsSubmitted(true);
          if (!isGpaChanged) onClickSubmit();
        }}
        style={{background: '#D85888'}}
      >
        저장하기
      </Button03>
    </MoveButtonWrapper>
  )
}

const MoveButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2.22vw;
`;