import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Web3 from "web3";
import { ethers } from "ethers";
import Dashboard from "./pages/Dashboard";
import StandardTokenLock from "./pages/StandardTokenLock";
import LpToken from "./pages/LpToken";
import Header from "./components/Header";
import RewardLocker from "./pages/RewardLocker";
import LockerDetails from "./pages/LockerDetails";
const App = () => {
  document.title = "Token Dashboard";
  return (
    <div className="row">
      <div className="col-md-2 p-3 mb-5" id="left-aside">
        <Navbar />
      </div>

      <div
        className="col-md-9 mx-5 p-3 mb-5 "
        style={{ backgroundColor: "transparent" }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lockerDetails" element={<LockerDetails />} />
          <Route path="/standardtokenlock" element={<StandardTokenLock />} />
          <Route path="/lptoken" element={<LpToken />} />
          <Route path="/rewardlocker" element={<RewardLocker />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
