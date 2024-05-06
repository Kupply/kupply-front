import SubmittedWrapper from "./SubmittedWrapper";
import Typography from "../../../../assets/Typography";
import Button01 from "../../../../assets/buttons/Button01";
import MockApplicationButton from "../../../../assets/myboardpage/MockApplication";
import { useRecoilState, useRecoilValue } from "recoil";
import { applicationModalMobileState, userSettingsState, applicationSubmittedMobileState } from "../../../../store/atom";
import Button05 from "../../../assets/buttons/Button05";
import CTA01 from "../../../assets/CTAs/CTA01";

export interface CurrentModalSubmittedProps{
  setOpenModal: (isOpened: boolean) => void;
  isOpenModal?: boolean;
  onCustomFunction?: () => void;
}

export default function CurrentModal3(props: CurrentModalSubmittedProps){
  const {setOpenModal, onCustomFunction} = props;
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalMobileState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedMobileState);

  return (
    <SubmittedWrapper currentModal={3}>
      <Typography size="4.44vw" bold="700" style={{ marginTop: '4.44vw' }}>
        모의지원을 완료 하시겠습니까?
      </Typography>
      <Typography size="3.33vw" bold="500" style={{ marginTop: '3.33vw' }}>
      모의지원을 완료한 후에는 철회가 불가능합니다.
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2.22vw',
          marginTop: '27.77vw',
        }}
      >
        <Button05
          style={{ width: '100%'}}
          onClick={() => {
            setOpenModal(false);
            setCurrentModal(0);
            setIsSubmitted(false);
          }}
        >
          취소하기
        </Button05>
        <CTA01
          onClick={() => {
            setCurrentModal(4); // 다음 창으로 이동
            onCustomFunction?.();
            console.log('is this pressed?');
          }}
        >
            모의지원 완료하기
        </CTA01>
      </div>
    </SubmittedWrapper>
  )
}