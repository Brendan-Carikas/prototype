import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthBackground } from "../../contexts/AuthBackgroundContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";

export const SignupForm = ({ onSubmit, formData, handleChange, showPassword, setShowPassword, error, onLoginClick }) => {
  const { isModal, showBackground } = useAuthBackground(); // Removed unused customImage

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1000px',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center'
  };

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check if all required fields are filled
    const isValid = 
      formData.email?.trim() &&
      formData.password?.trim() &&
      formData.confirmPassword?.trim() &&
      termsAccepted;
    
    setIsFormValid(isValid);
  }, [formData, termsAccepted]);

  // CAPTCHA handling removed

  const formContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '480px'
        },
        height: {
          xs: '100vh',
          sm: 'auto'
        },
        mx: {
          xs: 0,
          sm: 'auto'
        },
        p: {
          xs: 4,
          sm: 4
        },
        bgcolor: (theme) => theme.palette.background.paper,
        borderRadius: (theme) => ({
          xs: theme.shape.authForm?.borderRadius?.xs || '0px',
          sm: theme.shape.authForm?.borderRadius?.sm || '8px'
        }),
        boxShadow: {
          xs: 0,
          sm: 1
        },
        border: {
          xs: 'none',
          sm: '1px solid rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <Box display="flex" justifyContent="center" mb={4}>
        <LogoIcon />
      </Box>
      
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 500 }}>
        Create a new account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
          {error}
        </Alert>
      )}

      <form onSubmit={(e) => {
        e.preventDefault();
        if (isFormValid) {
          onSubmit(e);
        }
      }} style={{ width: '100%' }}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            placeholder="Enter your email"
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
            helperText="Password must be at least 8 characters and contain at least one number, one uppercase letter, and one special character"
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
                    sx={{ color: 'text.secondary' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            size="small"
            placeholder="Confirm your password"
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
                    sx={{ color: 'text.secondary' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '14px', color: 'text.secondary' }}>
              By submitting this form, you are agreeing to the{' '}
              <Link 
                href="https://invotra.com/arto-data-processing-agreement" 
                target="_blank" 
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Data Processing Agreement
              </Link>
              {' '}and our{' '}
              <Link 
                href="https://invotra.com/arto-service-level-agreement/" 
                target="_blank" 
                sx={{ 
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Service Level Agreement
              </Link>
            </Typography>
          </Box>



          <Box sx={{ width: '100%', mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  name="terms"
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  I agree to the{' '}
                  <Link 
                    href="https://invotra.com/invotra-arto-application-terms-conditions/" 
                    target="_blank"
                    sx={{ 
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    terms & conditions
                  </Link>
                  *
                </Typography>
              }
            />
          </Box>

          <Box sx={{ width: '100%', mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="marketing"
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  I agree to receive occasional marketing communications.
                </Typography>
              }
            />
          </Box>


          {/* CAPTCHA section removed */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={!isFormValid}
            sx={{ mt: 2 }}
          >
            Sign up
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="textSecondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{" "}
              <RouterLink to="/auth/login" style={{ textDecoration: "none" }}>
                <Link
                  component="span"
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign in
                </Link>
              </RouterLink>
            </Typography>
          </Box>
        </Stack>
      </form>
    </Box>
  );

  if (isModal) {
    return (
      <Box sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: (theme) => theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1300,
      }}>
        <Box sx={{
          ...modalStyle,
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: (theme) => ({
            xs: theme.shape.authForm.xs,
            sm: theme.shape.authForm.sm
          }),
          boxShadow: {
            xs: 0,
            sm: 1
          }
        }}>
          {showBackground && (
            <Box
              sx={{
                flex: '1 1 60%',
                position: 'relative',
                display: { xs: 'none', md: 'block' }
              }}
            >
              <Box
                component="img"
                src="/static/images/backgrounds/arto-corner.png"
                alt=""
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  maxHeight: {
                    sm: '250px',
                    md: '300px'
                  },
                  width: 'auto',
                  marginRight: '16px',
                  marginBottom: '72px',
                  display: { xs: 'none', sm: 'none', md: 'block' }
                }}
              />
            </Box>
          )}
          {formContent}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        p: {
          xs: 0,
          sm: 5
        }
      }}
    >
      {formContent}
    </Box>
  );
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters and contain at least one number, one uppercase letter, and one special character");
      return;
    }

    try {
      await signup(formData.email, formData.password);
    } catch (error) {
      setError("Failed to create an account");
    }
  };

  const handleToggleForm = () => {
    // Add your form toggle logic here
  };

  return (
    <SignupForm
      onSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      error={error}
      onToggleForm={handleToggleForm}
      onLoginClick={() => console.log('Login clicked')}
    />
  );
};

export default Signup;
