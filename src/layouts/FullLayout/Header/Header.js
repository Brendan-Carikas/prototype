import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Stack,
  Toolbar,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../../contexts/AuthContext";
import logo from "../../../assets/images/arto-site-logo.png";

const Header = ({ sx, toggleSidebar, open }) => {
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
        <IconButton
          color="primary"
          aria-label="toggle sidebar"
          onClick={toggleSidebar}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
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
              fontSize: '0.9rem',
              fontWeight: 500,
              px: 2,
              py: 0.75,
              borderRadius: 2
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
  toggleSidebar: PropTypes.func,
  open: PropTypes.bool,
};

export default Header;
