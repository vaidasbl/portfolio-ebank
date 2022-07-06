import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeContainer from "./components/01 Home/HomeContainer";
import LoginContainer from "./components/02 Login/LoginContainer";

import "./styles/App.css";

function App() {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log(user);
  }, []);

  if (user.authenticated) {
    return (
      <Router>
        {user.username},{user.authenticated ? "true" : "false"}
      </Router>
    );
  } else {
    return (
      <Router>
        {user.username}
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<LoginContainer />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
