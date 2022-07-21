import React from "react";
import { useLocation, useNavigate } from "react-router";

function MailView({ children, withContainer }) {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className="dashboard-container ">
      <div className="container">
        <div className="summarytitle  mt-4">Mail</div>

        <div className="row  mt-4">
          <div className="col-3 ">
            <button
              className={
                location === "/mail/inbox" ? "mailbtnactive" : "mailbtnpassive"
              }
              type="button"
              onClick={() => navigate("/mail/inbox")}
            >
              Inbox
            </button>
          </div>
          <div className="col-3 ">
            <button
              className={
                location === "/mail/sent" ? "mailbtnactive" : "mailbtnpassive"
              }
              type="button"
              onClick={() => navigate("/mail/sent")}
            >
              Sent
            </button>
          </div>
          <div className="col-6 align-end">
            <button
              type="button"
              className={
                location === "/mail/new" ? "mailbtnactive" : "mailbtnpassive"
              }
              onClick={() => navigate("/mail/new")}
            >
              Send mail
            </button>
          </div>
        </div>
        <div className={withContainer ? "mt-4 mail-body-container" : "mt-4"}>
          {children}
        </div>

        <div>
          <div className="row mt-3">
            <div className="col-6 align-left">
              <button
                type="button"
                className="myBtn4"
                onClick={() => navigate(-1)}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MailView;
