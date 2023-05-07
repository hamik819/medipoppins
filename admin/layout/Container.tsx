import { Box } from '@mui/material';
import useSidebar from '@/hooks/admin/useSidebar';
import { LayoutProps } from '@/component/admin/layout';

const Container = ({ children }: LayoutProps) => {
  const { isOpenSideBar } = useSidebar();
  return (
    <Box
      style={{
        display: 'flex',
        flex: '1 1 auto',
        maxWidth: '100%',
        paddingTop: 64,
        paddingLeft: isOpenSideBar ? 280 : '',
      }}>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          width: '100%',
          padding: 4,
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default Container;
