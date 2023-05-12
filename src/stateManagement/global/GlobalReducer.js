import {
  APP_INITIALIZATION,
  IS_SHOW_CART,
  IS_AUTHENTICATED,
  COMMON_MODAL_DATA_SET,
  LOADER_SHOW,
  LOADER_HIDE,
  PROFILE_MODAL_VISIBILITY,
  UPDATE_IS_AUTHENTICATEED,
  INTERNET_CONNECTION_STATUS,
  SUGGESTION_STORE,
  NOTIFIED_NAV,
  NOTIFIED_SUB_NAV,
  TEST_DATA_UPDATE
} from 'src/stateManagement/global/GlobalActionTypes';

const initialState = {
  isAppOpen: false,
  isAuthenticated: false,
  isShowCart: false,
  commonModalOn: false,
  commonModalTitle: '',
  commonModalBody: '',
  commonModalButtonText: '',
  isLoading: false,
  profileModalVisibility: false,
  isConnectedToInternet: false,
  networkType: [], // none,unknown,cellular,wifi,bluetooth,ethernet,wimax,vpn,other,
  netInfoState: null,
  gameSuggestion: [],
  suggestionCount: 0,
  notifiedNav: '',
  notifiedSubNav: '',
  testData:'welcome to saas project'
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case TEST_DATA_UPDATE:
      return {
        ...state,
        testData: payload.message
      }


    case APP_INITIALIZATION:
      return {
        ...state,
        isAppOpen: payload.status,
      };
    case IS_SHOW_CART:
      return {
        ...state,
        isShowCart: payload.status,
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload.status,
      };
    case COMMON_MODAL_DATA_SET:
      return {
        ...state,
        commonModalOn: payload.status,
        commonModalTitle: payload.title,
        commonModalBody: payload.body,
        commonModalButtonText: payload.buttonText,
      };

    case LOADER_SHOW:
      return {
        ...state,
        isLoading: true,
      };

    case LOADER_HIDE:
      return {
        ...state,
        isLoading: false,
      };
    case PROFILE_MODAL_VISIBILITY:
      return {
        ...state,
        profileModalVisibility: !state.profileModalVisibility,
      };
    case UPDATE_IS_AUTHENTICATEED:
      return {
        ...state,
        isAuthenticated: false,
      };

    case INTERNET_CONNECTION_STATUS:
      const {isConnected, networkType, netInfoState} = payload;
      return {
        ...state,
        netInfoState,
        networkType,
        isConnectedToInternet: isConnected,
      };
    case SUGGESTION_STORE:
      return {
        ...state,
        gameSuggestion: payload.structuredMessage,
        suggestionCount: payload.count,
      };
    case NOTIFIED_NAV:
      return {
        ...state,
        notifiedNav: payload,
      };
    case NOTIFIED_SUB_NAV:
      return {
        ...state,
        notifiedSubNav: payload,
      };

    default:
      return state;
  }
}
