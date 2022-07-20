import React, { useContext, useEffect } from "react";
import WalletContext from "../../Reducers/WalletContext";

import DashboardNavbar from "./DashboardNavbar";
import Summary from "./Summary";

const DashboardContainer = () => {
  const { isUnseen } = useContext(WalletContext);

  useEffect(() => {
    isUnseen();
  });
  return (
    <div>
      <DashboardNavbar />

      <Summary />
    </div>
  );
};

export default DashboardContainer;
