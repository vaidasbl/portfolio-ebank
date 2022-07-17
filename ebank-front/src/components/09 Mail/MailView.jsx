import React from "react";
import { useLocation, useNavigate } from "react-router";

function MailView({ children }) {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className="dashboard-container ">
      <div className="container">
        <div className="summarytitle  mt-4">Mail</div>

        <div className="row mt-4">
          <div className="col-6">
            <button
              className={location === "/mail/inbox" ? "myBtn2" : "myBtn1"}
              type="button"
              onClick={() => navigate("/mail/inbox")}
            >
              Inbox
            </button>
          </div>
          <div className="col-6">
            <button
              className={location === "/mail/sent" ? "myBtn2" : "myBtn1"}
              type="button"
              onClick={() => navigate("/mail/sent")}
            >
              Sent
            </button>
          </div>
        </div>
        <div className={"body-container mt-4 "}>{children}</div>
      </div>
    </div>
  );
}

export default MailView;
