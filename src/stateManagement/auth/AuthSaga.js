import {call, put, takeLatest} from 'redux-saga/effects';
import {
  AUTH_LOGIN_API_CALL,
  AUTH_SIGNUP_INITIALIZATION,
  AUTH_OTP_VERIFY,
  AUTH_OTP_RESEND,
  AUTH_FORGOT_PASSWORD_API_CALL,
  NAME_UPDATE_API_CALL,
  PASSWORD_UPDATE_API_CALL,
  LOGOUT_API_CALL,
  USER_PROFILE_FETCH_API_CALL,
} from './AuthActionTypes';

import {
  setIsAuthenticated,
  commonModalDataSet,
  upeateIsAuthenticated,
  showLoader,
  hideLoader,
} from '../global/GlobalActionCreators';

import {
  setUserDataToReducer,
  setUserProfileToReducer,
  nameUpdateToReducer,
  deleteUserInfo,
  authOtpRequireToggle,
  logoutApiCall,
} from './AuthActionCreators';
/*

import {
  resendOtpApiCall,
  otpVerificationApiCall,
  signupApiCall,
  loginApiCall,
  fetchUserProfileAPIGet,
  nameUpdateApiCall,
  passwordUpdateApiCall,
  resetPasswordApiCall,
  userLogoutApiCall,
} from '../../common/apiCall/api';
import {setHeaders} from '../../common/apiCall/axiosSetup';
import {networkCallSaga} from '../utilitySaga';

function* getUserProfileApiCallWorker() {
  try {
    const userProfile = yield call(fetchUserProfileAPIGet);
    if (userProfile.data.activation_status === 0) {
      yield put(logoutApiCall());
      yield put(
        commonModalDataSet({
          status: true,
          title: 'User Inactive',
          body: 'You are now Inactive, Please contact to AGENT',
          buttonText: 'OK',
        }),
      );
      return;
    }

    yield put(setUserProfileToReducer(userProfile.data));
  } catch (error) {
    console.log(error);
  }
}

function* authLoginApiCallWorker({payload}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    if (!payload?.isSilent) {
      yield put(showLoader());
    }

    if (payload.device_token !== '-_-' && payload.device_token !== '') {
      yield call(storeUserDeviceToken, payload.device_token);
    }

    if (payload.device_token === '') {
      const device_token = yield call(getUserDeviceToken);
      if (device_token && getUserDeviceToken !== '') {
        payload.device_token = device_token;
      } else {
        payload.device_token = '-_-';
      }
    }

    const respons = yield call(loginApiCall, payload);

    if (respons.success === false && respons.message == 'OTP is not verified') {
      yield put(hideLoader());
      yield put(authOtpRequireToggle(true));
      return;
    }

    yield call(storeUserAccessToken, respons.access_token);
    yield call(storeUserNamePassword, payload);
    yield call(setHeaders, respons.access_token);
    const userProfile = yield call(fetchUserProfileAPIGet);

    if (!userProfile.data?.cell_phone_verified_at) {
      yield put(hideLoader());
      yield put(authOtpRequireToggle(true));
      return;
    }
    yield put(setUserProfileToReducer(userProfile.data));
    yield put(setIsAuthenticated({status: true}));
    if (!payload?.isSilent) {
      yield put(hideLoader());
    }
  } catch (error) {
    yield put(hideLoader());
    if (!payload?.isSilent) {
      if (error?.errors && error?.errors !== 'Unauthorized') {
        yield put(
          commonModalDataSet({
            status: true,
            title: 'Login Failed',
            body: error?.errors,
            buttonText: 'OK',
          }),
        );
      } else {
        yield put(
          commonModalDataSet({
            status: true,
            title: 'Login Failed',
            body: 'Invalid Phone NO  or Password ',
            buttonText: 'OK',
          }),
        );
      }
    }
  }
}
function* authIintSignUpWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());
    yield call(signupApiCall, payload);
    yield put(setUserDataToReducer(payload));
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Please check your sms and enter your verification code',
        buttonText: 'OK',
      }),
    );
    yield put(hideLoader());

    callback(payload.cell_phone);
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Signup Failed',
        body: error.errors,
        buttonText: 'OK',
      }),
    );
  }
}
function* authOTPVarifyWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(otpVerificationApiCall, payload);
    yield put(setUserDataToReducer({}));
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Signup Success',
        body: 'Please login first to Play EasyWin',
        buttonText: 'OK',
      }),
    );
    callback();
    yield put(hideLoader());
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Signup Failed',
        body: 'Please try again.',
        buttonText: 'OK',
      }),
    );
  }
}
function* authOTPResendWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());
    const response = yield call(resendOtpApiCall, payload);
    callback();
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Please check your sms and enter your verification code',
        buttonText: 'OK',
      }),
    );
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: 'Resend Failed',
        body: 'Please try again.',
        buttonText: 'OK',
      }),
    );
  }
}
function* authForgotPasswordWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(resetPasswordApiCall, payload);

    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body:
          'A temporary password has been sent to your registered mobile number',
        buttonText: 'OK',
      }),
    );
    callback();
    yield put(hideLoader());
  } catch (error) {
    yield put(hideLoader());
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Mobile number not found',
        buttonText: 'OK',
      }),
    );
    console.log(error);
  }
}
function* nameUpdateApiCallWorker({payload}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(nameUpdateApiCall, payload);
    yield put(nameUpdateToReducer(payload));
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'your name has been updated',
        buttonText: 'OK',
      }),
    );
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
    yield put(hideLoader());

    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'your name update has been failed',
        buttonText: 'OK',
      }),
    );
  }
}
function* passwordUpdateApiCallWorker({payload, callback}) {
  try {
    let isNetwork = yield call(networkCallSaga);
    if (!isNetwork) {
      return;
    }
    yield put(showLoader());

    yield call(passwordUpdateApiCall, payload);
    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Your Password has been updated',
        buttonText: 'OK',
      }),
    );
    callback();
    yield put(hideLoader());
  } catch (error) {
    console.log(error);
    yield put(hideLoader());

    yield put(
      commonModalDataSet({
        status: true,
        title: 'Password update failed',
        body: error.errors,
        buttonText: 'OK',
      }),
    );
  }
}
function* logoutApiCallWorker({payload}) {
  try {
    yield put(showLoader());
    let isNetwork = yield call(networkCallSaga);
    if (isNetwork) {
      yield call(userLogoutApiCall);
    }

    yield call(storeCleaneLogout);

    yield put(deleteUserInfo());

    yield put(upeateIsAuthenticated());

    yield put(hideLoader());
  } catch (error) {
    console.log(error);
    yield put(hideLoader());

    yield put(
      commonModalDataSet({
        status: true,
        title: '',
        body: 'Logout Request has been failed',
        buttonText: 'OK',
      }),
    );
  }
}
*/

function* globalSagaWatcher() {
  /*yield takeLatest(AUTH_LOGIN_API_CALL, authLoginApiCallWorker);
  yield takeLatest(AUTH_SIGNUP_INITIALIZATION, authIintSignUpWorker);
  yield takeLatest(AUTH_OTP_RESEND, authOTPResendWorker);
  yield takeLatest(AUTH_OTP_VERIFY, authOTPVarifyWorker);
  yield takeLatest(AUTH_FORGOT_PASSWORD_API_CALL, authForgotPasswordWorker);
  yield takeLatest(NAME_UPDATE_API_CALL, nameUpdateApiCallWorker);
  yield takeLatest(PASSWORD_UPDATE_API_CALL, passwordUpdateApiCallWorker);
  yield takeLatest(LOGOUT_API_CALL, logoutApiCallWorker);
  yield takeLatest(USER_PROFILE_FETCH_API_CALL, getUserProfileApiCallWorker);*/
}

export default globalSagaWatcher;
