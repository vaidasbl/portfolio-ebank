import React from "react";

import DashboardNavbar from "./DashboardNavbar";
import Summary from "./Summary";

const DashboardContainer = () => {
  return (
    <div>
      <DashboardNavbar />

      <Summary />
    </div>
  );
};

export default DashboardContainer;
