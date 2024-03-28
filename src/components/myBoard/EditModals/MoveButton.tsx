import styled from "styled-components";
import Button03 from "../../../assets/buttons/Button03";
import Button04 from "../../../assets/buttons/Button04";
import { useRecoilState } from "recoil";
import { editSubmittedState, isGpaChangedState } from "../../../store/atom";

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
  console.log(isApplied);
  return (
    <MoveButtonWrapper style={style}>
      <Button04
        onClick={() => {
          setOpenModal(!isOpenModal);
        }}
        state='pressed'
      >
        취소
      </Button04>
      <Button03
        state={!isApplied ? 'pressed':'disabled'}
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
  //width: 628px;
  width: 32.708vw;
  //gap: 18px;
  gap: 0.9375vw;
  //margin-top: 280px;
  margin-top: 14.583vw;
`;