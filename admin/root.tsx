import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import adminTheme from '@/theme/admin';
import { Navigate, Outlet, useLocation } from 'react-router';
import Layout from '@/component/admin/layout';
import useAuth from '@/hooks/admin/useAuth';

const AdminRoot = () => {
  const location = useLocation();
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="login" replace />;
  }

  if (location.pathname === '/admin') {
    return <Navigate to="health-tip" replace />;
  }

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
};

export default AdminRoot;
