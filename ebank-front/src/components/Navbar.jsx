import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const navPush = (e) => {
    const id = e.target.id;

    if (id === "navlogin") {
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="row  align-between">
          <div className="col-2">
            <button className="myBtn3">LOGO</button>
          </div>

          <div className="col-4 align-end">
            <button id="navlogin" className="myBtn1 me-1" onClick={navPush}>
              Login
            </button>

            <button id="navregister" className="myBtn2">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
