import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask browser extension to continue");
      }

      const { ethereum } = window;

      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });

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

        setAccount(account);
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again later.");
      }
    };

    checkConnectedWallet();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Welcome</p>
          <p className="sub-text">Connect your wallet to get started</p>
          <button
            onClick={connectWallet}
            className="cta-button connect-wallet-button"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
