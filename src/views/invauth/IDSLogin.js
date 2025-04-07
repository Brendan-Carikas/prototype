import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InvotraLogo from '../../assets/images/InvotraLogo.png';

const IDSLogin = () => {
  const navigate = useNavigate();
  const { loginWithIDS } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Helper function to get user-friendly error messages
  const getAuthErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'An error occurred during sign in. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Sign in with Firebase Authentication using the AuthContext
      const result = await loginWithIDS(formData.username, formData.password);
      
      if (result.success) {
        // Successful login
        console.log('User logged in:', result.user);
        // Navigation is handled by the AuthContext
      } else {
        // Handle authentication errors
        setError(getAuthErrorMessage(result.error));
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{
        bgcolor: '#0E092E',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: {
            xs: '100%',
            sm: '400px'
          },
          width: '100%',
          p: {
            xs: 3,
            sm: 4
          },
          bgcolor: 'background.paper',
          borderRadius: '24px',
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box
            component="img"
            src={InvotraLogo}
            alt="Invotra Logo"
            sx={{
              maxWidth: '120px',
              width: '100%',
              height: 'auto',
              mb: 2
            }}
          />
          <Typography variant="h4" component="h2" align="center" fontWeight={500} mt={2}>
            Sign into IDS
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={3}>
            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}
            
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              placeholder="Enter your username"
              disabled={loading}
              inputProps={{
                style: { fontSize: '16px' }
              }}
              InputLabelProps={{
                style: { fontSize: '16px' }
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              placeholder="Enter your password"
              disabled={loading}
              inputProps={{
                style: { fontSize: '16px' }
              }}
              InputLabelProps={{
                style: { fontSize: '16px' }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default IDSLogin;
