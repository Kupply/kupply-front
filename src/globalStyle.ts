import { createGlobalStyle } from "styled-components";
import GmarketSans from "./fonts/GmarketSans.woff2";

export const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");
  
  // @import url('https://webfontworld.github.io/gmarket/GmarketSans.css');
  // local 통해 import 하는 방식으로 변경 (GmarketSans 오류 해결 목적 - file name unmatching)
  @font-face {
    font-family: 'GmarketSans';
    src: local('GmarketSans'), local('GmarketSans');
    font-style: normal;
    src: url(${GmarketSans}) format('truetype');
    font-display: swap;
  } 
  
  body {
    margin: 0;
    padding: 0;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif, monospace;
  }

  textarea, button, button:active {
    resize: none;
    outline: none;
    border: none;
  }

  a, a:visited {
    text-decoration: none;
  }

  input, textarea {
    border: none;

    :focus {
      outline: none;
    }
  }
  button {
    border: none;
	  background: none;
    padding: 0;
    cursor: pointer;
  }
`;
