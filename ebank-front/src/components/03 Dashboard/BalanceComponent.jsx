import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CurrencySelect from "../08 Common Components/CurrencySelect";

const BalanceComponent = ({ wallet, setWallet }) => {
  return (
    <div className="container">
      <div className="row balancecontainer mt-4">
        <div className="col-6 subtitle">Balance: </div>
        <div className="col-6">
          <div className="currency">
            {wallet.amount} {wallet.currency}
          </div>

          <div>
            <CurrencySelect wallet={wallet} setWallet={setWallet} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceComponent;
