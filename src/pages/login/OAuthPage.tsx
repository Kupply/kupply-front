import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { api_url } from '../../utils/HttpClient';

export default function OAuthPage() {
  const { koreapasUUID } = useParams<{ koreapasUUID: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (!koreapasUUID) {
      navigate('/');
      return;
    }

    const verifyUUID = async () => {
      try {
        const url = `${api_url}/auth/koreapasVerify`;

        const response = await axios.post(url, { uuid: koreapasUUID });

        if (response.data.data.isKupply) {
          localStorage.setItem('accessToken', response.data.data.accessToken);
          localStorage.setItem('refreshToken', response.data.data.refreshToken);
          localStorage.setItem('isLogin', 'true');
          navigate('/');
          window.location.reload();
        } else {
          setError('쿠플라이 회원이 아니에요. \n고파스 아이디로 쿠플라이 서비스에 회원가입 해주세요.');
          setRedirectPath('/signup1');
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError('고파스 인증에 실패했어요. 고파스 아이디로 직접 로그인 해주세요.');
          setRedirectPath('/login');
        } else if (axios.isAxiosError(err) && err.response?.status === 403) {
          setError('고파스 강등 또는 미인증 회원은 쿠플라이 서비스를 이용할 수 없어요.');
          setRedirectPath('/');
        } else {
          setError('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
          setRedirectPath('/');
        }
      }
    };

    verifyUUID();
  }, [koreapasUUID, navigate]);

  useEffect(() => {
    if (error && redirectPath) {
      alert(error);
      navigate(redirectPath);
    }
  }, [error, redirectPath, navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>자동 로그인 중이에요.</h2>
      <p>조금만 기다려주세요 !</p>
    </div>
  );
}
