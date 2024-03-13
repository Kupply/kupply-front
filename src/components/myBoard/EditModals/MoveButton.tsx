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
  style?: React.CSSProperties
};

// 문제가 MoveButton이 이들을 props로 받는다고 했는데 그러면 EditModal에서 받은걸 Modal0으로 옮기고 다시 옮기는 상황이 발생함...진짜 싫다.
export default function MoveButton(props: MoveButtonProps){
  const {isOpenModal, setOpenModal, isApplied, onClickSubmit, style } = props;
  const [isSubmitted, setIsSubmitted] = useRecoilState(editSubmittedState);
  const [isGpaChanged, setIsGpaChanged] = useRecoilState(isGpaChangedState);

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
        state={!isApplied ? 'disabled': 'pressed'}
        onClick={() => {
          // setOpenModal(!isOpenModal);
          setIsSubmitted(true);
          if (!isGpaChanged) onClickSubmit();
        }}
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