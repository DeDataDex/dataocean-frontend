import * as types from './constants';

const initState = {
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
    case types.SET_VIDEO_LIST: {
      return { ...state, videoList: action.payload };
    }
    case types.SET_POLL_VOTES: {
      return { ...state, pollVotes: action.payload };
    }
    case types.SET_WALLECT_ACCOUNTS: {
      return { ...state, accounts: action.payload };
    }
    case types.GET_POLL_LIST_REQUEST: {
      return { ...state, isLoadingMore: true };
    }
    case types.GET_POLL_LIST_SUCCESS:
    case types.GET_POLL_LIST_FAILURE: {
      return { ...state, isLoadingMore: false };
    }
    default:
      return state;
  }
}