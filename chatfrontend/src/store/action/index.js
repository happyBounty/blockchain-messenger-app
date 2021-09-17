import axios from 'axios';
import {
  SET_WALLET_ADDRESS,
  SET_DATA
} from './types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const process = (encrypt, text, cypher) => {
  return {
    type: "PROCESS",
    payload: {
      encrypt,
      text,
      cypher,
    },
  };
};

export const setWalletAdd = (address) => dispatch => {
  localStorage.setItem('wallet_address', address)

  dispatch({
    type: SET_WALLET_ADDRESS,
    payload: address
  })
};

export const getNFTTokens = (address) => async dispatch => {
  // Get all assets 
	// var result = await api.get(`https://api.opensea.io/api/v1/assets?owner=0x525022ecd0de305f714e108d3b4ce68928c2d81f&offset=0&limit=50`);

  // Get collections
	var result = await api.get(`https://api.opensea.io/api/v1/collections?asset_owner=0x525022ecd0de305f714e108d3b4ce68928c2d81f&offset=0&limit=300`);

  dispatch({
    type: SET_DATA,
    payload: result.data
  })
}
