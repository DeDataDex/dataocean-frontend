import * as types from './constants';

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

export function getPollVotes(payload: any) {
  return {
    type: types.GET_POLL_VOTES,
    payload
  };
}

export function setPollVotes(payload: any) {
  return {
    type: types.SET_POLL_VOTES,
    payload
  };
}

export function getPollByHeight(payload: any) {
  return {
    type: types.GET_POLL_BY_HEIGHT,
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

export function getVideoServerNotify(payload: any) {
  return {
    type: types.GET_VIDEO_SERVER_NOTIFY,
    payload,
  };
}