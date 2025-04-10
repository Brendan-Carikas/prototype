import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import ResponsiveDrawerNoAppBar from '../../components/Sidebar/ResponsiveDrawerNoAppBar';
import Footer from '../../components/Footer/Footer';
import { useFooterVisibility } from '../../hooks/useFooterVisibility';

const drawerWidth = 240;

const DrawerLayoutNoAppBar = () => {
  const showFooter = useFooterVisibility();

  return (
    <Box sx={{ display: 'flex' }}>
      <ResponsiveDrawerNoAppBar />
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
        {/* No Toolbar spacer here - this removes the space that would be taken by the AppBar */}
        <Container 
          maxWidth={false}
          sx={{
            flexGrow: 1,
            paddingTop: { xs: '48px', md: '20px' },
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

export default DrawerLayoutNoAppBar;
