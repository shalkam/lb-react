const UserRoute = {
    path: 'user',
    getComponent(nextState, cb) {
        require.ensure([], function (require) {
            cb(null, require('./Index').default);
        })
    },
    getIndexRoute(nextState, cb) {
        require.ensure([], function (require) {
            cb(null, { component: require('./Login').default });
        })
    },
    childRoutes: [
        {
            path: 'login',
            getComponents(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('./Login').default);
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
            path: 'register',
            getComponents(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('./Register').default);
                })
            }
        },
        {
            path: 'profile',
            getComponents(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('./Profile').default);
                })
            }
        }
    ]
}
export default UserRoute;