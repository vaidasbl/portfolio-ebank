import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import apiEndpoint from "../../endpoint";
import WalletContext from "../../Reducers/WalletContext";

import DashboardNavbar from "../03 Dashboard/DashboardNavbar";

import MailView from "./MailView";

const MailPreviewContainer = () => {
  const user = useSelector((state) => state.user.value);
  const { isUnseen } = useContext(WalletContext);
  const [mailInfo, setMailInfo] = useState({});
  const param = useParams();

  const getPreview = async () => {
    try {
      const result = await axios.get(
        `${apiEndpoint}/api/bank/users/${user._id}/${param.mailid}`
      );

      setMailInfo(result.data);
      console.log(result.data);
      isUnseen();
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
        <div className="row">
          <div className="col-6 align-right">
            <div>{mailInfo.income ? "from:" : "to:"} </div>
            <div>subject: </div>
          </div>
          <div className="col-6 align-left">
            <div>{mailInfo.who}</div>
            <div>{mailInfo.subject} </div>
          </div>
        </div>

        <hr className="hrhr1" />
        <div>
          <textarea
            value={mailInfo.contents}
            className="mailbody2"
            readOnly={true}
          ></textarea>
        </div>
      </MailView>
    </div>
  );
};

export default MailPreviewContainer;
