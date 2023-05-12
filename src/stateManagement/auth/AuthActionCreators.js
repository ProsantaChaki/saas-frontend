import {
  AUTH_LOGIN_API_CALL,
  AUTH_SIGNUP_INITIALIZATION,
  AUTH_SIGNUP_DATA_STORE,
  AUTH_OTP_RESEND,
  AUTH_OTP_REQUIRE,
  AUTH_OTP_VERIFY,
  AUTH_FORGOT_PASSWORD_API_CALL,
  SET_USER_PROFILE_DATA_TO_STORE,
  CURRENT_BALANCE_UPDATE,
  WINING_BALANCE_UPDATE,
  NAME_UPDATE_API_CALL,
  NAME_UPDATE,
  PASSWORD_UPDATE_API_CALL,
  PASSWORD_UPDATE,
  LOGOUT_API_CALL,
  DELETE_USER_INFO,
  USER_PROFILE_FETCH_API_CALL,
  DEVICE_TOKEN,
} from 'src/stateManagement/auth/AuthActionTypes';

function authLoginApiCall(payload) {
  return {
    type: AUTH_LOGIN_API_CALL,
    payload,
  };
}
function authInitSignupApiCall(payload, callback) {
  return {
    type: AUTH_SIGNUP_INITIALIZATION,
    payload,
    callback,
  };
}
function setUserDataToReducer(payload) {
  return {
    type: AUTH_SIGNUP_DATA_STORE,
    payload,
  };
}
function setUserProfileToReducer(payload) {
  return {
    type: SET_USER_PROFILE_DATA_TO_STORE,
    payload,
  };
}
function authOtpResendApiCall(value, callback) {
  return {
    type: AUTH_OTP_RESEND,
    payload: value,
    callback,
  };
}
function authOtpRequireToggle(value) {
  return {
    type: AUTH_OTP_REQUIRE,
    payload: value,
  };
}
function authOtpVeryfyApiCall(payload, callback) {
  return {
    type: AUTH_OTP_VERIFY,
    payload,
    callback,
  };
}
function authPasswordRecoverApiCall(payload, callback) {
  return {
    type: AUTH_FORGOT_PASSWORD_API_CALL,
    payload,
    callback,
  };
}
function currentBalanceUpdate(payload) {
  //console.log('action creator......', payload);
  return {
    type: CURRENT_BALANCE_UPDATE,
    payload,
  };
}
function winingBalanceUpdate(payload) {
  return {
    type: WINING_BALANCE_UPDATE,
    payload,
  };
}
function nameUpdateApiCall(payload) {
  return {
    type: NAME_UPDATE_API_CALL,
    payload,
  };
}
function nameUpdateToReducer(payload) {
  return {
    type: NAME_UPDATE,
    payload,
  };
}
function passwordUpdateApiCall(payload, callback) {
  return {
    type: PASSWORD_UPDATE_API_CALL,
    payload,
    callback,
  };
}
function passwordUpdateToReducer(payload) {
  return {
    type: PASSWORD_UPDATE,
    payload,
  };
}
function setDeviceToken(payload) {
  return {
    type: DEVICE_TOKEN,
    payload,
  };
}
function logoutApiCall() {
  //console.log('logout....actionCreator');
  return {
    type: LOGOUT_API_CALL,
  };
}

function deleteUserInfo() {
  return {
    type: DELETE_USER_INFO,
  };
}
function fetchUserProfile() {
  return {
    type: USER_PROFILE_FETCH_API_CALL,
  };
}

export {
  authLoginApiCall,
  setUserDataToReducer,
  authInitSignupApiCall,
  authOtpResendApiCall,
  authOtpRequireToggle,
  authOtpVeryfyApiCall,
  authPasswordRecoverApiCall,
  setUserProfileToReducer,
  currentBalanceUpdate,
  winingBalanceUpdate,
  nameUpdateApiCall,
  nameUpdateToReducer,
  passwordUpdateApiCall,
  passwordUpdateToReducer,
  logoutApiCall,
  deleteUserInfo,
  setDeviceToken,
  fetchUserProfile,
};
