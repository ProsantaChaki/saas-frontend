import {
  START_INIT_APP,
  APP_INITIALIZATION,
  IS_SHOW_CART,
  IS_AUTHENTICATED,
  COMMON_MODAL_DATA_SET,
  LOADER_SHOW,
  LOADER_HIDE,
  PROFILE_MODAL_VISIBILITY,
  UPDATE_IS_AUTHENTICATEED,
  INTERNET_CONNECTION_STATUS,
  SUGGESTION_API_CALL,
  SUGGESTION_STORE,
  RELOAD_APP,
  NOTIFIED_NAV,
  NOTIFIED_SUB_NAV,
  IMAGE_UPLOAD,
} from 'src/stateManagement/global/GlobalActionTypes';

function startAppInitialization(payload) {
  return {
    type: START_INIT_APP,
    payload,
  };
}
function appInitialization(payload) {
  return {
    type: APP_INITIALIZATION,
    payload,
  };
}
function isShowCart(payload) {
  return {
    type: IS_SHOW_CART,
    payload,
  };
}

function setIsAuthenticated(payload) {
  return {
    type: IS_AUTHENTICATED,
    payload,
  };
}
function commonModalDataSet(payload) {
  return {
    type: COMMON_MODAL_DATA_SET,
    payload,
  };
}
function showLoader() {
  return {
    type: LOADER_SHOW,
  };
}

function hideLoader() {
  return {
    type: LOADER_HIDE,
  };
}
function profileModalToggle() {
  return {
    type: PROFILE_MODAL_VISIBILITY,
  };
}
function upeateIsAuthenticated() {
  return {
    type: UPDATE_IS_AUTHENTICATEED,
  };
}

function internetConnectivityStatus(payload) {
  return {
    type: INTERNET_CONNECTION_STATUS,
    payload,
  };
}
function gameSuggestionApiCall() {
  return {
    type: SUGGESTION_API_CALL,
  };
}
function gameSuggestionStore(payload) {
  return {
    type: SUGGESTION_STORE,
    payload: payload,
  };
}
function reloadAPP() {
  return {
    type: RELOAD_APP,
  };
}
function setNotifiedNav(payload) {
  return {
    type: NOTIFIED_NAV,
    payload,
  };
}
function setNotifiedSubNav(payload) {
  return {
    type: NOTIFIED_SUB_NAV,
    payload,
  };
}
function imageUpload(payload) {
  return {
    type: IMAGE_UPLOAD,
    payload,
  };
}
export {
  startAppInitialization,
  appInitialization,
  isShowCart,
  setIsAuthenticated,
  commonModalDataSet,
  showLoader,
  hideLoader,
  profileModalToggle,
  upeateIsAuthenticated,
  internetConnectivityStatus,
  gameSuggestionApiCall,
  gameSuggestionStore,
  reloadAPP,
  setNotifiedNav,
  setNotifiedSubNav,
  imageUpload,
};
