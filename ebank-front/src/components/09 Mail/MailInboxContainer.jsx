import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import DashboardNavbar from "../03 Dashboard/DashboardNavbar";

import MailView from "./MailView";

const MailInboxContainer = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [inbox, setInbox] = useState([]);

  const getInbox = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${user._id}/inbox`
      );

      setInbox(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getInbox();
  }, []);
  return (
    <div>
      <DashboardNavbar />

      <MailView>
        <div className="container">
          {inbox.map((m) => (
            <div
              key={m._id}
              className="row"
              onClick={() => navigate(`/mail/${m._id}`)}
            >
              <div className="col-3">{m.who}</div>
              <div className="col-3">{m.subject}</div>

              <div className="col-6">{m.seen ? "true" : "false"}</div>
            </div>
          ))}
        </div>
      </MailView>
    </div>
  );
};

export default MailInboxContainer;
