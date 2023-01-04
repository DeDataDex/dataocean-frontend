import { connect } from 'react-redux';
import { createSelector } from 'reselect';
// @ts-ignore
import store from '@/Videos/store';
import Index from './index';

const { selector: currentSelector } = store;

const selector = createSelector(
  currentSelector,
  (current) => ({
    accounts: current.accounts,
    isLoadingMore: current.isLoadingMore,
  })
);

export default connect(selector, {})(Index) as any;