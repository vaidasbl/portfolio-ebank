import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import DashboardNavbar from "../03 Dashboard/DashboardNavbar";

import MailView from "./MailView";

const MailPreviewContainer = () => {
  const user = useSelector((state) => state.user.value);
  const [mailInfo, setMailInfo] = useState({});
  const param = useParams();

  const getPreview = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${user._id}/${param.mailid}`
      );
      console.log(result.data);
      setMailInfo(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getPreview();
  }, []);

  return (
    <div>
      <DashboardNavbar />

      <MailView>
        <div>PREVIEW</div>
        <div>{mailInfo.who}</div>
        <div>{mailInfo.subject}</div>
      </MailView>
    </div>
  );
};

export default MailPreviewContainer;
