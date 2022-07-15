import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import WalletContext from "../../Reducers/WalletContext";
import ContactsSelect from "../08 Common Components/ContactsSelect";
import CurrencySelectDropdown from "../08 Common Components/CurrencySelectDropdown";

const SendForm = () => {
  const { refreshWallet } = useContext(WalletContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [contact, setContact] = useState("");
  const [currency, setCurrency] = useState(user.wallet.currency);
  const [amount, setAmount] = useState("");

  const request = {
    sender: user.username,
    recipient: contact,
    amount: amount,
    currency: currency,
  };

  const empty = Object.values(request).some((v) => v === "" || v === undefined);

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
  };

  const handleSend = async () => {
    if (!empty) {
      try {
        const result = await axios.put(
          "http://localhost:3002/api/bank/users/send",
          request
        );
        refreshWallet();
        alert(result.data.message);
        navigate("/");
      } catch (err) {
        alert(err.response.data);
      }
    } else {
      alert("Recipient and amount cannot be empty");
    }
  };

  const exchange = (amount, from, to) => {
    const rates = {
      USD: {
        USD: 1,
        EUR: 0.9,
        RUB: 100,
      },

      EUR: {
        EUR: 1,
        USD: 1 / 0.9,
        RUB: 1 / (0.9 / 100),
      },

      RUB: {
        RUB: 1,
        USD: 1 / 100,
        EUR: 1 / (1 / (0.9 / 100)),
      },
    };

    const rate = rates[from][to];
    const money = (amount * rate).toFixed(2);
    return +money;
  };

  return (
    <div className="dashboard-container">
      <div className="titlecontainer container sendformcontainer">
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

          <div className="container mt-40">
            <div className="row">
              <div className="col-8">
                <input
                  value={amount}
                  onChange={handleAmountInput}
                  className="my-form"
                  type="text"
                  placeholder="Amount"
                />
                <span className="currencyspan">{currency}</span>
                <div className="underlinebalance ">
                  Balance:{" "}
                  {exchange(user.wallet.amount, user.wallet.currency, currency)}
                </div>
              </div>

              <div className="col-4">
                <CurrencySelectDropdown setCurrency={setCurrency} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <hr className="hrhr1" />
      <div className="row buttonsrow">
        <div className="col-6">
          <button type="button" className="myBtn4" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
        <div className="col-6">
          <button type="button" className="myBtn4" onClick={handleSend}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendForm;
