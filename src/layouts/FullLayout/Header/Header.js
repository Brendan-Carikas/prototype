import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
} from "@mui/material";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../../contexts/AuthContext";
import logo from "../../../assets/images/arto-site-logo.png";

const Header = ({ sx }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <AppBar
      sx={{
        ...sx,
        background: "#fff",
        color: "#000",
        boxShadow: "0px 7px 30px 0px rgb(90 114 123 / 11%)",
      }}
      position="fixed"
    >
      <Toolbar>
        <Link to="/">
          <img src={logo} alt="Arto" height="36px" />
        </Link>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Button
            onClick={handleLogout}
            color="primary"
            variant="text"
            startIcon={<LogoutIcon />}
            sx={{ 
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
