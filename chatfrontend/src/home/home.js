import React, { useState, useEffect } from "react";
import "./home.scss";
import { 
  connectWallet,
  getCurrentWalletConnected 
} from "../utils/interact.js";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setWalletAdd, getNFTTokens } from '../store/action/index';


const Homepage = ({ setWalletAdd, getNFTTokens, wallet_add }) => {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(async () => { //TODO: implement
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

    // call the action
    setWalletAdd(walletAddress);

    addWalletListener();

    if(walletResponse.success){
      window.location.replace('/join');
    }
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the above button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  return (
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>

      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
}

Homepage.propTypes = {
  setWalletAdd: PropTypes.func.isRequired
}

const mapStateProps = (state) => ({
  wallet_add: state.wallet.wallet_add
})
export default connect(mapStateProps, { setWalletAdd, getNFTTokens })(Homepage);