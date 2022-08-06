import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import apiEndpoint from "../../endpoint";
import DashboardView from "../08 Common Components/DashboardView";
import Pagination from "../08 Common Components/Pagination";

const TransactionHistory = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [transactionsSize, setTransactionsSize] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const numOfPages = Math.ceil(transactionsSize / pageSize);
  console.log(numOfPages);

  const getTransactionsPage = async () => {
    try {
      const result = await axios.get(
        `${apiEndpoint}/api/bank/users/${user._id}/transactionspage=${page}/size=${pageSize}`
      );

      setTransactions(result.data.page);
      setTransactionsSize(result.data.allTransactions);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getTransactionsPage();
  }, [page]);

  return (
    <DashboardView header="Transaction history">
      <div className="transactionslist">
        {transactions?.map((t) => (
          <div key={t.date} className="row mb-2">
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
      <div className="pagination-container">
        <Pagination setPage={setPage} page={page} numOfPages={numOfPages} />
      </div>
    </DashboardView>
  );
};

export default TransactionHistory;
