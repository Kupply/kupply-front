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
          console.log('Hello There');
          console.log(isGpaChanged); // 학점이 변경되어서 submit을 못한다??
          // if (!isGpaChanged.changed) onClickSubmit();
          onClickSubmit();
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