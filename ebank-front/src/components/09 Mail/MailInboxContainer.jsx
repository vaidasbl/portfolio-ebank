import React from "react";

import DashboardNavbar from "../03 Dashboard/DashboardNavbar";

import MailView from "./MailView";

const MailInboxContainer = () => {
  return (
    <div>
      <DashboardNavbar />

      <MailView>INBOX</MailView>
    </div>
  );
};

export default MailInboxContainer;
