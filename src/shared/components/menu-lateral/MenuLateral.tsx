import { SvgIconComponent } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Icon,
} from '@mui/material';
import { useAppThemeContext, useAuthContext, useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import React from 'react';

interface IMenuLateral {
  children: React.ReactNode;
}

interface IListItemProps {
  label: string;
  icon: SvgIconComponent;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton
      selected={!!match}
      onClick={handleClick}
    >
      <ListItemIcon>{icon && React.createElement(icon)}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { themeName, toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={isSmDown ? 'temporary' : 'permanent'}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          display="flex"
          flexDirection="column"
          height="100%"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://ca.slack-edge.com/TASPWCYKU-U021T5TRZ7T-936bbaae5563-512"
            />
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  to={drawerOption.path}
                  onClick={isSmDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Divider />
          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  {themeName == 'light' ? (
                    <Icon>dark_mode</Icon>
                  ) : (
                    <Icon>wb_sunnyicon</Icon>
                  )}
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box
        height="100vh"
        marginLeft={isSmDown ? 0 : theme.spacing(28)}
      >
        {children}
      </Box>
    </>
  );
};
