import React from "react";
import Select from "../08 Common Components/Select";

const BalanceComponent = () => {
  return (
    <div className="container">
      <div className="row balancecontainer mt-4">
        <div className="col-6 subtitle">Balance:</div>
        <div className="col-6">
          <div className="currency">$1485.35</div>

          <div>
            <Select />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceComponent;
