import { call, put, takeLatest } from 'redux-saga/effects';
import withLoading from '@/sagaMiddleware/index';
import * as api from './apis';
import * as actions from './actions';
import * as types from './constants';

export function* getPoll(action: ReturnType<typeof actions.getPoll>) {
  try {
    const res = yield call(withLoading, api.getPoll, action.type, action.payload);
    yield put(actions.setPoll(res));
  } catch (err) {
    if (err.message) {
      console.log(err.message);
    }
  }
}

function* watchGetPoll() {
  yield takeLatest(types.GET_POLL, getPoll)
}

export function* getWalletAccounts(action: ReturnType<typeof actions.connectWallet>) {
  try {
    const res = yield call(withLoading, api.getWalletAccounts, action.type);
    yield put(actions.setWalletAccounts(res));
    yield call(action.callback, res);
  } catch (err) {
    if (err.message) {
      console.log(err.message);
    }
  }
}

function* watchGetWalletAccounts() {
  yield takeLatest(types.GET_WALLECT_ACCOUNTS, getWalletAccounts)
}

export function* getPollList(action: ReturnType<typeof actions.getPollList>) {
  try {
    const res = yield call(withLoading, api.getPollList, action.type, action.payload);
    yield put(actions.setPollList(res));
    if (action.callback) {
      yield call(action.callback);
    }
  } catch (err) {
    if (err.message) {
      yield put(actions.setPollList([]));
    }
  }
}

function* watchGetPollList() {
  yield takeLatest(types.GET_POLL_LIST, getPollList)
}

export function* getAccountBalance(action: ReturnType<typeof actions.getAccountBalance>) {
  try {
    const res = yield call(withLoading, api.getAccountBalance, action.type, action.payload);
    if (action.callback) {
      yield call(action.callback, res);
    }
  } catch (err) {
    if (err.message) {
      console.log(err.message);
    }
  }
}

function* watchGetAccountBalance() {
  yield takeLatest(types.GET_ACCOUNT_BALANCE, getAccountBalance)
}

export function* getVideoServerNotify(action: ReturnType<typeof actions.getVideoServerNotify>) {
  try {
    yield call(withLoading, api.getVideoServerNotify, action.type, action.payload);
  } catch (err) {
    if (err.message) {
      console.log(err.message);
    }
  }
}

function* watchGetVideoServerNotify() {
  yield takeLatest(types.GET_VIDEO_SERVER_NOTIFY, getVideoServerNotify)
}

const sagas = [
  watchGetPoll,
  watchGetPollList,
  watchGetWalletAccounts,
  watchGetAccountBalance,
  watchGetVideoServerNotify,
];

export default sagas;