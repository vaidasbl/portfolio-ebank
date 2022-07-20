import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import Logout from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import { logout } from "../../Reducers/user";
import { useNavigate } from "react-router";
import WalletContext from "../../Reducers/WalletContext";

const DashboardNavbar = () => {
  const { unseen } = useContext(WalletContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboardnavbar">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 navoption" onClick={() => navigate("/")}>
            Home {unseen ? "unseen" : "all seen"}
          </div>
          <div
            className="col-sm-3 navoption"
            onClick={() => navigate("/transactions")}
          >
            Transaction history
          </div>
          <div className="col-sm-3 navoption" onClick={() => navigate("/send")}>
            New payment
          </div>
          <div
            className="col-sm-3 navoption"
            onClick={() => navigate("/accountpanel")}
          >
            My account
          </div>
        </div>
      </div>
      <div className="me-4" onClick={() => navigate("/mail/inbox")}>
        {unseen ? <MailIcon className="muiIcon" /> : <DraftsIcon />}
      </div>
      <div onClick={handleLogout} className="me-4 logoutbtn">
        <Logout />
      </div>
    </div>
  );
};

export default DashboardNavbar;
