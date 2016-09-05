import Roles from '../Common/config/RoleStore';
import UserRoute from './components/User/Route';
import RoleRoute from './components/Role/Route';
import RoleMappingRoute from './components/RoleMapping/Route';

const AdminRoutes = [
  {
    path: '/admin',
    getComponent(nextState, cb) {
      require.ensure([], function (require) {
        if (Roles.matchRoles(['admin'], null, 'admin'))
          cb(null, require('./components/Layout/Index').default);
        else
          cb(null, require('./components/User/Login').default);
      })
    },
    getIndexRoute(nextState, cb) {
      require.ensure([], function (require) {
        cb(null, { component: require('./components/Dashboard/Index').default });
      })
    },
    childRoutes: [
      UserRoute,
      RoleRoute,
      RoleMappingRoute
    ]
  }
];
export default AdminRoutes;
