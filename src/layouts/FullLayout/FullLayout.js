import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, Box, Container } from "@mui/material";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { TopbarHeight } from "../../assets/global/Theme-variable";
import { useFooterVisibility } from "../../hooks/useFooterVisibility";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const drawerWidth = 240;

const PageWrapper = styled("div")(({ theme, open }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  paddingTop: TopbarHeight,
  marginLeft: open ? `${drawerWidth}px` : 0,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const FullLayout = () => {
  const showFooter = useFooterVisibility();
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <MainWrapper>
      <Header 
        sx={{ backgroundColor: "#fbfbfb" }} 
        toggleSidebar={toggleSidebar} 
        open={open} 
      />
      <Sidebar open={open} />
      <PageWrapper open={open}>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft: "20px !important",
            paddingRight: "20px !important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
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
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
