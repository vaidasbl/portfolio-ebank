import React, { useEffect, useState } from "react";
import DashboardNavbar from "../03 Dashboard/DashboardNavbar";
import TransactionHistory from "./TransactionHistory";

const TransactionHistoryContainer = () => {
  return (
    <div>
      <DashboardNavbar />

      <TransactionHistory />
    </div>
  );
};

export default TransactionHistoryContainer;
