import React, { useRef, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const CurrencySelectDropdown = ({ setCurrency }) => {
  const user = useSelector((state) => state.user.value);
  const currencies = ["USD", "EUR", "RUB"];
  const ref = useRef(null);

  const closeOpenMenus = (e) => {
    if (ref.current && open && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("mouseup", closeOpenMenus);

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const handleSetCurrency = (c) => {
    setCurrency(c);
    setOpen(false);
  };

  return (
    <div className="container ">
      <div className="row">
        <div ref={ref}>
          <div className="inline-block ">
            <button
              type="button"
              className="myBtn10"
              onClick={() => setOpen(!open)}
            >
              currency
            </button>
          </div>
          <div className="inline-block">
            <div className={open ? "arrow-open " : "arrow "}>
              <ArrowLeftIcon />
            </div>
          </div>
        </div>

        <div>
          <div className={open ? "dropdown-open " : "dropdown-closed"}>
            {open &&
              currencies.map((c) => (
                <div
                  key={c}
                  className={"row contactitem"}
                  onClick={() => handleSetCurrency(c)}
                >
                  {c}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurrencySelectDropdown;
