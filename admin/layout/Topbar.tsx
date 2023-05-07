import useSidebar from '@/hooks/admin/useSidebar';
import {
  AppBar,
  Button,
  Chip,
  IconButton,
  styled,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LinkButton from '@/component/common/LinkButton';
import useAuth from '@/hooks/admin/useAuth';

const TopBar = () => {
  const { isOpenSideBar, toggleSideBar } = useSidebar();
  const { goLogout } = useAuth();
  return (
    <AppBar
      sx={{
        backgroundColor: '#fff',
        boxShadow: 'none',
        border: '1px solid #ececec',
        paddingLeft: isOpenSideBar ? '265px' : '',
      }}>
      <Toolbar>
        <ToolbarWrap>
          <IconButton size="large" onClick={toggleSideBar}>
            <MenuIcon />
          </IconButton>
          <Utils>
            <LinkButton to="/" target="_blank">
              랜딩페이지
            </LinkButton>
            {/* <LinkButton to="/">마이페이지</LinkButton> */}
            <Button
              type="button"
              onClick={goLogout}
              style={{
                border: '1px solid rgb(49,201,201)',
                padding: '2px 10px',
              }}>
              로그아웃
            </Button>
          </Utils>
        </ToolbarWrap>
      </Toolbar>
    </AppBar>
  );
};

const ToolbarWrap = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const Utils = styled('div')(() => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
}));

export default TopBar;
