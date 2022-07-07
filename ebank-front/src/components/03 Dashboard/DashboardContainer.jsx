import React from "react";
import BalanceSection from "./BalanceSection";
import DashboardNavbar from "./DashboardNavbar";

const DashboardContainer = () => {
  return (
    <div className="">
      <DashboardNavbar />

      <BalanceSection />
    </div>
  );
};

export default DashboardContainer;
