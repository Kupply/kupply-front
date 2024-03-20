import React, { lazy, Suspense, Fragment } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

export const IndexPage = lazy(() => import('../pages/app'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));

// ----------------------------------------------------------------------

export default function Router() {
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
        { path: 'adminMajor', element: <ProductsPage /> },
        { path: 'adminUpdate', element: <ProductsPage /> },
      ],
    },
  ]);

  return <Fragment>{routes}</Fragment>;
}
