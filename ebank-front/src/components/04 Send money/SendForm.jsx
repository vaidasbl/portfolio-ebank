import React, { useEffect, useState } from "react";
import ContactsSelect from "../08 Common Components/ContactsSelect";
import CurrencySelectDropdown from "../08 Common Components/CurrencySelectDropdown";

const SendForm = () => {
  const [contact, setContact] = useState("");
  const [currency, setCurrency] = useState("RUB");

  return (
    <div className="dashboard-container">
      <div className="titlecontainer container">
        <div className="row summarytitle">Send</div>
        <form>
          <div className="container">
            <div className="mt-4 row">
              <div className="col-8">
                <input
                  className="my-form"
                  type="text"
                  value={contact}
                  placeholder="Recipient"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div className="col-4 contactsselect">
                <ContactsSelect setContact={setContact} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="mt-4 row">
              <div className="col-8">
                <input className="my-form" type="text" placeholder="Amount" />
                <span className="currencyspan">{currency}</span>
              </div>
              <div className="col-4">
                <CurrencySelectDropdown setCurrency={setCurrency} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendForm;
