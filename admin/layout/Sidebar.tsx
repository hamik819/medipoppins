import { NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useLocation } from 'react-router';
import MenuList from '@/constant/admin/menu-list';
import useSidebar from '@/hooks/admin/useSidebar';
import Logo from '@/component/common/Logo';

const Sidebar = () => {
  const location = useLocation();
  const rootTheme = useTheme();
  const { isOpenSideBar } = useSidebar();

  return (
    <Drawer
      anchor="left"
      variant="persistent"
      open={isOpenSideBar}
      PaperProps={{
        sx: {
          width: 265,
          backgroundColor: rootTheme.palette.black.A100,
        },
      }}>
      <Box mt={2} px={1}>
        <NavLink
          to="/admin"
          style={{
            display: 'block',
            textAlign: 'center',
          }}>
          <Logo />
        </NavLink>
        <List>
          {MenuList.map(menu => (
            <List component="li" disablePadding key={menu.title}>
              <ListItem
                button
                disableRipple
                component={NavLink}
                to={menu.href}
                sx={{
                  mb: 1,
                  color: 'rgba(255,255,255,.7)',
                  ':hover': {
                    backgroundColor: '#4B5061 !important',
                    color: '#fff',
                  },
                  ...(location.pathname.match(menu.href) && {
                    color: '#fff',
                    fontWeight: 'bold !important',
                    backgroundColor: '#4B5061 !important',
                  }),
                }}>
                <ListItemText>{menu.title}</ListItemText>
              </ListItem>
            </List>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
