import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import DashboardNavbar from "../03 Dashboard/DashboardNavbar";

import MailView from "./MailView";

const MailSentContainer = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [sent, setSent] = useState([]);

  const getSent = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${user._id}/sent`
      );
      setSent(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getSent();
  }, []);

  return (
    <div>
      <DashboardNavbar />

      <MailView>
        <div className="container">
          {sent.map((m) => (
            <div
              key={m._id}
              className="row"
              onClick={() => navigate(`/mail/${m._id}`)}
            >
              <div className="col-3">{m.who}</div>
              <div className="col-3">{m.subject}</div>

              <div className="col-6">{m.date}</div>
            </div>
          ))}
        </div>
      </MailView>
    </div>
  );
};

export default MailSentContainer;
