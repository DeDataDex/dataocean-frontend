import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createLoadingSelector from '@/rootStore/loading/selector';
import store from '@/Videos/store';
import * as types from '@/Videos/store/constants';
import Index from './index';

const { selector: currentSelector, actions } = store;

const loadingSelector = createLoadingSelector([types.GET_POLL]);

const selector = createSelector(
  currentSelector,
  loadingSelector,
  (current, loading) => ({
    accounts: current.accounts,
    poll: current.poll,
    pollVotes: current.pollVotes,
    loading
  })
);

export default connect(selector, {
  getPoll: actions.getPoll,
})(Index) as any;