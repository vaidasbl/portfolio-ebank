import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const CurrencySelectDropdown = ({ setCurrency }) => {
  const currencies = ["USD", "EUR", "RUB"];

  const user = useSelector((state) => state.user.value);

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleSetCurrency = (c) => {
    setCurrency(c);
  };

  return (
    <div className="row">
      <div className="col-6">
        <button
          type="button"
          onClick={(e) => handleOpen(e)}
          onBlur={() => setOpen(false)}
          className="myBtn8 "
        >
          currency
        </button>
      </div>
      <div className="col-6">
        <div className={open ? "arrow-open" : "arrow"}>
          <ArrowLeftIcon />
        </div>
      </div>

      <div>
        <div
          className={open ? "contactsdropdown-open" : "contactsdropdown-closed"}
        >
          {currencies.map((c) => (
            <div
              key={c}
              className={open ? "row contactitem " : "row "}
              onClick={() => handleSetCurrency(c)}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CurrencySelectDropdown;
