import * as types from './constants';

export function getGrantee(payload: any) {
  return {
    type: types.GET_GRANTEE,
    payload
  };
}

export function setGrantee(payload: any) {
  return {
    type: types.SET_GRANTEE,
    payload
  };
}

export function getVideo(payload: any) {
  return {
    type: types.GET_VIDEO,
    payload
  };
}

export function setVideo(payload: any) {
  return {
    type: types.SET_VIDEO,
    payload
  };
}

export function connectWallet(callback: any) {
  return {
    type: types.GET_WALLECT_ACCOUNTS,
    callback
  };
}

export function setWalletAccounts(payload: any) {
  return {
    type: types.SET_WALLECT_ACCOUNTS,
    payload
  };
}

export function getVideoList(payload: any, callback?: any) {
  return {
    type: types.GET_VIDEO_LIST,
    payload,
    callback
  };
}

export function setVideoList(payload: any) {
  return {
    type: types.GET_VIDEO_LIST,
    payload
  };
}


export function getAccountBalance(payload: any, callback?: any) {
  return {
    type: types.GET_ACCOUNT_BALANCE,
    payload,
    callback
  };
}

export function playVideoNotify(payload: any) {
  return {
    type: types.POST_VIDEO_PLAY_NOTIFY,
    payload,
  };
}