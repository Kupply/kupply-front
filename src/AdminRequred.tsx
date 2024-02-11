import { Outlet } from 'react-router-dom';
import DashboardLayout from './admin/layouts/dashboard';

function AuthRequired() {
  const isAdmin = window.localStorage.getItem('isAdmin');

  return (
    <>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  );
}

export default AuthRequired;
