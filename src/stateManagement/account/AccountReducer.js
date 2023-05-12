import {
  SET_CURRENT_BALANCE,
  SET_WINNING_BALANCE,
  SET_WINNING_HISTORY,
  STORE_TRANSATION_HISTORY_TO_REDUCER,
  WINING_HISTORY_BY_USER_STORE,
} from './AccountActionTypes';

const initialState = {
  winingHistory: {},
  winingHistoryByUser: [],
  winingBalance: 3000,
  currentBalance: 1000,
  transactionHistory: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET_WINNING_HISTORY:
      return {
        ...state,
        winingHistory: payload,
      };
    case SET_WINNING_BALANCE:
      return {
        ...state,
        winingBalance: payload,
      };
    case WINING_HISTORY_BY_USER_STORE:
      return {
        ...state,
        winingHistoryByUser: payload,
      };
    case SET_CURRENT_BALANCE:
      return {
        ...state,
        currentBalance: payload,
      };
    case STORE_TRANSATION_HISTORY_TO_REDUCER:
      if (payload.current_page > 1) {
        let temData = [...state.transactionHistory.data, ...payload.data];
        payload.data = temData;
      }

      return {
        ...state,
        transactionHistory: payload,
      };
    default:
      return state;
  }
}
