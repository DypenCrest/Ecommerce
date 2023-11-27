import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
      <Box className="main-layout">
        <Header />
        <Box className="content">
          <Outlet />
        </Box>

        <Footer />
      </Box>
  );
};

export default MainLayout;
