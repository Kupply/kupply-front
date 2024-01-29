import { Helmet } from 'react-helmet-async';

import { LoginView } from '../sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <title> Login | Minimal UI </title>

      <LoginView />
    </>
  );
}
