import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthRequired() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogined = window.localStorage.getItem('isLogin');
    if (isLogined !== 'true') {
      alert('로그인이 필요한 서비스입니다. 로그인 후 이용해주세요.');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthRequired;
