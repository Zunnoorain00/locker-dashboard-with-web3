import React, { useState, useEffect } from "react";
import "./Components.css";
import Web3 from "web3";
import { ethers } from "ethers";

const Header = () => {
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState(null);
  const [accountNetworkName, setAccountNetworkName] = useState("");
  const [accountNetworkId, setAccountNetworkId] = useState("");
  const [isAccountConnected, setIsAccountConnected] = useState(false);

  useEffect(() => {
    if (accountNetworkId != 8457) {
      switchNetwork();
    }
  }, []);

  useEffect(() => {
    // checkConnect()
  }, []);


  const checkConnect = async ()=>{
    let checkConnection = await Boolean(localStorage.getItem("isConnected"));
    console.log(checkConnection);
    isAccountConnected(checkConnection);
  }

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

  const connectMetaMask = async () => {
    const provider1 = detectProvider();
    const web3 = new Web3(provider1);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account = await provider.send("eth_requestAccounts", []);
    setAccountAddress(account[0]);
    console.log(accountAddress);
    const networkId = await web3.eth.getChainId();
    setAccountNetworkId(networkId);
    if (accountNetworkId != 8457) {
      switchNetwork();
    }

    localStorage.setItem("isConnected", true);

    //check chain id
    // await checkNetwork();

    //check network name
    // await checkNameNetwork();

    //check balance
    // await checkBalance(account[0]);

    //checkConnectionStatus
    // await checkConnected(account[0]);
  };
  const disconnectWallet = () => {
    setAccountAddress("");
    localStorage.setItem("isConnected", false);
  };
  const switchNetwork = async () => {
    // let getChainId = prompt("Enter Chain ID : ");
    const provider = detectProvider();
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x2109" }],
      });

      console.log("You are on Red Light Test network");
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 32602) {
        console.log(
          "This network is not available in your metamask, please add it"
        );
        try {
          window.ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "8457",
                  chainName: "Red Light Testnet",
                  nativeCurrency: {
                    name: "Red Light Coin",
                    symbol: "tRLC",
                    decimals: 18,
                  },
                  rpcUrls: ["http://67.219.103.0:80/"],
                  blockExplorerUrls: ["https://testnet.redlightscan.finance/"],
                },
              ],
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div className="container-fluid my-5 d-flex justify-content-end align-items-center">
      <div>
        {accountAddress ? (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <button
              className="special-btn"
              style={{
                fontSize: "22px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
            <button
              className="special-btn"
              style={{
                fontSize: "22px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              disabled
            >
              {accountAddress}
            </button>
          </div>
        ) : (
          <button
            className="button-shadow shadow p-3 mb-5 bg-white rounded"
            style={{
              fontSize: "22px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            onClick={connectMetaMask}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
