import NotSubmittedWrapper from './NotSubmittedHeader';
import styled from 'styled-components';
import UploadButton from '../../../../assets/myboardpage/UploadButton';
import Typography from '../../../../assets/Typography';
import CompleteMockApplicationButton from '../../../../assets/myboardpage/CompleteMockApplication';
import CTA04 from '../../../../assets/CTAs/CTA04';
import { CurrentModalProps } from './Modal0';
import { applicationModalState, applicationSubmittedState } from '../../../../store/atom';
import { useRecoilState } from 'recoil';
import CTA01 from '../../../../assets/CTAs/CTA01';

export default function CurrentModal2() {
  const [currentModal, setCurrentModal] = useRecoilState(applicationModalState);
  const [isSubmitted, setIsSubmitted] = useRecoilState(applicationSubmittedState);
  return (
    <>
      <LeftAlignedContainer>
        <SubContentsWrapper>
          <div style={{ display: 'flex', whiteSpace: 'nowrap', flexDirection: 'row' }}>
            <Typography
              size="0.9375vw"
              style={{ color: 'var(--Main-Black, #141414)', opacity: 0.8, fontWeight: '700', marginRight: '10px' }}
            >
              학업계획서 첨부하기
            </Typography>
            <Typography
              size="0.9375vw"
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
          <div>
            <UploadBox>
              <UploadButton isClicked={true} />
            </UploadBox>
          </div>
        </SubContentsWrapper>

        <CTABox>
          <CTA04
            onClick={() => {
              setCurrentModal(3);
              setIsSubmitted(true);
            }}
          />
        </CTABox>
      </LeftAlignedContainer>
    </>
  );
}

const SubContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.521vw;
  padding: auto;
`;

const UploadBox = styled.div`
  //width: 628px;
  width: 32.708vw;
  //height: 238px;
  height: 12.396vw;
  flex-shrink: 0;
  //border-radius: 10px;
  border-radius: 0.521vw;
  border: 1px dashed #e57c90;
  background: var(--White, #fff);
`;

const LeftAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Align children to the left */
  height: 15vw;
  margin-top: 7vw;
  margin-bottom: 10vw;
  width: 36.3vw;
`;

const CTABox = styled.div`
  display: flex;
  position: relative;

  margin-top: 3.5vw;
`;
