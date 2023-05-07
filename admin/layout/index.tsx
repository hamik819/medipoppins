import Sidebar from '@/component/admin/layout/Sidebar';
import { ReactNode } from 'react';
import Container from '@/component/admin/layout/Container';
import TopBar from '@/component/admin/layout/Topbar';

export interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <TopBar />
      <Sidebar />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
