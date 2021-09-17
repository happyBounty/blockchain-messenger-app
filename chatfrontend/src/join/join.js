import React, { useState, useEffect } from "react";
import "../home/home.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setWalletAdd, getNFTTokens } from '../store/action/index';
import Spinner from '../layout/spinner';

const Join = ({ socket, getNFTTokens, wallet: { wallet_add, data } }) => {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");

  console.log(localStorage.getItem('wallet_address'));

  useEffect(() => {
    getNFTTokens(localStorage.getItem('wallet_address'));
  }, [getNFTTokens]);

  console.log(data)

  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
    } else {
      alert("username and roomname are must !");
      window.location.reload();
    }
  };

  return (
    <div className="homepage">
      <h1>Join to ChatRoom</h1>
      <input
        placeholder="Input your user name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      {data === [] ? (
        <Spinner />
      ) : (
        <select
          value={roomname}
          onChange={(e) => setroomname(e.target.value)}
          style={{fontSize: "1em"}}>
          <option value="" >Select the room name</option>
          {
            // eslint-disable-next-line array-callback-return
            data.map((d, index) => (
              <option value={d.name} key={index}>{d.name}</option>
            ))
          }
        </select>
      )}
      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>JOIN</button>
      </Link>
    </div>
  );
}

Join.propTypes = {
    setWalletAdd: PropTypes.func.isRequired
}

const mapStateProps = (state) => ({
  wallet: state.wallet
})
export default connect(mapStateProps, { setWalletAdd, getNFTTokens })(Join);
