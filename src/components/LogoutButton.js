import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Logout button component that handles Firebase sign out
 */
const LogoutButton = ({ variant = "text", color = "inherit", size = "medium" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to login page after logout
      navigate('/ids-login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
