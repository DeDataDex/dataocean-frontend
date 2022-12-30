import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import videos from '@/Videos/store';

const reducers = {
  [videos.SCOPENAME]: videos.reducer,
};

const createRootReducer = (history: any) => (state: any, action: any) => {
  return combineReducers({
    router: connectRouter(history),
    ...reducers
  })(state, action);
};

export default createRootReducer;
