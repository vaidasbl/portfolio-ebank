import React from "react";
import { useDispatch } from "react-redux";
import Logout from "@mui/icons-material/Logout";
import { logout } from "../../Reducers/user";
import { useNavigate } from "react-router";

const DashboardNavbar = () => {
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
            Home
          </div>
          <div
            className="col-sm-3 navoption"
            onClick={() => navigate("/transactions")}
          >
            Transaction history
          </div>
          <div className="col-sm-3 navoption">New payment</div>
          <div className="col-sm-3 navoption">My account</div>
        </div>
      </div>
      <div onClick={handleLogout} className="me-4 logoutbtn">
        <Logout />
      </div>
    </div>
  );
};

export default DashboardNavbar;
