import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { client } from '../../utils/HttpClient';
import { useCookies } from 'react-cookie';
import Icon02 from '../../assets/icons/Icon02';
import Typography from '../../assets/Typography';
import Button04 from '../assets/buttons/Button04';
import Button03 from '../assets/buttons/Button03';
import AlertIconExclamation from '../../assets/icons/AlertIconExclamation';

// Modal은 아니고 그냥 페이지지만 Modal의 디자인을 따옴
export default function DeletePage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  //if (!accessToken) navigate('/login');

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };

  const userNickname = localStorage.getItem('nickname') || '';
  const [, , removeCookie] = useCookies(['accessToken']);

  const deleteMe = async () => {
    try {
      // await axios.delete(`http://localhost:8080/user/deleteMe`, config);
      await client.delete('/user/deleteMe');
      removeCookie('accessToken', { path: '/' });
      window.localStorage.clear();
      window.sessionStorage.clear();
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Main>
      <Overlay>
        <Modal>
          <ButtonWrapper>
            <TopButton
              onClick={() => {
                navigate('/settings');
              }}
            >
              <Icon02 size="100%" />
            </TopButton>
          </ButtonWrapper>
          <div style={{ height: '20.833vw' }}></div>
          <img
            src="/designImage/textField/AlertWarning.png"
            alt="delete"
            style={{ height: '22.2vw', width: '22.22vw' }}
          />
          <Typography size={'4.44vw'} bold={'700'} color="#141414" style={{ marginTop: '4.44vw' }}>
            계정을 삭제하시겠습니까?
          </Typography>
          <div style={{ width: '60.6vw', textAlign: 'center', marginTop: '4.44vw' }}>
            <Typography size={'3.33vw'} color="#141414">
              {userNickname}님, 계정 삭제 후 철회가 불가능해요. 정말 계정을 삭제하시겠습니까?
            </Typography>
          </div>
          <ActionWrapper>
            <Button04
              onClick={() => {
                navigate('/settings');
              }}
              style={{ width: '39.17vw', height: '11.67vw' }}
            >
              취소하기
            </Button04>
            <Button03
              onClick={() => {
                deleteMe();
              }}
              style={{ width: '39.17vw', height: '11.67vw' }}
            >
              삭제하기
            </Button03>
          </ActionWrapper>
        </Modal>
      </Overlay>
    </Main>
  );
}
const Main = styled.main`
  width: 100%;
  height: 1px; // 버튼 안눌림 이슈 수정
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  z-index: 1005; // Modal.tsx 와 상이한 stacking context
`;

const Overlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Modal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 80%;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1), 0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  transition: all 0.5s ease;
  z-index: 1;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const ActionWrapper = styled.div`
  width: 290px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-top: 51px;
`;
