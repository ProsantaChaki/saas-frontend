import {
  AUTH_SIGNUP_DATA_STORE,
  SET_USER_PROFILE_DATA_TO_STORE,
  CURRENT_BALANCE_UPDATE,
  WINING_BALANCE_UPDATE,
  NAME_UPDATE,
  DELETE_USER_INFO,
  AUTH_OTP_REQUIRE,
  DEVICE_TOKEN,
} from 'src/stateManagement/auth/AuthActionTypes';

const initialState = {
  userProfile: {},
  signupData: null,
  isOtpRequired: false,
  deviceToken: '',
};

export default function (state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case SET_USER_PROFILE_DATA_TO_STORE:
      return {
        ...state,
        userProfile: payload,
      };
    case AUTH_SIGNUP_DATA_STORE:
      return {
        ...state,
        signupData: payload,
      };
    case CURRENT_BALANCE_UPDATE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          current_balance: payload.type
            ? state.userProfile.current_balance + parseInt(payload.amount)
            : state.userProfile.current_balance - parseInt(payload.amount),
        },
      };
    case WINING_BALANCE_UPDATE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          winning_balance: payload.type
            ? state.userProfile.winning_balance + parseInt(payload.amount)
            : state.userProfile.winning_balance - parseInt(payload.amount),
        },
      };
    case NAME_UPDATE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          name: payload.name,
        },
      };
    case DELETE_USER_INFO:
      return {
        ...state,
        userProfile: {},
      };
    case AUTH_OTP_REQUIRE:
      return {
        ...state,
        isOtpRequired: payload,
      };
    case DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: payload,
      };

    default:
      return state;
  }
}
