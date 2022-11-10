import "./App.css";
import React, { useState, useEffect } from "react";

import AddressContainer from "./components/addressContainer";

function App() {
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [loading, setLoading] = useState(false);

  const checkMetaMask = () => {
    if (!window.ethereum) {
      alert("Please install MetaMask browser extension to continue");

      return false;
    }

    return true;
  };

  const getChainId = async () => {
    const { ethereum } = window;
    const chainId = await ethereum.request({ method: "eth_chainId" });

    setChainId(chainId);
  };

  const connectWallet = async () => {
    try {
      if (!checkMetaMask()) return;

      const { ethereum } = window;

      setLoading(true);

      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });

      await getChainId();

      setAccount(account);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  useEffect(() => {
    const checkConnectedWallet = async () => {
      try {
        if (!checkMetaMask()) return;

        const { ethereum } = window;

        setLoading(true);

        const [account] = await ethereum.request({
          method: "eth_accounts",
        });

        await getChainId();

        setAccount(account);
      } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkConnectedWallet();
  }, []);

  useEffect(() => {
    if (!checkMetaMask()) return;

    const { ethereum } = window;

    ethereum.on("chainChanged", handleChainChanged);

    return () => ethereum.removeListener("chainChanged", handleChainChanged);
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="header gradient-text">Loading...</p>;
    }

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
