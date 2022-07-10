import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TransactionHistory = () => {
  const user = useSelector((state) => state.user.value);
  const [transactions, setTransactions] = useState([]);

  const pageSettings = {
    pageNum: 2,
    pageSize: 3,
  };

  const getTransactionsPage = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${
          user.username
        }/transactionspage=${1}/size=${20}`
      );
      setTransactions(result.data);
    } catch (err) {
      alert(err);
    }
  };

  const getTransactions = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${user.username}/alltransactions`
      );
      setTransactions(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getTransactionsPage();
  }, []);
  return (
    <div className="dashboard-container">
      <div className="titlecontainer container">
        <div className="row summarytitle">Transaction history</div>
      </div>
      <div className="mt-4">
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
      </div>
    </div>
  );
};

export default TransactionHistory;
