import React from "react";

import DashboardNavbar from "../03 Dashboard/DashboardNavbar";

import MailView from "./MailView";

const MailSentContainer = () => {
  return (
    <div>
      <DashboardNavbar />

      <MailView>SENT</MailView>
    </div>
  );
};

export default MailSentContainer;
