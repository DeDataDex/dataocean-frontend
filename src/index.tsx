import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import omit from 'lodash/omit';
import { withBaseRoute } from '@/utils/helper';
import Layout from '@/common/Layout';
import Loading from '@/common/Loading';
import './index.css';
import './utils/i18n';
import store, { history } from './rootStore';

const NetworkRedirect = lazy(() => import('./modules/NetworkRedirect/index'));
const Videos = lazy(() => import('./modules/Videos/containers'));
const EditVideo = lazy(() => import('./modules/Videos/components/EditVideo'));
const Error404 = lazy(() => import('./modules/Error404'));

const RouteWithLayout = (props: any) => {
  const Component = props.component;
  const Layout = props.layout;
  const title = props.title;
  const rest = omit(props, ['component', 'layout', 'title']);

  return (
    <Layout title={title}><Component {...rest} /></Layout>
  );
};

const MainLayout = (props: any) => {
  return (
    <Layout>
      <Helmet>
        <title>
          {props.title || 'Data Ocean'}
        </title>
      </Helmet>
      <Suspense fallback={<Loading />}>
        {props.children}
      </Suspense>
    </Layout>
  );
};

MainLayout.prototype = {
  children: PropTypes.element.isRequired
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <RouteWithLayout exact path={withBaseRoute('/')} title="NetworkRedirect" layout={MainLayout} component={NetworkRedirect} />
        <RouteWithLayout path={withBaseRoute('/videos')} title="Video" layout={MainLayout} component={Videos} />
        <RouteWithLayout path={withBaseRoute('/edit_poll/:id')} title="Edit Video" layout={MainLayout} component={EditVideo} />
        <RouteWithLayout exact path={withBaseRoute('/error')} title="404" layout={MainLayout} component={Error404} />
        <RouteWithLayout path={undefined} title="404" layout={MainLayout} component={Error404} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
