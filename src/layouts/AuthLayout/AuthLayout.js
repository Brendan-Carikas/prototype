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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: showBackground && customImage ? `url(${customImage})` : `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.35,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pb: '76px',
          position: 'relative',
          zIndex: 1,
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
