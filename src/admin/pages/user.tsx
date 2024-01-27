import { Helmet } from 'react-helmet-async';
// <Helmet> 태그로 감싸면 검색엔진 최적화에 유리하다고 하는데, 가장 상단 파일에만 씌워져야해서 일단 제거했습니다.

import { UserView } from '../sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <title> User | Minimal UI </title>

      <UserView />
    </>
  );
}
