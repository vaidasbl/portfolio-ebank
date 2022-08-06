import axios from "axios";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import DashboardNavbar from "../03 Dashboard/DashboardNavbar";

import MailView from "./MailView";
import apiEndpoint from "../../endpoint";

const MailInboxContainer = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [inbox, setInbox] = useState([]);

  const getInbox = async () => {
    try {
      const result = await axios.get(
        `${apiEndpoint}/api/bank/users/${user._id}/inbox`
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

      <MailView withContainer={true}>
        <div className="container gap">
          {inbox.map((m) => (
            <div
              key={m._id}
              className={m.seen ? "row mailrow " : "row mailrow unseen"}
              onClick={() => navigate(`/mail/${m._id}`)}
            >
              <div className="col-1">
                {m.seen ? "" : <NavigateNextIcon className="muiIcon" />}
              </div>
              <div className="col-3 align-left ">{m.who}</div>
              <div className="col-5">{m.subject}</div>
              <div className="col-3">{m.date}</div>
            </div>
          ))}
        </div>
      </MailView>
    </div>
  );
};

export default MailInboxContainer;
