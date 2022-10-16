import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Web3 from "web3";
import lockerABI from "../abis/lockerABI.json";
import moment from "moment";
const Card = ({ name, getToken, lockerNumber }) => {
  const [remainingTimeCard, setRemainingTimeCard] = useState("");
  const [timeToShow, setTimeToShow] = useState("");
  let newString = String(getToken);
  newString = newString?.slice(0, 6) + "...." + newString.slice(38, 42);
  const navigate = useNavigate();
  const myFunction = () => {
    navigator.clipboard.writeText(getToken);
    // successNotification("Coppied!")
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

  const lockerInfo = async () => {
    try {
      const provider1 = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider1.getSigner();
      // error here
      const LockerContract = new ethers.Contract(getToken, lockerABI, signer);
      // console.log("contract", LockerContract);
      let LockerDetail = await LockerContract.R_getLockerDetail();
      console.log("Locker Detail", LockerDetail);
      let lockerRemainingTime = parseInt(LockerDetail.remaingTime._hex);
      let remainingTime = await getRemainingTime(lockerRemainingTime);
      // console.log("Remaining Time : ", remainingTime);
      setRemainingTimeCard(remainingTime);

      let date = new Date();
      var seconds = date.getTime() / 1000;
      let updateTime = seconds + lockerRemainingTime;
      var Newdate = new Date(updateTime * 1000);
      let TimeIWantToGet = moment(Newdate).format("ll[ at ]LT");
      setTimeToShow(TimeIWantToGet);
    } catch (error) {
      console.log(error);
    }
  };
  const getRemainingTime = async (lockerRemainingTime) => {
    var seconds = lockerRemainingTime;
    // multiply by 1000 because Date() requires miliseconds
    var date = new Date(seconds * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    // This formats your string to HH:MM:SS
    return hh + ":" + mm + ":" + ss;
  };

  useEffect(() => {
    lockerInfo();
  }, []);

  return (
    <>
      <div
        className="container shado bg-white rounded card-item my-4"
        style={{ width: "250px" }}
        onClick={() => {
          navigate("/lockerDetails", {
            state: {
              UnlocksDate: "14 Mar 2023 at 03:01 am",
              lAddress: getToken,
              lockerNumber: lockerNumber,
              remainingTimeCard: remainingTimeCard,
            },
          });
        }}
      >
        <div>
          <h2>{name}</h2>
        </div>
        <div>
          <p>
            <i
              className="fa-solid fa-calendar-days fa-lg"
              style={{ marginRight: "0px" }}
            ></i>{" "}
            {timeToShow}
          </p>
        </div>
        <div>
          <b>Unlocks In:</b>
          <p>{remainingTimeCard}</p>
        </div>
        <hr />
        <div>
          <b>Token Address:</b>
          <p
            onClick={() => {
              myFunction();
            }}
          >
            {getToken && newString}
          </p>
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
    </>
  );
};

export default Card;
