import ModalMedium from '../base/ModalMedium';
import Typography from '../../assets/Typography';
import styled from 'styled-components';
import { settingsModalState } from '../../store/atom';
import { useRecoilState } from 'recoil';
import AlertIconExclamation from '../../assets/icons/AlertIconExclamation';
import { useNavigate } from 'react-router-dom';
import { useSubmit2 } from '../../utils/SettingSubmitFunctions';
import Button01 from '../../assets/buttons/Button01';

interface GpaChangeModalProps {
  modalOpen: boolean;
  setModalOpen: (state: boolean) => void;
  thirdSubmit: () => Promise<void>;
}

export function GpaChangeModal(props: GpaChangeModalProps) {
  const { modalOpen, setModalOpen, thirdSubmit } = props;
  const navigate = useNavigate();

  return (
    <Main>
      <ModalMedium
            onClickToggleModal={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <CloseButton
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              <img src={process.env.PUBLIC_URL + 'designImage/icon/icon_02.svg'} alt="Close Button" />
            </CloseButton>

            <AlertWrapper style={{ marginTop: '5.375vw' }}>
              <AlertIconExclamation width="5.885vw" height="5.885vw" />
              <Typography size="1.25vw" bold="700" style={{ marginTop: '1.302vw' }}>
                변경한 정보를 저장하시겠습니까?
              </Typography>
              <Typography size="0.9375vw" bold="500" style={{ marginTop: '1.25vw', lineHeight: '136.111%' }}>
                이중전공 지원 기간 동안에는 학점 수정이 최대 두 번까지만 가능해요.
              </Typography>
              <div style={{ display: 'flex', gap: '1.146vw', marginTop: '3.125vw' }}>
                <div
                  style={{ marginTop: '1.5625vw' }}
                  onClick={() => {
                    navigate('/settings');
                  }}
                >
                  <Button01
                    variant="outline"
                    size="medium"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    취소
                  </Button01>
                </div>
                <div
                  style={{ marginTop: '1.5625vw'}}
                  onClick={() => {
                    thirdSubmit(); 
                    setModalOpen(false);
                  }}
                >
                  <Button01 
                    variant="solid" 
                    size="medium">
                    확인
                  </Button01>
                </div>
              </div>
            </AlertWrapper>
          </ModalMedium>
    </Main>
  )
}

const CloseButton = styled.button`
  display: flex;
  //width: 60px;
  width: 3.125vw;
  //height: 60px;
  height: 3.125vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  //top: 32px;
  top: 1.667vw;
  //right: 40px;
  right: 2.083vw;
  cursor: pointer;
`;

const AlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 32.708vw;
  height: auto;
  align-items: center;
  text-align: center;
  margin: auto auto;
`;

const Main = styled.main`
  width: 42.3958vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin-top: 50px;
  top: calc(50% - 140px);
  left: 28.803vw;
  z-index: 1005;
`;
