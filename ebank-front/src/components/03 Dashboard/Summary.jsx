import React from "react";
import Select from "../08 Common Components/Select";
import BalanceComponent from "./BalanceComponent";
import Quickmenu from "./Quickmenu";
import RecentTransactions from "./RecentTransactions";

const Summary = () => {
  return (
    <div className="dashboard-container">
      <div className="titlecontainer container">
        <div className="row summarytitle">Account summary</div>
      </div>
      <BalanceComponent />
      <div className="container">
        <RecentTransactions />
        <Quickmenu />
      </div>
    </div>
  );
};

export default Summary;
