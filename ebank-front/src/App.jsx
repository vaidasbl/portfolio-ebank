import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeContainer from "./components/01 Home/HomeContainer";
import LoginContainer from "./components/02 Login/LoginContainer";
import DashboardContainer from "./components/03 Dashboard/DashboardContainer";
import SendContainer from "./components/04 Send money/SendContainer";

import "./styles/App.css";

function App() {
  const user = useSelector((state) => state.user.value);

  if (user.authenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<DashboardContainer />} />
          <Route path="/send" element={<SendContainer />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
