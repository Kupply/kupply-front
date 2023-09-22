import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function AuthRequired() {
  const navigate = useNavigate();
  const isLogined = window.localStorage.getItem('isLogin');

  useEffect(() => {
    if (isLogined !== 'true') {
      alert('login required');
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthRequired;
