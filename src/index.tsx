import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { GlobalStyle } from './globalStyle';
import App from './App';
import ScrollToTop from './components/ScrollToTop';
import ReactGA from 'react-ga4';

// 구글 애널리틱스 운영 서버에만 적용
if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
);
