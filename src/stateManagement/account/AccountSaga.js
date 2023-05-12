import {call, put, takeLatest} from 'redux-saga/effects';
import {
  GET_TRANSATION_HISTORY_API_CALL,
  TRANSTER_TO_CURRENT_BALANCE_API_CALL,
  TRANSTER_TO_OTHER_ACCOUNT_API_CALL,
  WINING_HISTORY_BY_USER_API_CALL,
} from './AccountActionTypes';
import {
  storeTransationHistoryToReducer,
  winingHistoryByUserStore,
} from './AccountActionCreators';
import {
  currentBalanceUpdate,
  fetchUserProfile,
  winingBalanceUpdate,
} from '../auth/AuthActionCreators';
import {
  commonModalDataSet,
  showLoader,
  hideLoader,
} from '../global/GlobalActionCreators';
import {
  fetchTransactionHistoryAPIGet,
  winningToCurrentBalanceTransferAPICall,
  balanceTransferToOtherAccountAPICall,
  winingHistoryByUserAPIGet,
} from '../../common/apiCall/api';
import {networkCallSaga} from '../utilitySaga';

function* getTransactionHistoryApiCallWorker({payload}) {
  try {
    yield put(showLoader());
    const transaction_history = yield call(
      fetchTransactionHistoryAPIGet,
      payload,
    );
    yield put(storeTransationHistoryToReducer(transaction_history.data));
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    console.log(e);
  }
}

function* transferWinningBalanceToCurrentBallanceApiCallWorker({
  payload,
  callback,
}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());
    yield call(winningToCurrentBalanceTransferAPICall, payload);
    yield put(currentBalanceUpdate({amount: payload.amount, type: true}));
    yield put(winingBalanceUpdate({amount: payload.amount, type: false}));
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Balance Transfer Success',
        body: `Amount $${payload.amount} has been transfer to current account`,
        buttonText: 'OK',
      }),
    );
    callback();
  } catch (e) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Balance Transfer Failed',
        body: 'Balance transfer has been failed, Try again later',
        buttonText: 'OK',
      }),
    );
  }
}
function* transferAnotherAccountApiCallWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());
    yield call(balanceTransferToOtherAccountAPICall, payload);
    yield put(winingBalanceUpdate({amount: payload.amount, type: false}));
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Balance Transfer Success',
        body: `Amount $${payload.amount} has been transfer to ${payload.cell_phone} `,
        buttonText: 'OK',
      }),
    );
    callback();
  } catch (e) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Balance Transfer Failed',
        body: 'Balance transfer has been failed, Try again later',
        buttonText: 'OK',
      }),
    );
  }
}

function* winingHistoryByUserCallWorker() {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());
    const response = yield call(winingHistoryByUserAPIGet);
    yield put(winingHistoryByUserStore(response.data));
    yield put(hideLoader());
  } catch (error) {
    yield put(hideLoader());
    console.log(error);
  }
}

function* globalSagaWatcher() {
  yield takeLatest(
    GET_TRANSATION_HISTORY_API_CALL,
    getTransactionHistoryApiCallWorker,
  );
  yield takeLatest(
    TRANSTER_TO_CURRENT_BALANCE_API_CALL,
    transferWinningBalanceToCurrentBallanceApiCallWorker,
  );
  yield takeLatest(
    TRANSTER_TO_OTHER_ACCOUNT_API_CALL,
    transferAnotherAccountApiCallWorker,
  );
  yield takeLatest(
    WINING_HISTORY_BY_USER_API_CALL,
    winingHistoryByUserCallWorker,
  );
}

export default globalSagaWatcher;
