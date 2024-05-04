import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import client from "../../utils/HttpClient";
import { useCookies } from "react-cookie";

export default function DeletePage(){
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

  return(
    <Main>
      <Overlay>
      <Modal>
        
      </Modal>
    </Overlay>
    </Main>
  )
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
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  transition: all 0.5s ease;
  z-index: 1;
`;

