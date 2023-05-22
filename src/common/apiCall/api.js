import {apiDelete, apiGet, apiPost, apiPut} from './axiosSetup';
import {
  LOGIN_URL,
  SIGNUP_URL,
  SUBSCRIOTION_STORE_URL,
  USER_ME,
  FEATURE_STORE_URL,
  FEATURE_LIST_URL
} from '../constantData/url';
import { BASE_URL } from '../constantData/constants';

export const PAGE_SIZE = 10;
export const GENRE_PAGE_SIZE = 9;


export function testGetApiCall(payload) {
  return apiGet(
    'users?page=2',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}


export function loginApiCall(payload) {
  return apiPost(
    LOGIN_URL,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
export function signupApiCall(payload) {
  return apiPost(
    SIGNUP_URL,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}





export function subscriptionCreateApiCall(payload) {
  console.log('subscriptionCreateApiCall', payload)
  return apiPost(
    SUBSCRIOTION_STORE_URL,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
// export function featureCreateApiCall(payload) {
//   console.log('featureCreateApiCall', payload)
//   return apiPost(
//     USER_ME,
//     payload,
//     {
//       timeout: 5000,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//     false,
//   );
// }


export function fetchFeatureAPIGet() {
  return apiGet(
    FEATURE_LIST_URL,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    },
    false,
    false,
  );
}
export function fetchUserProfileAPIGet() {
  return apiGet(
    USER_ME,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}

/*

export function otpVerificationApiCall(payload) {
  return apiPost(
    OTP_VERIFICATION_URL,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}

export function fetchUserProfileAPIGet() {
  return apiGet(
    GET_USER_PROFILE,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}
export function fetchTransactionHistoryAPIGet(payload) {
  console.log(JSON.stringify(payload));
  return apiGet(
    TRANSATION_HISTORY + '?page=' + payload?.pageNO,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}
export function userLogoutApiCall() {
  return apiPost(
    LOGOUT,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
export function winningToCurrentBalanceTransferAPICall(payload) {
  return apiPost(
    TRANSFER_TO_CURRENT_BALANCE,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
export function balanceTransferToOtherAccountAPICall(payload) {
  return apiPost(
    TRANSFER_TO_ANOTHER_ACCOUNT,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
export function nameUpdateApiCall(payload) {
  return apiPost(
    UPDATE_NAME,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}

export function passwordUpdateApiCall(payload) {
  return apiPost(
    UPDATE_PASSWORD,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
export function resetPasswordApiCall(payload) {
  return apiPost(
    FORGET_PASSWORD,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
export function biddingApiCall(payload) {
  return apiPost(
    BIDDING,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}

export function onGoingGameAPIGet() {
  return apiGet(
    ON_GOING_GAME,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}
export function winingHistoryAPIGet() {
  return apiGet(
    WIN_HISTORY,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}
export function winingHistoryByUserAPIGet() {
  return apiGet(
    WIN_HISTORY_BY_USER,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}
export function winingHistoryByGameAPIGet(code) {
  return apiGet(
    WIN_HISTORY_BY_GAME + code,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}

export function gameSuggestionAPIGet() {
  return apiGet(
    SUGGESTION,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
    false,
  );
}

export function resendOtpApiCall(payload) {
  return apiPost(
    RESEND_OTP,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
export function imageUpload(payload) {
  //console.log(payload);
  return apiPost(
    IMAGE_UPLOAD_URL,
    payload,
    {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    false,
  );
}
*/
