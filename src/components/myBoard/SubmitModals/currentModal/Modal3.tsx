import SubmittedWrapper from "./SubmittedWrapper";
import Typography from "../../../../assets/Typography";
import Button01 from "../../../../assets/buttons/Button01";
import MockApplicationButton from "../../../../assets/myboardpage/MockApplication";
import { useRecoilState } from "recoil";
import { applicationModalState, applicationSubmittedState } from "../../../../store/atom";

export interface CurrentModalSubmittedProps{
  setOpenModal: (isOpened: boolean) => void;
  isOpenModal?: boolean;
  onCustomFunction?: () => void;
}

export default function CurrentModal3(props: CurrentModalSubmittedProps){
  const {setOpenModal, onCustomFunction} = props;
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedState);

  return (
    <SubmittedWrapper currentModal={3}>
      <Typography size="1.25vw" bold="700" style={{ marginTop: '1.3021vw' }}>
        모의지원을 완료 하시겠습니까?
      </Typography>
      <Typography size="0.9375vw" bold="500" style={{ marginTop: '0.521vw', lineHeight: '136.111%' }}>
        지원을 완료한 후에는 철회 및 (남은 모의지원 기간 동안) 개인정보 수정이 불가능합니다.
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.146vw',
          marginTop: '2.604vw',
        }}
      >
        <Button01
          variant="outline"
          size="medium"
          style={{ width: '32.668vw', height: '3.542vw' }}
          onClick={() => {
            setOpenModal(false);
            setIsSubmitted(false);
            setCurrentModal(0);
          }}
        >
          <Typography size="bodyText" style={{ fontWeight: 500, lineHeight: '100%', color: '#D85888' }}>
            취소하기
          </Typography>
        </Button01>
        <MockApplicationButton
          onClick={() => {
            setCurrentModal(4); // 다음 창으로 이동
            onCustomFunction?.();
          }}
          style={{ width: '32.668vw', height: '3.542vw' }}
          // 글자 디자인 수정 필요
        >
          <Typography size="1.042vw" style={{ fontWeight: 600, lineHeight: '80%', color: '#FFF' }}>
            모의지원 완료하기
          </Typography>
        </MockApplicationButton>
      </div>
    </SubmittedWrapper>
  )
}