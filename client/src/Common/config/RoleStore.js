import React from 'react';
import {browserHistory} from 'react-router';
import cookie from 'react-cookie';
import PubSub from 'pubsub-js';

class RoleStore extends React.Component {
  getCookies(path) {
    let data = [];
    let token;
    if (path === 'admin') {
      token = cookie.load('AdminToken', { path: '/' });
      data['token'] = token === undefined ? false : token;
      if (data['token']) {
        data['userData'] = JSON.parse(cookie.load('AdminUserData', { path }));
      }
    }
    else {
      token = cookie.load('token', { path: '/' });
      data['token'] = token === undefined ? false : token;
      if (data['token']) {
        data['userData'] = JSON.parse(cookie.load('userData', { path }));
      }
    }
    return data;
  }

  guest(path) {
    const cookies = this.getCookies(path);
    return cookies['token'] ? false : true;
  }

  authorized(path) {
    const cookies = this.getCookies(path);
    return cookies['token'] ? true : false;
  }

  admin(path) {
    const cookies = this.getCookies(path);
    const roles = cookies['userData'] && cookies['userData'].roles.assigned ? cookies['userData'].roles.assigned : [];
    return roles.indexOf('admin') !== -1;
  }

  matchRoles(roles, redirect = null, path = '/') {
    let auth = false;
    for (var value of roles) {
      if (this[value](path) === true) {
        auth = true;
      }
    }
    if (auth === false && redirect) {
      PubSub.publish('UNAUTH', { redirect });
    }
    return auth;
  }
}

export default new RoleStore();
