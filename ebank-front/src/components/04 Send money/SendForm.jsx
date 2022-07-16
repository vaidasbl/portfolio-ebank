import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import WalletContext from "../../Reducers/WalletContext";
import ContactsSelect from "../08 Common Components/ContactsSelect";
import CurrencySelectDropdown from "../08 Common Components/CurrencySelectDropdown";
import DashboardView from "../08 Common Components/DashboardView";

const SendForm = () => {
  const { refreshWallet } = useContext(WalletContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const [contact, setContact] = useState("");
  const [currency, setCurrency] = useState(user.wallet.currency);
  const [amount, setAmount] = useState("");

  const request = {
    sender: user._id,
    recipient: contact,
    amount: amount,
    currency: currency,
  };

  const empty = Object.values(request).some((v) => v === "" || v === undefined);

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
  };

  const handleContactInput = (e) => {
    setContact(e.target.value);
  };

  const handleSend = async () => {
    if (!empty) {
      try {
        const result = await axios.put(
          "http://localhost:3002/api/bank/users/send",
          request
        );
        refreshWallet();
        alert(result.data);
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
    <div>
      <DashboardView
        header={"Send"}
        submitHandler={handleSend}
        handlerName="Send"
      >
        <form>
          <div className="row ">
            <div className="col-7">
              <input
                className="my-form"
                type="text"
                value={contact}
                placeholder="Recipient"
                onChange={handleContactInput}
              />
            </div>
            <div className="col-5 ">
              <ContactsSelect setContact={setContact} />
            </div>
          </div>
          <div className="mt-40 ">
            <div className="row">
              <div className="col-7">
                <input
                  className="my-form"
                  type="text"
                  value={amount}
                  placeholder="Amount"
                  onChange={handleAmountInput}
                />
                <span className="currencyspan">{currency}</span>
                <div className="underlinebalance ">
                  Balance:{" "}
                  {exchange(user.wallet.amount, user.wallet.currency, currency)}
                </div>
              </div>

              <div className="col-5">
                <CurrencySelectDropdown setCurrency={setCurrency} />
              </div>
            </div>
          </div>
        </form>
      </DashboardView>
    </div>
  );
};

export default SendForm;
