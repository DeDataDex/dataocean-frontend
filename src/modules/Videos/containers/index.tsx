import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import List from '../components/List/adapter';
import Detail from '../components/Detail/adapter';

interface VideosRouterProps {
  computedMatch: any;
}

class VideosRouter extends PureComponent<VideosRouterProps> {
  render() {
    const { computedMatch: match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/detail/:id`} render={(props: any) => (<Detail {...props} />)} />
        <Route path={`${match.path}/:page`} render={(props: any) => (<List {...props} />)} />
      </Switch>
    );
  }
}

export default VideosRouter;
