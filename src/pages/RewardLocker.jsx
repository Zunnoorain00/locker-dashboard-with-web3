import React, { useState } from "react";
import Header from "../components/Header";
import { ethers } from "ethers";
import Web3 from "web3";
import message from "../message.json";
import "../components/Components.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RewardLocker = () => {
  const [tokenAddress, setTokenAddress] = useState();
  const [isEnableTokenVesting, setIsEnableTokenVesting] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    name: "-",
    address: "-",
    balance: "-",
    totalSupply: "-",
  });
  const getTokenAddress = async (e) => {
    try {
      if (e.target.value.length === 42) {
        waitNotification("Please Wait ! ");
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider1.getSigner();

        let newContract = new ethers.Contract(e.target.value, message, signer);

        let tokenName = await newContract.name(); // name

        const signerAddress = await signer.getAddress();
        let balanceToken = await newContract.balanceOf(signerAddress);
        const amount = Web3.utils.fromWei(balanceToken.toString(), "ether");
        const tokenTotalSupply = await newContract.totalSupply(); //total supply
        const totalSupplyInEther = Web3.utils.fromWei(
          tokenTotalSupply.toString(),
          "ether"
        );
        setAccountInfo({
          name: tokenName,
          address: "-",
          balance: amount,
          totalSupply: totalSupplyInEther,
        });
        successNotification("Token Info Recieved ");
      } else {
        errorNotification("Invalid Token Address ! ");
        setAccountInfo({
          name: "Invalid Input",
          address: "Invalid Input",
          balance: "Invalid Input",
          totalSupply: "Invalid Input",
        });

        setTimeout(() => {
          setAccountInfo({
            name: "-",
            address: "-",
            balance: "-",
            totalSupply: "-",
          });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const waitNotification = (message) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  const errorNotification = (message) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  const successNotification = (message) => {
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <div className="col-md-12 shadow p-3 mb-5 bg-white rounded">
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-md-6">
            <div>
              <h4 htmlFor="">Enter Token Address</h4>
              <div className="fontuser">
                <input
                  type="text"
                  placeholder="Search"
                  name="search"
                  required
                  className="lp-token-input"
                  // value={tokenAddress}
                  onChange={(e) => {
                    getTokenAddress(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/*<div className="row my-5  mx-5">
          <div className="col-md-4  mx-5">
            <div className="shadow p-3 mb-5 bg-white rounded ">
              <h3>Why Use Standard Locker </h3>
              <ul
                style={{
                  listStyleType: "disc !important",
                  paddingLeft: "1em !important",
                  marginLeft: "1em",
                  fontSize: "20px",
                }}
              >
                <li
                  style={{
                    marginBottom: "5px",
                  }}
                >
                  Best for Standard Tokens
                </li>
                <li
                  style={{
                    marginBottom: "5px",
                  }}
                >
                  Simple and Easy to use!
                </li>
                <li
                  style={{
                    marginBottom: "5px",
                  }}
                >
                  Lowest for Utility Based Tokens
                </li>
                <li
                  style={{
                    marginBottom: "5px",
                  }}
                >
                  Token Vesting Available
                </li>
                <li
                  style={{
                    marginBottom: "5px",
                  }}
                >
                  Certik Audited
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
        <div className="row mx-5">
          <div className="col-md-4 mx-5">
            <div className="shadow p-3 mb-5 bg-white rounded d-flex flex-column justify-content-center align-items-center">
              <h3>Fee</h3>
              <p>0.3 REDLC</p>
            </div>
          </div>
          <div className="col-md-6"></div>
                </div>*/}
        <div className="row my-5  mx-5">
          <div className="col-md-4  mx-5">
            <div className="shadow p-3 mb-5 bg-white rounded d-flex justify-content-center align-items-center">
              <div>
                <p>
                  <b>Token Name :</b> {accountInfo.name}
                </p>
                <p>
                  <b>Token Supply : </b>
                  {accountInfo.totalSupply}
                </p>
                <p>
                  <b>Your Wallet Balance : </b>
                  {accountInfo.balance > 0
                    ? `${accountInfo.balance.slice(0, 8)} REDLC`
                    : accountInfo.balance}
                </p>
                <p>
                  <b>Token You Will Lock :</b> 0 REDLC
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <h4 htmlFor="">Enter the amount of the token you want to lock</h4>
              <div className="fontuser">
                <input
                  type="text"
                  placeholder="Ex.100"
                  name="search"
                  required
                  className="lp-token-input"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div>
              <h4 htmlFor="" className="text-center my-2">
                Token Vesting :{" "}
                {isEnableTokenVesting ? (
                  <span style={{ color: "green"}}>Enable</span>
                ) : (
                  <span style={{ color: "red" }}>Disable</span>
                )}
              </h4>
              <div className="fontuser" >
                <button
                  className="special-btn-vesting"
                  style={{
                    fontSize: "22px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    backgroundColor: "#f0eded"
                  }}
                  onClick={() => {
                    errorNotification("Currently Not Working!");
                  }}
                >
                  OPEN TOKEN VESTING SETTINGS
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-4">
            <div>
              <h4 htmlFor="" className="text-center">
                Unlock Time
              </h4>
              <div className="fontuser">
                <input
                  type="datetime-local"
                  placeholder="2022-02-21 02:56 PM"
                  name="search"
                  required
                  className="datetime-input"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <h4 htmlFor="" className="text-center">
                Logo URL
              </h4>
              <div className="fontuser">
                <input
                  type="text"
                  placeholder="Must end with jpg. png or gif"
                  name="search"
                  required
                  className="lp-token-input"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-7">
            <div>
              <h4 htmlFor="" className="text-center">
                Destination Address / Locker Address
              </h4>
              <div className="fontuser">
                <input
                  type="text"
                  placeholder="0x121242311231231231231231312312445234"
                  name="search"
                  required
                  className="lp-token-input"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <div className="fontuser">
                <button
                  className="special-btn"
                  style={{
                    fontSize: "22px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    backgroundColor: "#f0eded"
                  }}
                  onClick={() => {
                    errorNotification("Kindly Fill All Fields");
                  }}
                >
                  + Add New Verifier / Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-evenly align-items-center"></div>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default RewardLocker;
