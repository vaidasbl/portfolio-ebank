import React from "react";
import Select from "../08 Common Components/Select";

const BalanceSection = () => {
  return (
    <div className="dashboard-container">
      <div className="row">
        <div className="col-4">Balance</div>
        <div className="col-4">$100</div>
        <div className="col-4">
          <Select />
        </div>
      </div>
    </div>
  );
};

export default BalanceSection;
