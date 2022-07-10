import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
