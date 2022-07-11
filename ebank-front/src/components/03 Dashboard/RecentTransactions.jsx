import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RecentTransactions = () => {
  const user = useSelector((state) => state.user.value);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${user.username}/recenttransactions`
      );

      setTransactions(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="recenttransactions ">
      <div className="subtitle mb-2">Recent transactions</div>
      {transactions.map((t) => (
        <div key={t.date} className="row">
          <div
            className={t.income ? "col-3 income-true" : "col-3 income-false"}
          >
            {t.income ? "+" : "-"} {t.amount} {t.currency}
          </div>
          <div className="col-3 ">{t.who}</div>
          <div className="col-6 ">{t.date}</div>
        </div>
      ))}
      <div className="mt-2"></div>
    </div>
  );
};

export default RecentTransactions;
