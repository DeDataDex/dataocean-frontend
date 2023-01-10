import * as types from './constants';

const initState = {
  grantee: null,
  video: null,
  videoList: null,
  pollVotes: null,
  accounts: [],
  isLoadingMore: false,
};

export default function reducers(state: any = initState, action: any) {
  switch (action.type) {
    case types.SET_VIDEO: {
      return { ...state, video: action.payload };
    }
    case types.SET_GRANTEE: {
      return { ...state, grantee: action.payload };
    }
    case types.SET_VIDEO_LIST: {
      return { ...state, videoList: action.payload };
    }
    case types.SET_WALLECT_ACCOUNTS: {
      return { ...state, accounts: action.payload };
    }
    default:
      return state;
  }
}