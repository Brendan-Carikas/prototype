import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, Container } from '@mui/material';
import ResponsiveDrawer from '../../components/Sidebar/ResponsiveDrawer';
import Footer from '../../components/Footer/Footer';
import { useFooterVisibility } from '../../hooks/useFooterVisibility';

const drawerWidth = 240;

const DrawerLayout = () => {
  const showFooter = useFooterVisibility();

  return (
    <Box sx={{ display: 'flex' }}>
      <ResponsiveDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          p: 0
        }}
      >
        <Toolbar /> {/* This creates space for the AppBar */}
        <Container 
          maxWidth={false}
          sx={{
            flexGrow: 1,
            paddingTop: '20px',
            paddingLeft: '20px !important',
            paddingRight: '20px !important',
            ml: 0,
            mr: 0
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          <Box
            sx={{
              opacity: showFooter ? 1 : 0,
              visibility: showFooter ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
              mb: 2,
              mt: 'auto'
            }}
          >
            <Footer />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default DrawerLayout;
