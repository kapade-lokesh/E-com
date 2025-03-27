import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const Userlayout = () => {
  return (
    <div>
      {/* header */}
      <Header />
      {/* main */}
      <main>
        <Outlet />
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Userlayout;
