import React from "react";
import { Header } from "../Common";
import { Footer } from "../Common";
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
