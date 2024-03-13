import React, { lazy, Suspense, Fragment, startTransition } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';

export const IndexPage = lazy(() => import('../pages/app'));
export const UserPage = lazy(() => import('../pages/user'));

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate(); // Assuming you're using navigate somewhere

  const handleNavigation = (path: any) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'adminUser', element: <UserPage /> },
        { path: 'adminMajor', element: <UserPage /> },
        { path: 'adminUpdate', element: <UserPage /> },
      ],
    },
  ]);

  return <Fragment>{routes}</Fragment>;
}
