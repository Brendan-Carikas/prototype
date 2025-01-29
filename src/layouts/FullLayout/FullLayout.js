import React from "react";
import { Outlet } from "react-router-dom";
import { experimentalStyled, Box, Container } from "@mui/material";
import Header from "./Header/Header";
import { TopbarHeight } from "../../assets/global/Theme-variable";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  paddingTop: TopbarHeight,
}));

const FullLayout = () => {
  return (
    <MainWrapper>
      <Header sx={{ backgroundColor: "#fbfbfb" }} />
      <PageWrapper>
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
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
