import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import withLoading from '@/sagaMiddleware/index';
import * as api from './apis';
import * as actions from './actions';
import * as types from './constants';

export function* getGrantee(action: ReturnType<typeof actions.getVideo>) {
  try {
    // const res = yield call(withLoading, api.getGrantee, action.type, action.payload);
    // yield put(actions.setGrantee(res.account.base_account.address));
    yield put(actions.setGrantee(process.env.REACT_APP_DATA_OCEAN_GRANTEE));
  } catch (err) {
    if (err.message) {
      console.log(err.message);
    }
  }
}

function* watchGetGrantee() {
  yield takeLatest(types.GET_GRANTEE, getGrantee)
}

export function* getVideo(action: ReturnType<typeof actions.getVideo>) {
  try {
    const res = yield call(withLoading, api.getVideo, action.type, action.payload);
    yield put(actions.setVideo(res.Video));
  } catch (err) {
    if (err.message) {
      console.log(err.message);
    }
  }
}

function* watchGetVideo() {
  yield takeLatest(types.GET_VIDEO, getVideo)
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
  yield takeEvery(types.GET_ACCOUNT_BALANCE, getAccountBalance)
}

export function* senderVoucher(action: ReturnType<typeof actions.senderVoucher>) {
  try {
    yield call(withLoading, api.senderVoucher, action.type, action.payload);
  } catch (err) {
    if (err.message) {
      console.log(err.message);
    }
  }
}

function* watchPlayVideoNotify() {
  yield takeLatest(types.POST_SENDER_VOUCHER, senderVoucher)
}

const sagas = [
  watchGetGrantee,
  watchGetVideo,
  watchGetWalletAccounts,
  watchGetAccountBalance,
  watchPlayVideoNotify,
];

export default sagas;