import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import DashboardView from "../08 Common Components/DashboardView";

const Mail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <DashboardView header="Mail"></DashboardView>;
    </div>
  );
};

export default Mail;
