import React, { useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import message from "../message.json";
import "../components/Components.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const LpToken = () => {
  const [show, setShow] = useState(false);

  const [isShow, setIsShow] = useState(true);
  const [tokenAddress, setTokenAddress] = useState();
  const [isEnableTokenVesting, setIsEnableTokenVesting] = useState(false);
  const [isTokenVestingModalShow, setIsTokenVestingModalShow] = useState(true);
  const [accountInfo, setAccountInfo] = useState({
    name: "-",
    address: "-",
    balance: "-",
    totalSupply: "-",
  });

  const [amountYouWantToLock, setAmountYouWantToLock] = useState("");
  const [unlockTime, setUnlockTime] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [numberOfVests, setNumberOfVests] = useState("");
  const [vestingDate, setVestingDate] = useState("");

  const [errors, setErrors] = useState({
    amountYouWantToLock: false,
    unlockTime: false,
    logoUrl: false,
    destinationAddress: false,
    numberOfVests: false,
    vestingDate: false,
    amountYouWantToLock: false,
  });

  const submitForm = (e) => {
    if (
      amountYouWantToLock.length === 0 ||
      unlockTime.length === 0 ||
      destinationAddress.length === 0 ||
      numberOfVests.length === 0 ||
      vestingDate.length === 0
    ) {
      errorNotification("Kindly Fill all fields");
    }
    setTimeout(() => {
      successNotification("You Token has been Locked!");
    }, 3000);
    setTimeout(() => {
      setAmountYouWantToLock("");
      setUnlockTime("");
      setLogoUrl("");
      setDestinationAddress("");
      setNumberOfVests("");
      setVestingDate("");
    }, 3500);
    console.log(amountYouWantToLock);
    console.log(unlockTime);
    console.log(logoUrl);
    console.log(destinationAddress);
    console.log(numberOfVests);
    console.log(vestingDate);
  };

  const handleClose = () => {
    setShow(false);
    setIsEnableTokenVesting(true);
  };
  const handleShow = () => {
    setShow(true);
  };

  const focusTokenAddress = () => {
    setIsShow(false);
  };

  const getTokenAddress = async (e) => {
    try {
      if (
        e.target.value.length === 42 &&
        e.target.value.charAt(1) === "x" &&
        e.target.value.charAt(0) === "0"
      ) {
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
      position: "top-center",
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
                  onFocus={() => {
                    focusTokenAddress();
                  }}
                  onChange={(e) => {
                    getTokenAddress(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {isShow ? (
          <>
            <div className="row my-5  mx-5">
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
                      Lowest Fees on the Market
                    </li>
                    <li
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      New Easy to use UI
                    </li>
                    <li
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Extend Lock Anytime
                    </li>
                    <li
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      Transfer Ownership to Anyone
                    </li>
                    <li
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      1 Billion+ Total Value Locked
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
            </div>
          </>
        ) : (
          <>
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
                  <h4 htmlFor="">
                    Enter the amount of the token you want to lock
                  </h4>
                  <div className="fontuser">
                    <input
                      type="number"
                      placeholder="Ex.100"
                      name="amountyouwanttolock"
                      required
                      className="lp-token-input"
                      value={amountYouWantToLock}
                      onChange={(e) => {
                        setAmountYouWantToLock(Number(e.target.value));
                      }}
                    />
                    <small>
                      {errors.amountYouWantToLock && "Not a Number"}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            {isTokenVestingModalShow && (
              <>
                <Modal
                  show={show}
                  onHide={() => {
                    setShow(false);
                  }}
                  animation={false}
                  className="modalmain"
                >
                  <Modal.Header closeButton className="modalheader">
                    <h1>Vesting Claim</h1>
                  </Modal.Header>

                  <Modal.Body className="modalbody mx-5">
                    <div className="row mx-5">
                      <div className="col-md-12">
                        <h3>Number of Vests</h3>
                      </div>
                      <div className="col-md-6">
                        <div className="fontuser">
                          <input
                            type="number"
                            placeholder="Ex.100"
                            name="numberofvests"
                            required
                            className="lp-token-input"
                            value={numberOfVests}
                            onChange={(e) => {
                              setNumberOfVests(Number(e.target.value));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <h3>Vesting Time</h3>
                      </div>
                      <div className="col-md-6">
                        <div className="fontuser">
                          <input
                            type="datetime-local"
                            placeholder="2022-02-21 02:56 PM"
                            name="vestingtime"
                            required
                            className="datetime-input"
                            value={vestingDate}
                            onChange={(e) => {
                              setVestingDate(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <div className="row m-5">
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                      <Modal.Footer className="modalfooter">
                        <Button
                          className="button-vesting-lock"
                          type="submit"
                          onClick={handleClose}
                          disabled={
                            numberOfVests.length === 0 ||
                            vestingDate.length === 0
                          }
                        >
                          Enable Token Vesting
                        </Button>
                      </Modal.Footer>
                    </div>
                  </div>
                </Modal>
              </>
            )}
            <div className="row my-4">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div>
                  <h4 htmlFor="" className="text-center my-2">
                    Token Vesting :{" "}
                    {isEnableTokenVesting ? (
                      <span style={{ color: "green" }}>Enable</span>
                    ) : (
                      <span style={{ color: "red" }}>Disable</span>
                    )}
                  </h4>
                  <div className="fontuser">
                    <button
                      className="special-btn-vesting"
                      style={{
                        fontSize: "22px",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        backgroundColor: "#f0eded",
                      }}
                      disabled={isEnableTokenVesting}
                      onClick={() => {
                        handleShow();
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
                      name="unlocktime"
                      required
                      className="datetime-input"
                      value={unlockTime}
                      onChange={(e) => {
                        setUnlockTime(e.target.value);
                      }}
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
                      name="logourl"
                      required
                      className="lp-token-input"
                      value={logoUrl}
                      onChange={(e) => {
                        setLogoUrl(e.target.value);
                      }}
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
                      name="destinationaddress"
                      required
                      className="lp-token-input"
                      value={destinationAddress}
                      onChange={(e) => {
                        if (
                          e.target.value.length === 42 &&
                          e.target.value.charAt(1) === "x" &&
                          e.target.value.charAt(0) === "0"
                        ) {
                          setDestinationAddress(e.target.value);
                        } else {
                          errorNotification("Invalid Address!");
                        }
                      }}
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
                        backgroundColor: "#f0eded",
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
          </>
        )}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6"></div>

          <div className="col-md-2" style={{ margin: "0px" }}>
            {!isShow ? (
              <div
                className="shadow rounded"
                style={{
                  height: "60px",
                  fontSize: "15px",
                  width: "250px",
                  margin: "0px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h6 className="my-2">Fee</h6>
                <p>0.3 REDLC</p>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="col-md-2">
            <button
              type={"submit"}
              className="shadow p-3 mb-5 bg-white rounded d-flex flex-column justify-content-center align-items-center"
              style={{
                height: "60px",
                fontSize: "22px",
                color: "white",
                width: "250px",
                marginLeft: "20px",
                fontWeight: "bold",
                background: "linear-gradient(100deg, #4b4a4a 0%, #171717",
              }}
              onClick={(e) => {
                submitForm(e);
              }}
              disabled={
                amountYouWantToLock.length === 0 ||
                unlockTime.length === 0 ||
                destinationAddress.length === 0 ||
                numberOfVests.length === 0 ||
                vestingDate.length === 0
              }
            >
              Lock Token
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
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

export default LpToken;
