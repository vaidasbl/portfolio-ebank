import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BalanceComponent from "./BalanceComponent";
import Quickmenu from "./Quickmenu";
import RecentTransactions from "./RecentTransactions";

const Summary = () => {
  const user = useSelector((state) => state.user.value);
  const [wallet, setWallet] = useState({});

  const getWallet = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/getwallet/${user.username}`
      );
      setWallet(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWallet();
    console.log(wallet);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="titlecontainer container">
        <div className="row summarytitle">Account summary</div>
      </div>
      <BalanceComponent wallet={wallet} setWallet={setWallet} />
      <div className="container">
        <RecentTransactions />
        <Quickmenu />
      </div>
    </div>
  );
};

export default Summary;
