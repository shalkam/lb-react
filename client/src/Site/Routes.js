import PostsRoute from './components/Posts/Route';
import UserRoute from './components/User/Route';
import PubSub from 'pubsub-js';

const SiteRoutes = [
  {
    path: '/',
    getComponent(nextState, cb) {
      PubSub.publish('LOADING', true);
      require.ensure([], function (require) {
        PubSub.publish('LOADING', false);
        cb(null, require('./components/Layout/Index').default);
      })
    },
    getIndexRoute(nextState, cb) {
      PubSub.publish('LOADING', true);
      require.ensure([], function (require) {
        PubSub.publish('LOADING', false);
        cb(null, { component: require('./components/Home/Index').default });
      })
    },
    childRoutes: [
      UserRoute,
      PostsRoute
    ]
  }
];
export default SiteRoutes;
