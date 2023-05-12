import {all} from 'redux-saga/effects';
import globalSagaWatcher from 'src/stateManagement/global/GlobalSaga';
import authSagaWatcher from 'src/stateManagement/auth/AuthSaga';


export default function* RootSaga() {
  yield all([
    globalSagaWatcher(),
    authSagaWatcher(),

  ]);
}
