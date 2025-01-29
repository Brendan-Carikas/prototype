import React from 'react';
import { Box } from '@mui/material';
import Footer from '../../components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import authBg from '../../assets/images/auth-bg.png';
import { useAuthBackground } from '../../contexts/AuthBackgroundContext';

const AuthLayout = () => {
  const { showBackground, customImage } = useAuthBackground();
  const backgroundImage = customImage || authBg;
  const location = useLocation();
  
  // If it's the modern login page, don't apply the auth layout
  if (location.pathname === '/modern-login') {
    return <Outlet />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: showBackground ? "background.default" : "transparent",
        backgroundImage: showBackground && customImage ? `url(${customImage})` : `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pb: '76px' // Add padding to account for fixed footer
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '600px', p: 3 }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AuthLayout;
