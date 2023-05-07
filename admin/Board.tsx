import Title from '@/component/admin/Title';
import { Outlet, useLocation } from 'react-router';
import menuList from '@/constant/admin/menu-list';

const Board = () => {
  const { pathname } = useLocation();
  const { title } = menuList.filter(menu => pathname.match(menu.href))[0];
  return (
    <div>
      <Title title={title} />
      <Outlet />
    </div>
  );
};

export default Board;
