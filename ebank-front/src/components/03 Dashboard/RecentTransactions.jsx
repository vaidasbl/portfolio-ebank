import React from "react";

const RecentTransactions = () => {
  const transactions = [
    {
      amount: 100,
      who: "lakerki",
      in: false,
    },
    {
      amount: 4,
      who: "kebab",
      in: false,
    },
    {
      amount: 200,
      who: "salary",
      in: true,
    },
    {
      amount: 50,
      who: "gazol",
      in: false,
    },
    {
      amount: 1,
      who: "semachki",
      in: false,
    },
  ];

  return (
    <div className="recenttransactions ">
      <div className="subtitle mb-2">Recent transactions</div>
      {transactions.map((t) => (
        <div key={t.who} className="row">
          <div className="col-6">
            {t.in ? "+" : "-"}
            {t.amount}
          </div>
          <div className="col-6">{t.who}</div>
        </div>
      ))}
      <div className="mt-2"></div>
    </div>
  );
};

export default RecentTransactions;
