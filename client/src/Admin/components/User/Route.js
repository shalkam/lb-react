const UserRoute = {
  path: 'users',
  getComponent(nextState, cb) {
    require.ensure([], function (require) {
      cb(null, require('./Index').default);
    })
  },
  getIndexRoute(nextState, cb) {
    require.ensure([], function (require) {
      cb(null, { component: require('./List').default });
    })
  },
  childRoutes: [
    {
      path: 'page/:page',
      getComponents(nextState, cb) {
        require.ensure([], function (require) {
          cb(null, require('./List').default);
        })
      }
    },
    {
      path: 'create',
      getComponents(nextState, cb) {
        require.ensure([], function (require) {
          cb(null, require('./Form').default);
        })
      }
    },
    {
      path: 'logout',
      getComponents(nextState, cb) {
        require.ensure([], function (require) {
          cb(null, require('./Logout').default);
        })
      }
    },
    {
      path: ':id',
      getComponents(nextState, cb) {
        require.ensure([], function (require) {
          cb(null, require('./Details').default);
        })
      }
    },
    {
      path: ':id/edit',
      getComponents(nextState, cb) {
        require.ensure([], function (require) {
          cb(null, require('./Form').default);
        })
      }
    },
    {
      path: ':id/delete',
      getComponents(nextState, cb) {
        require.ensure([], function (require) {
          cb(null, require('./Delete').default);
        })
      }
    }
  ]
}
export default UserRoute;
