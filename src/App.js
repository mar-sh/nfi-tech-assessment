import "./App.css";
import React, { useState, useEffect } from "react";

import AddressContainer from "./components/addressContainer";

function App() {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");

  const getChainId = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask browser extension to continue");
      }

      const { ethereum } = window;
      const chainId = await ethereum.request({ method: "eth_chainId" });

      setChainId(chainId);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask browser extension to continue");
      }

      const { ethereum } = window;

      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      await getChainId();

      setAccount(account);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    const checkConnectedWallet = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask browser extension to continue");
        }

        const { ethereum } = window;

        const [account] = await ethereum.request({
          method: "eth_accounts",
        });

        await getChainId();

        setAccount(account);
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again later.");
      }
    };

    checkConnectedWallet();
  }, []);

  const renderContent = () => {
    if (account) {
      return (
        <div>
          <p className="header gradient-text">Connected</p>
          <p className="sub-text">Chain ID: {chainId}</p>
          <AddressContainer address={account}></AddressContainer>
        </div>
      );
    }

    return (
      <>
        <p className="header gradient-text">Welcome</p>
        <p className="sub-text">Connect your wallet to get started</p>
        <button
          onClick={connectWallet}
          className="cta-button connect-wallet-button"
        >
          Connect Wallet
        </button>
      </>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
