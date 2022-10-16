import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import message from "../message.json";
import "../components/Components.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";

import Select from "react-select";

import factoryAbi from "../abis/factory.json";
import lockerABI from "../abis/lockerABI.json";

let factoryAbiAddress = "0xD65cf4e06E3edbb1F0131f9206704A8189fCFa52";

const StandardTokenLock = () => {
  const [show, setShow] = useState(false);
  const [disableDate, setDisableDate] = useState("");
  const [isShow, setIsShow] = useState(true);
  const [isEnableTokenVesting, setIsEnableTokenVesting] = useState(false);
  const [isTokenVestingModalShow, setIsTokenVestingModalShow] = useState(true);
  const [accountInfo, setAccountInfo] = useState({
    name: "-",
    address: "-",
    balance: "-",
    symbol: "-",
    totalSupply: "-",
  });

  const [isAddOwnerSubmitted, setIsAddOwnerSubmitted] = useState(false);
  const [allOwnerData, setAllOwnerData] = useState([]);

  const [amountYouWantToLock, setAmountYouWantToLock] = useState("");
  const [unlockTime, setUnlockTime] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [numberOfVests, setNumberOfVests] = useState("");
  const [vestingDate, setVestingDate] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");

  const [maxApprovelValue, setMaxApprovelValue] = useState();
  const [maxApprovelLimit, setMaxApprovelLimit] = useState();

  const [newFee, setNewFee] = useState(null);
  useEffect(() => {
    setDisableDate(moment.utc().format("YYYY-MM-DDThh:mm"));
  }, []);

  useEffect(() => {
    document.title = "Standard Locker";
  }, []);
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
        // console.log(newContract);
        let tokenName = await newContract.name(); // name

        const signerAddress = await signer.getAddress();
        let balanceToken = await newContract.balanceOf(signerAddress);

        let tokenSymbol = await newContract.symbol();
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
          symbol: tokenSymbol,
          totalSupply: totalSupplyInEther,
        });
        // successNotification("Token Info Recieved ");
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
            symbol: "-",
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

  const addOwnerOrVerifier = () => {
    if (
      destinationAddress.length === 42 &&
      destinationAddress.charAt(1) === "x" &&
      destinationAddress.charAt(0) === "0"
    ) {
      let newData = destinationAddress;
      setAllOwnerData([...allOwnerData, newData]);

      setIsAddOwnerSubmitted(true);
      setDestinationAddress("");
      console.warn(allOwnerData);
    }
  };

  const submitForm = async (e) => {
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    if (
      amountYouWantToLock.length === 0 ||
      unlockTime.length === 0 ||
      destinationAddress.length === 0 ||
      numberOfVests.length === 0 ||
      vestingDate.length === 0
    ) {
    } else {
      setTimeout(() => {
        // successNotification("You Token has been Locked!");
      }, 3000);
      setTimeout(() => {
        setAmountYouWantToLock("");
        setUnlockTime("");
        setLogoUrl("");
        setDestinationAddress("");
        setNumberOfVests("");
        setVestingDate("");
      }, 3500);
    }
    console.log(amountYouWantToLock);

    //get unix time
    let timeStamp = Math.round(new Date(unlockTime).getTime() / 1000);

    // console.log(logoUrl);
    // console.log(destinationAddress);
    // console.log(unlockTime);

    //// approve amount to factory
    let newContract = new ethers.Contract(
      "0xf791169B1dCf206C01B801906a81E2b7E9C67B69",
      message,
      signer
    );

    // factory contract calling

    let lockerContract = new ethers.Contract(
      factoryAbiAddress,
      factoryAbi,
      signer
    );

    const lockAmount = await ethers.utils.parseUnits(
      String(amountYouWantToLock),
      "ether"
    );

    let approveAnyAccount = await newContract.approve(
      factoryAbiAddress,
      lockAmount
    );
    console.log(approveAnyAccount);

    let requiredFee = await lockerContract.getFee();

    // console.log("Lock Amount : ", parseInt(lockAmount) + " WEI");
    // console.log("Time in Unix  : ", timeStamp);

    console.log("max approvel : ", maxApprovelValue);

    try {
      let result = await lockerContract.createLocker(
        "0xf791169B1dCf206C01B801906a81E2b7E9C67B69",
        ["0xB233571D5a1A4daB721844152E7879EC574896CD"],
        logoUrl,
        lockAmount,
        maxApprovelValue,
        0,
        timeStamp,
        0,
        0,
        {
          value: requiredFee,
        }
      );
      successNotification("Your Locker has been Generated");
    } catch (error) {
      console.log("ERROTR", error);
    }
  };

  const getValue = (e) => {
    setMaxApprovelValue(e.value);
  };

  const getFeeMethod = async () => {
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    // factory contract calling

    let lockerContract = new ethers.Contract(
      factoryAbiAddress,
      factoryAbi,
      signer
    );

    let requiredFee = await lockerContract.getFee();
    const requiredFeeInEther = ethers.utils.formatEther(requiredFee);
    setNewFee(requiredFeeInEther);
  };
  useEffect(() => {
    getFeeMethod();
  }, []);

  return (
    <div
      className="col-md-12 shadow p-3 mb-5 rounded"
      style={{ backgroundColor: "white" }}
    >
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
                  <p>{newFee} REDLC</p>
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
                        ? `${accountInfo.balance.slice(0, 8)} ${
                            accountInfo.symbol
                          }`
                        : accountInfo.balance}
                    </p>
                    <p>
                      <b>Token You Will Lock :</b> 0 {accountInfo.symbol}
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
                      {/* {errors.amountYouWantToLock && "Not a Number"} */}
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
                            min={disableDate}
                            required
                            className="datetime-input"
                            value={vestingDate}
                            onChange={(e) => {
                              setVestingDate(e.target.value);
                            }}
                          />
                          {Math.floor(new Date().getTime() / 1000) >
                            Math.floor(new Date(unlockTime).getTime() / 1000) &&
                          unlockTime ? (
                            <p style={{ color: "red" }}>
                              Cannot use past date{" "}
                            </p>
                          ) : (
                            <> </>
                          )}
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
                  <h4 htmlFor="" className="">
                    Unlock Time
                  </h4>
                  <div className="fontuser">
                    <input
                      type="datetime-local"
                      placeholder="2022-02-21 02:56 PM"
                      name="unlocktime"
                      required
                      min={disableDate}
                      className="datetime-input"
                      value={unlockTime}
                      onChange={(e) => {
                        setUnlockTime(e.target.value);
                      }}
                    />
                    {Math.floor(new Date().getTime() / 1000) >
                      Math.floor(new Date(unlockTime).getTime() / 1000) &&
                    unlockTime ? (
                      <p style={{ color: "red" }}>Cannot use past date </p>
                    ) : (
                      <> </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div>
                  <h4 htmlFor="" className="">
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
                  <h4 htmlFor="" className="">
                    Destination Address / Locker Address
                  </h4>
                  <div className="fontuser">
                    <input
                      type="text"
                      placeholder="Owner Address*"
                      name="destinationaddress"
                      required
                      className="lp-token-input"
                      value={destinationAddress}
                      onChange={(e) => {
                        setDestinationAddress(e.target.value);
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
                        addOwnerOrVerifier();
                      }}
                    >
                      + Add New Verifier / Owner
                    </button>
                  </div>
                </div>
              </div>

              {isAddOwnerSubmitted
                ? allOwnerData.map((elem, index) => {
                    return (
                      <div className="col-md-7" key={index}>
                        <div>
                          <h4 htmlFor="" className="">
                            Verifier / Owner Address
                          </h4>
                          <div className="fontuser ">
                            <div
                              className="lp-token-input"
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {elem}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : ""}
              {allOwnerData.length > 0 && (
                <div className="col-md-1">
                  <div>
                    <div className="fontuser">
                      <span
                        style={{
                          position: "absolute",
                          top: "-30px",
                          fontWeight: "bold",
                          fontSize: "15px",
                        }}
                      >
                        {" "}
                        Out of {allOwnerData.length}
                      </span>
                      <Select
                        options={allOwnerData.map((elem, index) => {
                          return { value: index + 1, label: index + 1 };
                        })}
                        onChange={(e) => {
                          getValue(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
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
                <p>{newFee} REDLC</p>
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
                border: "none",
                background: "linear-gradient(100deg, #4b4a4a 0%, #171717",
              }}
              onClick={(e) => {
                submitForm(e);
              }}
              // disabled={
              //   amountYouWantToLock.length === 0 ||
              //   unlockTime.length === 0 ||
              //   destinationAddress.length === 0 ||
              //   numberOfVests.length === 0 ||
              //   vestingDate.length === 0
              // }
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

export default StandardTokenLock;
