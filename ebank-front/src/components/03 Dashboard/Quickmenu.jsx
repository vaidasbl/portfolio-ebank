import React from "react";
import { useNavigate } from "react-router";

const Quickmenu = () => {
  const navigate = useNavigate();
  const navpush = (e) => {
    const id = e.target.id;
    switch (id) {
      case "sendmoneybtn":
        navigate("/send");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="recenttransactions ">
      <div className="subtitle mb-2">Quickmenu</div>
      <div>
        <button id="sendmoneybtn" className="myBtn7" onClick={navpush}>
          Send money
        </button>
      </div>
      <div>
        <button className="myBtn7">Create demand template</button>
      </div>
      <div>
        <button className="myBtn7">View currency rates</button>
      </div>
    </div>
  );
};

export default Quickmenu;
