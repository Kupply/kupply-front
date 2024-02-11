import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: '대시보드',
    path: '/admin',
    icon: icon('ic_analytics'), // 수정 필요
  },
  {
    title: '회원 관리',
    path: '/adminUser',
    icon: icon('ic_user'), // 수정 필요
  },
  {
    title: '전공 관리',
    path: '/adminMajor',
    icon: icon('ic_blog'), // 수정 필요
  },
  {
    title: '모의지원 관리',
    path: '/adminApply',
    icon: icon('ic_cart'), // 수정 필요
  },
  {
    title: '업데이트 관리',
    path: '/adminUpdate',
    icon: icon('ic_blog'), // 수정 필요
  },
];

export default navConfig;
