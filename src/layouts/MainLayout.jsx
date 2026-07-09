import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
        <Chatbot />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
