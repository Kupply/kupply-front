import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * url 변경 추적 컴포넌트
 * url 이 변경될 때마다 pageview 이벤트 전송
 */

export default function RouteChangeTracker() {
  const location = useLocation();
  const [init, setInit] = useState(false);

  // 구글 애널리틱스 운영서버에만 적용
  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
      setInit(true);
    }
  }, []);

  // location 변경 감지 시, pageview 이벤트 전송
  useEffect(() => {
    if (init) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [init, location]);
}
