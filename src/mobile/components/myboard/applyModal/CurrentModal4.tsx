import SubmittedWrapper from "./SubmittedWrapper";
import Typography from "../../../../assets/Typography";
import { useRecoilState } from "recoil";
import { applicationModalState } from "../../../../store/atom";
import CTA01 from "../../../assets/CTAs/CTA01";

export interface CurrentModalSubmittedProps{
  setOpenModal: (isOpened: boolean) => void;
  isOpenModal?: boolean;
  onCustomFunction?: () => void;
}

export default function CurrentModal4(props: CurrentModalSubmittedProps){
  const {setOpenModal, onCustomFunction} = props;
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalState);

  return (
    <SubmittedWrapper currentModal={3}>
      <Typography size="4.44vw" bold="700" style={{ marginTop: '4.44vw' }}>
        모의지원을 완료 하시겠습니까?
      </Typography>
      <Typography size="3.33vw" bold="500" style={{ marginTop: '3.33vw' }}>
      고대빵 님의 이중전공 합격을 기원합니다.
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '40.77vw'
        }}
      >
        <CTA01
          onClick={() => {
            setCurrentModal(4); // 다음 창으로 이동
            onCustomFunction?.();
          }}
        >
            모의지원 완료하기
        </CTA01>
      </div>
    </SubmittedWrapper>
  )
}