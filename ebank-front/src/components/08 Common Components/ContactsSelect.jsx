import React, { useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const ContactsSelect = ({ setContact }) => {
  const user = useSelector((state) => state.user.value);
  const [contacts, setContacts] = useState([]);

  const [open, setOpen] = useState(false);

  const getContacts = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${user.username}/contacts`
      );
      setContacts(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();

    setOpen(!open);
  };

  const handleSetContact = (c) => {
    setContact(c);
    console.log(c);
    setOpen(false);
  };

  return (
    <div className="row">
      <div className="col-6">
        <button
          type="button"
          onClick={(e) => handleOpen(e)}
          className="myBtn8 "
        >
          contacts
        </button>
      </div>
      <div className="col-6">
        <div className={open ? "arrow-open" : "arrow"}>
          <ArrowLeftIcon />
        </div>
      </div>

      <div>
        <div
          className={
            open ? "contactsdropdown-open " : "contactsdropdown-closed"
          }
        >
          {open &&
            contacts.map((c) => (
              <div
                key={c.username}
                className={"row contactitem "}
                onClick={() => handleSetContact(c.username)}
              >
                {c.username}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default ContactsSelect;
