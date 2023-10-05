import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { GlobalStyle } from './globalStyle';
import App from './App';
import ScrollToTop from './components/ScrollToTop';

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
