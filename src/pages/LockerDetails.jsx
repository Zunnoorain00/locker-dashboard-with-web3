import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3 from "web3";
import message from "../message.json";
import mapper from "../abis/mapper.json";

import "./pages.css";

const LockerDetails = () => {
  const [lockerName, setLockerName] = useState("");
  const [lockerTypeNumber, setLockerTypeNumber] = useState(null);
  const [lockerType, setlockerType] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Locker Details";
  }, []);

  //
  const mapperInfo = async () => {
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();

    let mapperContract = new ethers.Contract(
      "0xC55eF9EA2cbfC83e37467F966ceaCe945B6062Cc",
      mapper,
      signer
    );

    //get any specific locker details
    let getLockerDetail = await mapperContract.getLockerDetail(
      location.state.lAddress
    );
    // console.log("Locker Details : ", getLockerDetail.lockerType);
    setLockerTypeNumber(getLockerDetail.lockerType);
    if (lockerTypeNumber === 0) {
      setlockerType("Standard Locker");
      console.log("Standard Locker");
    } else if (lockerTypeNumber === 1) {
      setlockerType("LP Locker");
      console.log("LP Locker");
    } else if (lockerTypeNumber === 2) {
      setlockerType("Reward Locker");
    } else {
      setlockerType("");
    }
  };

  const getTokenName = async () => {
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();

    let newContract = new ethers.Contract(
      "0xf791169B1dCf206C01B801906a81E2b7E9C67B69",
      message,
      signer
    );
    // console.log(newContract);
    let tokenName = await newContract.name(); // name
    // console.log("Token Name in DashBoard  : ", tokenName);
    setLockerName(tokenName);
  };

  useEffect(() => {
    mapperInfo();
  }, []);

  useEffect(() => {
    getTokenName();
  }, []);
  useEffect(() => {
    getLockerSummary();
  }, []);

  const getLockerSummary = async () => {
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();

    // let newContract = new ethers.Contract(
    //   "0xf791169B1dCf206C01B801906a81E2b7E9C67B69",
    //   lockerGetAbi,
    //   signer
    // );

    // const details = await newContract.getLockerDetail();
    // console.log("asdadasdadasas", details);
  };

  return (
    // <div>{location.state.name}</div>
    <div
      className="row p-3 mb-5 rounded my-5"
      style={{ backgroundColor: "white" }}
    >
      <div className="row my-5">
        <div className="col-md-7 text-center">
          <h2>YGER/REDLC</h2>
        </div>
        <div className="col-md-4 text-center">
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
      </div>
      <div className="col-md-8 shadow p-3 mb-5 rounded mx-4">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Locker Timer</h1>
          </div>
          <div className="col-md-12 text-center my-4">
            {location.state.remainingTimeCard == "00:00:00" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25215.png"
                style={{ height: "150px" }}
                alt="unlock-locker"
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/2089/2089784.png"
                style={{ height: "150px" }}
                alt="lock-locker"
              />
            )}
          </div>
          <div className="col-md-12 text-center">
            <h1>{location.state.remainingTimeCard}</h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <h4 className="mx-5">Token Name</h4>
          </div>
          <div className="col-md-6">
            <h4 className="text-end mx-5"> {lockerName}</h4>
          </div>
          <div className="col-md-6">
            <h4 className="mx-5">Total Supply of LP</h4>
          </div>
          <div className="col-md-6">
            <h4 className="text-end mx-5"> 24.62592648533383</h4>
          </div>
          <div className="col-md-6">
            <h4 className="mx-5">LP in Locker (99%)</h4>
          </div>
          <div className="col-md-6">
            <h4 className="text-end mx-5">24.623946848533383</h4>
          </div>
          <div className="col-md-6">
            <h4 className="mx-5">Locker Type</h4>
          </div>
          <div className="col-md-6">
            <h4 className="text-end mx-5">
              {lockerTypeNumber == 0
                ? "Standard Locker"
                : lockerTypeNumber == 1
                ? "Lp Locker"
                : lockerTypeNumber == 2
                ? "Reward Locker"
                : ""}
            </h4>
          </div>
          <div className="col-md-6">
            <h4 className="mx-5">Unlock Date</h4>
          </div>
          <div className="col-md-6">
            <h4 className="text-end mx-5">{location.state.UnlocksDate}</h4>
          </div>
          <div className="col-md-6">
            <h4 className="mx-5"># Lockers</h4>
          </div>
          <div className="col-md-6">
            <h4 className="text-end mx-5">{location.state.lockerNumber + 1}</h4>
          </div>
          <div
            className="col-md-12 d-flex justify-content-center align-content-center"
            style={{ marginTop: "40px", width: "100%" }}
          >
            {location.state.remainingTimeCard == "00:00:00" ? (
              <button
                type={"button"}
                className="shadow p-3 mb-5 rounded d-flex flex-column justify-content-center align-items-center btn-withdraw"
                id="btn-withdraw"
                style={{
                  height: "60px",
                  fontSize: "22px",
                  color: "white",
                  width: "250px",
                  marginLeft: "20px",
                  fontWeight: "bold",
                  background: "linear-gradient(100deg, #4b4a4a 0%, #171717)",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={(e) => {}}
              >
                With Draw
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="col-md-3 shadow p-3 mb-5 rounded">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>Vesting Schedule</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <b>Vesting Period</b>
          </div>
          <div className="col-md-4">
            <b>Release Date</b>
          </div>
          <div className="col-md-4">
            <b>Token Released</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockerDetails;
