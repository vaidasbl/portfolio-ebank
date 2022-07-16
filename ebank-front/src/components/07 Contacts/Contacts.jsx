import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { updateInfo } from "../../Reducers/user";
import ContactAddComponent from "../08 Common Components/ContactAddComponent";
import DashboardView from "../08 Common Components/DashboardView";

const Contacts = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [contacts, setContacts] = useState([]);
  const [contactUsername, setContactUsername] = useState("");

  const handleChange = (e) => {
    setContactUsername(e.target.value);
  };

  const getContacts = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/${user._id}/contacts`
      );
      setContacts(result.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleAdd = async () => {
    try {
      const result = await axios.put(
        "http://localhost:3002/api/bank/users/addtocontacts",
        { userid: user._id, contactUsername: contactUsername }
      );
      await getContacts();
      setContactUsername("");
    } catch (err) {
      alert(err.response.data);
    }
  };

  const handleRemove = async (c) => {
    try {
      const result = await axios.put(
        "http://localhost:3002/api/bank/users/removefromcontacts",
        { userid: user._id, contactId: c.contactId }
      );
      console.log(result.data);
      getContacts();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getContacts();
    console.log(contacts);
  }, []);

  return (
    <DashboardView
      header="Contacts"
      preFooter={
        <ContactAddComponent
          contactUsername={contactUsername}
          handleChange={handleChange}
          handleAdd={handleAdd}
        />
      }
    >
      {contacts?.map((c) => (
        <div key={c.contactId} className="row mb-2">
          <div className="col-6">{c.username}</div>
          <div className="col-6">
            <button
              type="button"
              className="myBtn11"
              onClick={() => handleRemove(c)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </DashboardView>
  );
};

export default Contacts;
