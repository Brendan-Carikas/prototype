import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
// Removed unused ApartmentIcon import
import PaymentIcon from '@mui/icons-material/Payment';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import logo from '../../assets/images/arto-site-logo.png';
import { useAuth } from '../../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const ResponsiveDrawer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const currentPath = location.pathname;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const menuItems = [
    {
      text: 'Conversations',
      icon: <ChatIcon />,
      path: '/app/dashboards/dashboard2'
    },
    {
      text: 'Billing',
      icon: <PaymentIcon />,
      path: '/app/dashboards/billing'
    },
    {
      text: 'Assistants',
      icon: <SmartToyIcon />,
      path: '/app/dashboards/assistants'
    }
  ];

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!isMobile && (
            <Box 
              component="img" 
              src={logo} 
              alt="Arto" 
              sx={{ 
                height: '36px',
                display: 'block'
              }} 
            />
          )}
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => handleNavigation(item.path)}
                selected={currentPath === item.path}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(28, 19, 98, 0.08)',
                    '&:hover': {
                      backgroundColor: 'rgba(28, 19, 98, 0.12)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: currentPath === item.path ? 'primary.main' : 'inherit',
                    minWidth: '40px'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': {
                      fontWeight: currentPath === item.path ? 600 : 400
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: 'inherit',
                  minWidth: '40px'
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout" 
                sx={{ 
                  '& .MuiTypography-root': {
                    fontWeight: 400
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: "#fff",
          color: "#000",
          boxShadow: "0px 7px 30px 0px rgb(90 114 123 / 11%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box 
            component="img" 
            src={logo} 
            alt="Arto" 
            sx={{ 
              height: '36px',
              display: { xs: 'block', md: 'none' }
            }} 
          />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation drawer"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Main content is handled by DrawerLayout */}
    </Box>
  );
};

export default ResponsiveDrawer;
