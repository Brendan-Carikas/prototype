import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAuthBackground } from "../../contexts/AuthBackgroundContext";
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";

export const ForgotPasswordForm = ({ onSubmit, formData, handleChange, error }) => {
  const { isModal, customImage, showBackground } = useAuthBackground();

  const formContent = (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: showBackground ? 1 : 0,
        p: 4,
      }}
    >
      <Stack spacing={3}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <LogoIcon />
        </Box>

        <Typography variant="h3" textAlign="center" sx={{ mb: 1 }}>
          Forgot Password
        </Typography>

        <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 2 }}>
          Enter username and we will send you a code.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit} style={{ width: "100%" }}>
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Send Reset Instructions
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <RouterLink to="/login" style={{ textDecoration: "none" }}>
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
                  Back to Sign in
                </Link>
              </RouterLink>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Box>
  );

  return formContent;
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    username: "",
  });
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await resetPassword(formData.username);
      // You can add success message or redirect logic here
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <ForgotPasswordForm
      onSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      error={error}
    />
  );
};

export default ForgotPassword;
