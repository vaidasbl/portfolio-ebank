import React from "react";
import Navbar from "../Navbar";
import Body from "./Body";
import Footer from "./Footer";
import HeaderContainer from "./HeaderContainer";

const HomeContainer = () => {
  return (
    <div>
      <Navbar />
      <HeaderContainer />
      <Body />
      <Footer />
    </div>
  );
};

export default HomeContainer;
