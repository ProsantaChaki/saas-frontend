//export const API_BASE_URL = 'https://easy-win.softbdltd.com/api/';
export const API_BASE_URL = 'https://easy-win.us/api/';
export const IMAGE_BASE_URL = 'https://easy-win.us/images/users/';

export const WEB_SOCKET_BASE_URL = '';

export const AWS_ACCESS_KEY_ID = '';
export const AWS_SECRET_ACCESS_KEY = '';

let newTime = parseInt(new Date().toString().split(' GMT')[1].split(' ')[0]);
let timeZone = newTime / 100 + (newTime % 100 ? 0.5 : 0);
export const TEMTIME = -timeZone * 60 + 180;
/*
export const TIME_SOUDI =
  (-parseInt(new Date().getTimezoneOffset()) + 180) * 60 * 1000;*/

export const TIME_SOUDI = -180 * 60 * 1000;
export const RESULT_SHOEING_DURATION = Math.ceil(
  (Math.abs(parseInt(new Date().getTimezoneOffset()) + 180) + 120) / 60,
);
//const now = moment(new Date(Date.now() - timeDiffSaudi * 60 * 1000));
