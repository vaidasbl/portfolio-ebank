import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="container">
        <div className="row  align-between">
          <div className="col-2">
            <button className="myBtn3" onClick={() => navigate("/")}>
              LOGO
            </button>
          </div>

          <div className="col-4 align-end">
            <button
              id="navlogin"
              className="myBtn1 me-1"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              id="navregister"
              className="myBtn2"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
