import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createLoadingSelector from '@/rootStore/loading/selector';
import store from '@/Videos/store';
import * as types from '@/Videos/store/constants';
import Index from './index';

const { selector: currentSelector, actions } = store;

const loadingSelector = createLoadingSelector([types.GET_VIDEO]);

const selector = createSelector(
  currentSelector,
  loadingSelector,
  (current, loading) => ({
    accounts: current.accounts,
    videoList: current.videoList,
    video: current.video,
    grantee: current.grantee,
    loading
  })
);

export default connect(selector, {
  getVideo: actions.getVideo,
  getGrantee: actions.getGrantee,
})(Index) as any;