import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import List from '../components/List/adapter';
import Detail from '../components/Detail/adapter';
import Admin from '../components/Admin/adapter';

interface VideosRouterProps {
  computedMatch: any;
}

class VideosRouter extends PureComponent<VideosRouterProps> {
  render() {
    const { computedMatch: match } = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/detail/:id`} render={(props: any) => (<Detail {...props} />)} />
        <Route exact path={`${match.path}/admin`} render={(props: any) => (<Admin {...props} />)} />
        <Route path={`${match.path}/:page`} render={(props: any) => (<List {...props} />)} />
      </Switch>
    );
  }
}

export default VideosRouter;
