import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import {Store} from 'react-at-rest';
import cookie from 'react-cookie';

import SiteRoutes from './Site/Routes';
import AdminRoutes from './Admin/Routes';
import Notify from './Common/components/Notify';


var Moment = require('moment');
var momentLocalizer = require('react-widgets/lib/localizers/moment')
momentLocalizer(Moment);

Store.API_ENVELOPE = false;
Store.API_PATH_PREFIX = 'api';
const token = cookie.load('token', { path: '/' });
if (token !== undefined) {
  Store.SUPERAGENT_PLUGINS = [
    require('./Common/lib/Token')(token)
  ];
}


const routes = SiteRoutes.concat(AdminRoutes);

class App extends React.Component {
  render() {
    return <div>
      <Notify />
      <Router history={browserHistory} routes={routes} />
    </div>;
  }
}
ReactDOM.render(<App/>, document.getElementById('app'));
