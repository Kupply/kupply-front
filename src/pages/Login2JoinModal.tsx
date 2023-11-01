import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Typography from '../assets/Typography';
import AlertIconCheck from '../assets/icons/AlertIconCheck';
import ModalSmall from '../components/base/ModalSmall';

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 26px;
`;

const fadeInAnimation = css`
  animation: fadeIn 0.5s;
  -moz-animation: fadeIn 0.5s; /* Firefox */
  -webkit-animation: fadeIn 0.5s; /* Safari and Chrome */
  -o-animation: fadeIn 0.5s; /* Opera */
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-moz-keyframes fadeIn {
    /* Firefox */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeIn {
    /* Safari and Chrome */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-o-keyframes fadeIn {
    /* Opera */
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const fadeOutAnimation = css`
  animation: fadeOut 0.5s;
  -moz-animation: fadeOut 0.5s; /* Firefox */
  -webkit-animation: fadeOut 0.5s; /* Safari and Chrome */
  -o-animation: fadeOut 0.5s; /* Opera */
  animation-fill-mode: forwards;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-moz-keyframes fadeOut {
    /* Firefox */
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-webkit-keyframes fadeOut {
    /* Safari and Chrome */
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @-o-keyframes fadeOut {
    /* Opera */
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const ModalContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  ${(props) => (props.isOpen ? fadeInAnimation : fadeOutAnimation)};
`;

interface ModalProps {
  isOpenAlert: boolean;
  setOpenAlert: (isOpenModal: boolean) => void;
  onClickModal: () => void;
}

export default function Login2JoinModal(props: ModalProps) {
  const { isOpenAlert, setOpenAlert, onClickModal } = props;
  // 모달창 2초간만 유지
  useEffect(() => {
    if (isOpenAlert) {
      setOpenAlert(true);
      const timer = setTimeout(() => {
        setOpenAlert(false); // 추가 (애니메이션 차원)
        clearTimeout(timer); // Clear the timer to prevent multiple executions
      }, 2000);
    }
  }, [isOpenAlert, setOpenAlert, onClickModal]);

  return (
    <ModalContainer isOpen={isOpenAlert}>
      <ModalSmall onClickToggleModal={onClickModal}>
        <AlertIconCheck width="62px" height="62px" />
        <TextWrapper>
          <Typography size="mediumText" color="#141414" style={{ fontWeight: '700', lineHeight: '88.889%' }}>
            고려대학교 이메일을 입력해주세요.
          </Typography>
          <div style={{ height: '8px' }}></div>
          <Typography size="normalText" color="#141414">
            회원가입창
          </Typography>
        </TextWrapper>
      </ModalSmall>
    </ModalContainer>
  );
}
