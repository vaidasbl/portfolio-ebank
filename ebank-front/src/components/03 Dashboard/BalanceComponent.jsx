import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CurrencySelect from "../08 Common Components/CurrencySelect";

const BalanceComponent = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="container">
      <div className="row balancecontainer mt-4">
        <div className="col-6 subtitle">Balance: </div>
        <div className="col-6">
          <div className="currency">
            {user.wallet.amount} {user.wallet.currency}
          </div>

          <div>
            <CurrencySelect />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceComponent;
