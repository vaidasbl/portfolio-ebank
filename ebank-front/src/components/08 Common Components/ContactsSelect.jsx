import React, { useRef, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import apiEndpoint from "../../endpoint";

const ContactsSelect = ({ setContact }) => {
  const user = useSelector((state) => state.user.value);
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  const closeOpenMenus = (e) => {
    if (ref.current && open && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("mouseup", closeOpenMenus);

  const getContacts = async () => {
    try {
      const result = await axios.get(
        `${apiEndpoint}/api/bank/users/${user._id}/contacts`
      );
      setContacts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleSetContact = (c) => {
    setContact(c);
    setOpen(false);
  };

  return (
    <div className="container ">
      <div ref={ref} className="row ">
        <div>
          <div className="inline-block ">
            <button
              type="button"
              className="myBtn10"
              onClick={() => setOpen(!open)}
            >
              contacts
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
              contacts?.map((c) => (
                <div
                  key={c.username}
                  className={"row contactitem"}
                  onClick={() => handleSetContact(c.username)}
                >
                  {c.username}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactsSelect;
