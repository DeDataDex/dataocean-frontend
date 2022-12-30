import { all, fork } from 'redux-saga/effects';
import videos from '@/Videos/store';
import routerSaga from './router/sagas';

const sagas = [
  ...videos.sagas,
  ...routerSaga
];

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
};

export default rootSaga;