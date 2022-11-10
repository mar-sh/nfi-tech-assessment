import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Welcome</p>
          <p className="sub-text">Connect your wallet to get started</p>
          <button className="cta-button connect-wallet-button">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
