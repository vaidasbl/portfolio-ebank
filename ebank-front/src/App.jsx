import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeContainer from "./components/01 Home/HomeContainer";
import LoginContainer from "./components/02 Login/LoginContainer";
import RegisterContainer from "./components/02 Login/RegisterContainer";
import DashboardContainer from "./components/03 Dashboard/DashboardContainer";
import SendContainer from "./components/04 Send money/SendContainer";
import TransactionHistoryContainer from "./components/05 Transaction history/TransactionHistoryContainer";
import AccountSettingsContainer from "./components/06 Account settings/AccountSettingsContainer";
import { updateWallet } from "./Reducers/user";
import WalletContext from "./Reducers/WalletContext";

import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const refreshWallet = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/getwallet/${user.username}`
      );
      dispatch(updateWallet({ wallet: result.data }));
    } catch (err) {
      alert(err);
    }
  };

  const refreshUserInfo = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3002/api/bank/users/getwallet/${user.username}`
      );
      dispatch(updateWallet({ wallet: result.data }));
      console.log("UPDATED>>>>>>", result);
    } catch (err) {
      alert(err);
    }
  };

  if (user.authenticated) {
    return (
      <WalletContext.Provider value={{ refreshWallet }}>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardContainer />} />
            <Route path="/send" element={<SendContainer />} />
            <Route
              path="/transactions"
              element={<TransactionHistoryContainer />}
            />
            <Route
              path="/accountpanel"
              element={<AccountSettingsContainer />}
            />
          </Routes>
        </Router>
      </WalletContext.Provider>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/register" element={<RegisterContainer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
