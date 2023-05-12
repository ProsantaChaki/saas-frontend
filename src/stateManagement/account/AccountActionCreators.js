import {
  SET_WINNING_BALANCE,
  SET_WINNING_HISTORY,
  GET_TRANSATION_HISTORY_API_CALL,
  STORE_TRANSATION_HISTORY_TO_REDUCER,
  TRANSTER_TO_CURRENT_BALANCE_API_CALL,
  TRANSTER_TO_OTHER_ACCOUNT_API_CALL,
  WINING_HISTORY_BY_USER_API_CALL,
  WINING_HISTORY_BY_USER_STORE,
} from './AccountActionTypes';

function setWiningBalance(payload) {
  return {
    type: SET_WINNING_BALANCE,
    payload,
  };
}
function winingHistoryByUserApiCall() {
  return {
    type: WINING_HISTORY_BY_USER_API_CALL,
  };
}
function winingHistoryByUserStore(payload) {
  return {
    type: WINING_HISTORY_BY_USER_STORE,
    payload,
  };
}
function setWiningHistory(payload) {
  return {
    type: SET_WINNING_HISTORY,
    payload,
  };
}
function getTransactionHistoryApiCall(payload) {
  return {
    type: GET_TRANSATION_HISTORY_API_CALL,
    payload,
  };
}
function storeTransationHistoryToReducer(payload) {
  return {
    type: STORE_TRANSATION_HISTORY_TO_REDUCER,
    payload,
  };
}
function transferToCurrentBalanceApiCall(payload, callback) {
  return {
    type: TRANSTER_TO_CURRENT_BALANCE_API_CALL,
    payload,
    callback,
  };
}

function transferToAnotherAccountApiCall(payload, callback) {
  return {
    type: TRANSTER_TO_OTHER_ACCOUNT_API_CALL,
    payload,
    callback,
  };
}

export {
  setWiningBalance,
  setWiningHistory,
  storeTransationHistoryToReducer,
  getTransactionHistoryApiCall,
  transferToCurrentBalanceApiCall,
  transferToAnotherAccountApiCall,
  winingHistoryByUserApiCall,
  winingHistoryByUserStore,
};
