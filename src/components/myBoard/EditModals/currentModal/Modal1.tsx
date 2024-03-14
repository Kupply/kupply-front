import styled from "styled-components";
import { UserInput } from "../../../signUp/UserInput";
import MoveButton from "../MoveButton";
import { EditCurrentModalProps } from "./Modal0";

export default function CurrentModal1(props:EditCurrentModalProps){
  const {isOpenModal, setOpenModal, onClickSubmit, isApplied} = props;
  return (
    <ContentsWrapper2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5vw' }}>
      <SubContentsWrapper>
        <ContentsTitle>희망 관심전공 변경하기</ContentsTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.667vw' }}>
          <UserInput userInfoType="hopeMajor1" locationUsed="settings"/>
          <UserInput userInfoType="hopeMajor2" locationUsed="settings"/>
        </div>
      </SubContentsWrapper>
    </div>
    <MoveButton
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
        onClickSubmit={onClickSubmit}
        isApplied={isApplied}
        style={{marginTop: '9.740vw'}}
      />
  </ContentsWrapper2>
  )
}

const ContentsWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  //width: 628px;
  width: 32.708vw;
  //align-items: left;
  //margin-left: auto;
  //margin-right: auto;
  //margin-top: 58px;
  margin-top: 3.021vw;
  //gap: 35px;
  //height: 796px;
  height: 41.458vw;
  overflow: auto;
  overflow-x: hidden;
`;


const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 9px;
  gap: 0.469vw;
`;

const ContentsTitle = styled.text`
  color: var(--Main-Black, #141414);
  font-family: Pretendard;
  //font-size: 18px;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  opacity: 0.8;
`;