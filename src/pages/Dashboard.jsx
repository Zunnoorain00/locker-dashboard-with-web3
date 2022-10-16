import React, { useState, useEffect } from "react";
import "../App.css";
import Card from "../components/Card";
import { ethers } from "ethers";
import Web3 from "web3";
import { ToastContainer, toast } from "react-toastify";
//abis
import message from "../message.json";
import mapper from "../abis/mapper.json";
import lockerABI from "../abis/lockerABI.json";
import Slider from "react-slick";
let mapper_abi_address = "0xBd5E3eA3Ff59f9e69808707f98fd52419357AcB9";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
};
const Dashboard = () => {
  const [lockerName, setLockerName] = useState("");
  const [recentLockerAddress, setRecentLockerAddress] = useState([]);
  const [factoryAddress, setFactoryAddress] = useState("");
  const [loader, setLoader] = useState(false);

  const [walletAccountAddress, setWalletAccountAddress] = useState("");

  // my locker states variables
  const [myLockerAddress, setMyLockerAddress] = useState([]);
  const [myLockerLength, setMyLockerLength] = useState("");

  // // console.log("mapper", mapper);
  useEffect(() => {
    document.title = "Locker (Dashboard)";
  }, []);

  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert("No Ethereum browser detected! Check out MetaMask");
    }
    return provider;
  };

  const mapperInfo = async () => {
    setLoader(true);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();
    let mapperContract = new ethers.Contract(
      mapper_abi_address,
      mapper,
      signer
    );

    // // console.log(mapperContract);
    let result = await mapperContract.totalLockers();
    const totalLocker = Web3.utils.fromWei(result.toString(), "ether");
    // // console.log("total locker : ", totalLocker);

    let resultRecentLockers = await mapperContract.recentLockers();
    // // console.log("Recent lockers : ", resultRecentLockers);
    setRecentLockerAddress(resultRecentLockers);

    // get Factory
    let getFactory = await mapperContract.getFactory();
    // // console.log("Factory : ", getFactory);
    setFactoryAddress(getFactory);
    setLoader(false);
  };

  const getTokenName = async () => {
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();

    let newContract = new ethers.Contract(
      "0xf791169B1dCf206C01B801906a81E2b7E9C67B69",
      message,
      signer
    );
    // // console.log(newContract);
    let tokenName = await newContract.name(); // name
    // // console.log("Token Name in DashBoard  : ", tokenName);
    //setLockerName(tokenName);

    let tokenSymbol = await newContract.symbol();
    // // console.log("tokenSymbol in DashBoard  : ", tokenSymbol);
    setLockerName(tokenSymbol);
  };

  const getWalletAccountInfo = async () => {
    const provider1 = detectProvider();
    const web3 = new Web3(provider1);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account = await provider.send("eth_requestAccounts", []);
    return account[0];
  };

  const myLockerInfo = async () => {
    setLoader(true);
    const provider1 = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider1.getSigner();

    let mapperContract = new ethers.Contract(
      mapper_abi_address,
      mapper,
      signer
    );

    let accountInfo = await getWalletAccountInfo();
    // console.warn(accountInfo);

    let getLockerFromAddress = await mapperContract.userLockerAddresses(
      accountInfo
    );
    // // console.log("my lockers Address", getLockerFromAddress);

    let getLockerLength = await mapperContract.usersTotalLocker(accountInfo);
    // console.log("my lockers ", parseInt(getLockerLength));
    setMyLockerLength(parseInt(getLockerLength));

    setMyLockerAddress(getLockerFromAddress);
    setLoader(false);
  };

  useEffect(() => {
    myLockerInfo();
  }, []);

  useEffect(() => {
    getWalletAccountInfo();
    mapperInfo();
  }, []);

  useEffect(() => {
    getTokenName();
  }, []);

  return (
    <>
      <div className="container-fluid my-5 d-flex justify-content-between align-items-center">
        <h1>Recent Locker</h1>
        <div className="fontuser">
          <input
            type="text"
            placeholder="Search"
            name="search"
            required
            className="dashboard-input"
          />
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-evenly align-items-center">
        {loader
          ? recentLockerAddress.map((elem, index) => {
              return (
                <div
                  key={elem}
                  className="spinner-border"
                  role="status"
                  style={{ height: "100px", width: "100px" }}
                ></div>
              );
            })
          : recentLockerAddress.map((address, index) => {
              return (
                <Card
                  key={index}
                  name={lockerName}
                  getToken={address}
                  lockerNumber={index}
                />
              );
            })}
      </div>
      <div className="container-fluid my-5 d-flex justify-content-between align-items-center">
        <h1>My Locker</h1>
        <div className="fontuser">
          <input
            type="text"
            placeholder="Search"
            name="search"
            required
            className="dashboard-input"
          />
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        </div>
      </div>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {myLockerLength === 0 && (
          <h5 style={{ color: "red" }}>No Locker Available</h5>
        )}
        {/* <Card
          name={"YGER/REDLC"}
          UnlocksIn={"204:21:25:07"}
          getToken={"0xb233571d5a1a4dab721844152e7879ec574896cd"}
        /> */}
      </div>

      <div className="container">
        <div>
          <Slider {...settings}>
            {myLockerAddress
              .map((address, index) => {
                return (
                  <div key={index}>
                    <Card name={lockerName} getToken={address} />
                  </div>
                );
              })
              .reverse()}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
