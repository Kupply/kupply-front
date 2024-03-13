import './global.css';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  return (
    <>
      <Router />
    </>
  );
}
