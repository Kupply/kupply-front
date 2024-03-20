import SubmittedWrapper from "./SubmittedWrapper";
import { useRecoilState, useRecoilValue } from "recoil";
import { userSettingsState } from "../../../../store/atom";
import Typography from "../../../../assets/Typography";
import { CurrentModalSubmittedProps } from "./Modal3";
import Button03 from "../../../../assets/buttons/Button03";


export default function CurrentModal4(props: CurrentModalSubmittedProps){
  const {setOpenModal, isOpenModal} = props;
  const name = useRecoilValue(userSettingsState('name'));

  return (
    <SubmittedWrapper currentModal={4}>
      <Typography size="1.25vw" bold="700" style={{ marginTop: '1.3021vw' }}>
        모의지원이 완료되었습니다.
      </Typography>
      <Typography size="0.9375vw" bold="500" style={{ marginTop: '0.521vw', lineHeight: '136.111%' }}>
        {name.info} 님의 이중전공 합격을 기원합니다.
      </Typography>
      <Button03
        onClick={() => {
          setOpenModal(!isOpenModal);
          window.location.reload();
        }}
        style={{ marginTop: '10.573vw', width: '100%' }}
      >
        확인
      </Button03>
    </SubmittedWrapper>
  )
}