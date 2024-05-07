import NotSubmittedWrapper from './NotSubmittedHeader';
import styled from 'styled-components';
import UploadButton from './UploadButton';
import Typography from '../../../../assets/Typography';
import { CurrentModalProps } from './CurrentModal0';
import { applicationModalMobileState, applicationSubmittedMobileState } from '../../../../store/atom';
import { useRecoilState } from 'recoil';
import CTA02 from '../../../assets/CTAs/CTA02';

export default function CurrentModal2() {
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalMobileState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedMobileState);
  return (
    <>
      <LeftAlignedContainer>
        <SubContentsWrapper>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', flexDirection: 'row' }}>
            <Typography
              size="3.33vw"
              style={{ color: 'var(--Main-Black, #141414)', opacity: 0.8, fontWeight: '700', marginRight: '10px' }}
            >
              학업계획서 첨부하기
            </Typography>
            <Typography
              size="3.33vw"
              bold="500"
              style={{
                color: 'var(--A8_Grey-4, #A8A8A8)',
                opacity: 0.8,
                marginTop: '-0.1vw',
              }}
            >
              (선택)
            </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <UploadBox>
              <UploadButton isClicked={true} />
            </UploadBox>
          </div>
        </SubContentsWrapper>
      </LeftAlignedContainer>

      <div style={{ marginTop: '45vw', width: '82.5vw' }}>
        <CTA02
          state="default"
          onClick={() => {
            setCurrentModal(3);
            setIsSubmitted(true);
          }}
          size="large"
          style={{ width: '100%' }}
        >
          나도 모의지원 하러가기
        </CTA02>
      </div>
    </>
  );
}

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
  padding: auto;
  margin-top: 9.44vw;
`;

const UploadBox = styled.div`
  width: 83.33vw;
  height: 22.78vw;
  border-radius: 2.78vw;
  border: 1px dashed #e57c90;
  background: var(--White, #fff);
`;

const LeftAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 90%;
`;
